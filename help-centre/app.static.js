/*
 * app.static.js — fully client-side query path for GitHub Pages.
 *
 * No server. The browser:
 *   1. loads the pre-built index (chunks.json + int8 vectors.bin + meta.json),
 *   2. embeds the query with the SAME model the index was built with, via
 *      transformers.js (WASM) loaded from a CDN,
 *   3. runs the same hybrid scoring (BM25 + cosine), tiered snippet gate,
 *      and rendering as the Node server — just in the page.
 *
 * The page only links out to canada.ca; it never fetches it, so there is no
 * CORS dependency at query time.
 */
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4';
env.allowLocalModels = false;   // models come from the HF CDN

const CFG = { ALPHA: 0.5, SNIPPET_MIN: 0.22, SNIPPET_STRONG: 0.45, SNIPPET_MARGIN: 0.05, TOP_K: 10, HF_MODEL: 'Xenova/all-MiniLM-L6-v2' };

// ---------- data ----------
let CHUNKS = [], VEC = null, DIM = 0, NDOC = 0;

async function loadData() {
  const meta = await (await fetch('./data/meta.json')).json();
  DIM = meta.dim;
  if (meta.hfModel) CFG.HF_MODEL = meta.hfModel;
  if (meta.thresholds) Object.assign(CFG, meta.thresholds);
  CHUNKS = await (await fetch('./data/chunks.json')).json();
  const buf = await (await fetch('./data/vectors.u8.bin')).arrayBuffer();
  VEC = new Int8Array(buf);
  NDOC = CHUNKS.length;
  buildBM25();
}

// ---------- lexical (BM25), mirrors answer-server.js ----------
const STOP = new Set('a an the of to for in on at and or is are be was were do does how i my your we our it its as that this with from'.split(' '));
const lexTokens = s => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 1 && !STOP.has(w));
const K1 = 1.5, B = 0.75;
const TF = [], DL = [], DF = new Map();
let avgdl = 0;
function buildBM25() {
  for (let i = 0; i < CHUNKS.length; i++) {
    const c = CHUNKS[i];
    const toks = [].concat(lexTokens(c.heading), lexTokens(c.heading), lexTokens(c.heading),
      lexTokens(c.pageTitle), lexTokens(c.pageTitle), lexTokens(c.text));
    const tf = new Map();
    toks.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
    TF[i] = tf; DL[i] = toks.length; avgdl += toks.length;
    new Set(toks).forEach(t => DF.set(t, (DF.get(t) || 0) + 1));
  }
  avgdl = CHUNKS.length ? avgdl / CHUNKS.length : 0;
}
const idf = t => { const n = DF.get(t) || 0; return Math.log(1 + (NDOC - n + 0.5) / (n + 0.5)); };
function bm25(qTerms, i) {
  let s = 0; const tf = TF[i];
  for (const t of qTerms) { const f = tf.get(t); if (!f) continue; s += idf(t) * (f * (K1 + 1)) / (f + K1 * (1 - B + B * DL[i] / avgdl)); }
  return s;
}

// cosine of a float query vector with int8-quantised doc row i (÷127 to dequantise)
function cosineInt8(qf, i) {
  let s = 0; const off = i * DIM;
  for (let k = 0; k < DIM; k++) s += qf[k] * (VEC[off + k] / 127);
  return s;
}

// ---------- embedder (transformers.js) ----------
let extractor = null;
async function embed(q) {
  if (!extractor) extractor = await pipeline('feature-extraction', CFG.HF_MODEL);
  const o = await extractor(q, { pooling: 'mean', normalize: true });
  return o.data;
}

const pageOf = u => u.split('#')[0];

// ---------- search (mirrors answer-server.js search()) ----------
async function clientSearch(query) {
  const qf = await embed(query);
  const qTerms = lexTokens(query);
  let maxLex = 0; const lex = new Float64Array(NDOC);
  for (let i = 0; i < NDOC; i++) { const l = bm25(qTerms, i); lex[i] = l; if (l > maxLex) maxLex = l; }
  const scored = new Array(NDOC);
  for (let i = 0; i < NDOC; i++) {
    const sem = cosineInt8(qf, i);
    const lexN = maxLex > 0 ? lex[i] / maxLex : 0;
    scored[i] = { i, combined: CFG.ALPHA * sem + (1 - CFG.ALPHA) * lexN };
  }
  scored.sort((a, b) => b.combined - a.combined);

  const best = [], seen = new Set();
  for (const s of scored) {
    const p = pageOf(CHUNKS[s.i].url);
    if (seen.has(p)) continue;
    seen.add(p); best.push(s);
    if (best.length >= CFG.TOP_K) break;
  }
  const top = best[0], second = best[1];
  const gap = second ? top.combined - second.combined : Infinity;
  const show = top && (top.combined >= CFG.SNIPPET_STRONG || (top.combined >= CFG.SNIPPET_MIN && gap >= CFG.SNIPPET_MARGIN));

  let snippet = null;
  if (show) {
    const c = CHUNKS[top.i];
    const related = scored.filter(s => pageOf(CHUNKS[s.i].url) !== pageOf(c.url)).slice(0, 4)
      .map(s => ({ title: CHUNKS[s.i].heading || CHUNKS[s.i].pageTitle, url: CHUNKS[s.i].url }));
    snippet = { title: c.heading || c.pageTitle, source: c.source, sourceUrl: c.url, blocks: toBlocks(c.text), related };
  }
  const results = best.filter(s => !snippet || pageOf(CHUNKS[s.i].url) !== pageOf(snippet.sourceUrl))
    .map(s => { const c = CHUNKS[s.i]; return { title: c.heading || c.pageTitle, url: c.url, source: c.source, excerpt: c.text.slice(0, 200) }; });

  return { query, count: (snippet ? 1 : 0) + results.length, gated: !show, snippet, results };
}

// ---------- rendering (mirrors index.html app) ----------
function esc(s) { return (s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function toBlocks(text) {
  const parts = text.split('•').map(s => s.trim()).filter(Boolean);
  if (parts.length <= 1) return [{ tag: 'p', text: text.trim() }];
  const blocks = [{ tag: 'p', text: parts[0] }];
  for (let i = 1; i < parts.length; i++) blocks.push({ tag: 'li', text: parts[i] });
  return blocks;
}
function cite(url) {
  try {
    const u = new URL(url);
    let last = u.pathname.split('/').filter(Boolean).pop() || '';
    last = last.replace(/\.(asp|html)$/i, '').replace(/[-_]/g, ' ');
    if (/qnum=/.test(u.search)) last = 'Help Centre answer';
    return 'www.' + u.hostname.replace(/^www\./, '') + (last ? ' › ' + last : '');
  } catch (e) { return url; }
}
function srcBadge(source) {
  if (!source) return '';
  const cls = source === 'Canada.ca' ? 'hc-src-cca' : 'hc-src-hc';
  return '<span class="hc-src-badge ' + cls + '">' + esc(source) + '</span>';
}
function renderBlocks(blocks) {
  let html = '', inList = false;
  blocks.forEach(b => {
    if (b.tag === 'li') { if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + esc(b.text) + '</li>'; }
    else { if (inList) { html += '</ul>'; inList = false; } html += '<p>' + esc(b.text) + '</p>'; }
  });
  if (inList) html += '</ul>';
  return html;
}
function renderSnippet(s) {
  const el = document.getElementById('hc-snippet');
  if (!s) { el.innerHTML = ''; return; }
  let related = '';
  if (s.related && s.related.length) {
    related = '<div class="hc-related"><p class="hc-related-h">Related pages on Canada.ca</p>' +
      s.related.map(r => '<a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a>').join('') + '</div>';
  }
  el.innerHTML =
    '<div class="hc-snippet-card">' +
      '<h3 class="hc-snippet-title">' + esc(s.title) + srcBadge(s.source) + '</h3>' +
      '<hr class="hc-snippet-rule">' +
      '<div class="hc-snippet-body">' + renderBlocks(s.blocks) + '</div>' +
      '<p class="hc-ai-note"><span class="fas fa-quote-left" aria-hidden="true"></span>Verbatim from a live Government of Canada page, matched on-device</p>' +
      '<hr class="hc-snippet-rule" style="margin-top:16px">' +
      '<div class="hc-snippet-source"><a href="' + esc(s.sourceUrl) + '" target="_blank" rel="noopener">' + esc(s.title) + '</a>' +
        '<span class="hc-snippet-cite">' + esc(cite(s.sourceUrl)) + '</span></div>' +
      related +
    '</div>';
}
function renderList(results, snippet) {
  const el = document.getElementById('hc-list');
  if (!results || !results.length) { el.innerHTML = ''; return; }
  const skip = snippet ? snippet.sourceUrl : null;
  el.innerHTML = results.filter(r => r.url !== skip).map(r =>
    '<div class="hc-result"><div class="hc-result-title"><a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.title) + '</a>' + srcBadge(r.source) + '</div>' +
    (r.excerpt ? '<p class="hc-result-excerpt">' + esc(r.excerpt) + '…</p>' : '') +
    '<span class="hc-result-cite">' + esc(cite(r.url)) + '</span></div>'
  ).join('');
}

// ---------- wiring ----------
let ready = false;
const form = document.querySelector('.hc-search-form');
const input = document.getElementById('sch-inp-ac');
const resultsBand = document.getElementById('hc-results');
const statusEl = document.getElementById('hc-status');
const snippetEl = document.getElementById('hc-snippet');
const listEl = document.getElementById('hc-list');
const categories = document.querySelector('.hc-band-categories');

function loading(msg) {
  resultsBand.hidden = false;
  if (categories) categories.style.display = 'none';
  statusEl.innerHTML = '';
  snippetEl.innerHTML = '<div class="hc-loading"><span class="hc-spinner" aria-hidden="true"></span>' + esc(msg) + '</div>';
  listEl.innerHTML = '';
  resultsBand.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function run(q) {
  q = (q || '').trim();
  if (!q) return;
  input.value = q;
  loading(ready ? 'Searching “' + q + '”…' : 'Loading the search model (one-time, ~20 MB)…');
  try {
    if (!ready) { await loadData(); await embed('warm up'); ready = true; loading('Searching “' + q + '”…'); }
    const d = await clientSearch(q);
    if (!d.count) {
      statusEl.innerHTML = 'No results for “<span class="hc-q">' + esc(q) + '</span>”';
      snippetEl.innerHTML = '<p class="hc-noresults">Try different or more general keywords, or browse by topic below.</p>';
      if (categories) categories.style.display = '';
      return;
    }
    statusEl.innerHTML = d.count + ' search result' + (d.count === 1 ? '' : 's') + ' for “<span class="hc-q">' + esc(q) + '</span>”';
    renderSnippet(d.snippet);
    renderList(d.results, d.snippet);
  } catch (e) {
    statusEl.innerHTML = '';
    snippetEl.innerHTML = '<p class="hc-noresults">Could not load the search model or index. Check your connection and reload.</p>';
    console.error(e);
  }
}

if (form && input) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    run(input.value);
    const u = new URL(window.location); u.searchParams.set('q', input.value.trim()); window.history.replaceState({}, '', u);
  });
  const q0 = new URL(window.location).searchParams.get('q');
  if (q0) run(q0);
}
