import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const exploreDir = path.join(repoRoot, "aio", "e10", "explore-programs");
const sourcePath = path.join(exploreDir, "index.asp");
const outputPath = path.join(exploreDir, "index.html");

const source = fs.readFileSync(sourcePath, "utf8");

const bodyStart = source.indexOf('<div id="jsonmanagernoncountry"');
const bodyEnd = source.indexOf("</main>");
if (bodyStart < 0 || bodyEnd < 0) {
  throw new Error("Could not locate the Explore Programs page body in index.asp");
}

let body = source.slice(bodyStart, bodyEnd);

body = body.replace(
  /<dl id="wb-dtmd">[\s\S]*?<\/dl>/,
  `<!-- Static replacement for the ASP date-modified include -->
      <dl id="wb-dtmd">
        <dt>Date modified:</dt>
        <dd><time property="dateModified">2025-12-31</time></dd>
      </dl>`
);
body = body
  .replace(/data-feedback-section="<%=pft_section%>"/g, 'data-feedback-section=""')
  .replace(/data-feedback-theme="<%=pft_theme%>"/g, 'data-feedback-theme="Immigration"');

body = body.replace(
  /[ \t]*<!-- #include file="results\/([^"]+)" -->[ \t]*/g,
  (_match, resultFile) => {
    const resultPath = path.join(exploreDir, "results", resultFile);
    if (!fs.existsSync(resultPath)) {
      throw new Error(`Missing result fragment: ${resultPath}`);
    }
    return `\n               <!-- Inlined from results/${resultFile} -->\n${fs.readFileSync(resultPath, "utf8")}\n`;
  }
);

// Result fragments still contain ASP fee expressions. Keep the visual fee row
// present in the static prototype without exposing server-side syntax.
body = body
  .replace(/<%[\s\S]*?%>/g, "—")
  .replace(/CAN\$—(?:\s*(?:-|&#8209;)\s*—)+/g, "CAN$—");

const html = `<!doctype html>
<html class="no-js local-static" dir="ltr" lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Explore immigration programs to live, work, or study in Canada</title>
  <meta name="description" content="Answer a few questions to see different ways you might be able to come to Canada">
  <link rel="alternate" hreflang="fr" href="/explorer-programmes/index.asp">
  <link rel="icon" href="https://ircc.canada.ca/wet-v4/dist/GCWeb/assets/favicon.ico" type="image/x-icon">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
  <link rel="stylesheet" href="https://ircc.canada.ca/wet-v4/dist/GCWeb/css/theme.min.css">
  <link rel="stylesheet" href="https://ircc.canada.ca/wet-v4/dist/GCWeb/meli-melo/2024-09-kejimkujik.min.css">
  <link rel="stylesheet" href="https://ircc.canada.ca/css/util-wet4.css" media="screen, print">
  <link rel="stylesheet" href="https://ircc.canada.ca/css/bootstrap-equivalence.css" media="screen, print">
  <link rel="stylesheet" href="https://ircc.canada.ca/css/cic-wet4.css" media="screen, print">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.4.0/css/all.css" crossorigin="anonymous">
  <link rel="stylesheet" href="css/program-finder.css">
  <link rel="stylesheet" href="css/program-finder-print.css">
  <link rel="stylesheet" href="css/minified-template.css">
  <style>
    /* Local static preview fallback when remote icon fonts are blocked by CORS. */
    .local-static .glyphicon-arrow-left::before { content: "←"; font-family: "Noto Sans", sans-serif !important; }
    .local-static .glyphicon-arrow-right::before { content: "→"; font-family: "Noto Sans", sans-serif !important; }
    .local-static .glyphicon-share::before { content: "↗"; font-family: "Noto Sans", sans-serif !important; }
    .local-static .fa-rotate-right::before { content: "↻"; font-family: "Noto Sans", sans-serif !important; }
    .local-static .fa-circle-plus::before { content: "⊕"; font-family: "Noto Sans", sans-serif !important; }
    .local-static .fa-circle-minus::before { content: "⊖"; font-family: "Noto Sans", sans-serif !important; }
    .local-static .fa-print::before { content: "⎙"; font-family: "Noto Sans", sans-serif !important; }
  </style>
  <noscript><link rel="stylesheet" href="https://ircc.canada.ca/wet-v4/dist/wet-boew/css/noscript.min.css"></noscript>
</head>
<body vocab="http://schema.org/" resource="#wb-webpage" typeof="WebPage">
  <nav>
    <ul id="wb-tphp">
      <li class="wb-slc"><a class="wb-sl" href="#wb-cont">Skip to main content</a></li>
      <li class="wb-slc"><a class="wb-sl" href="#wb-info">Skip to &quot;About government&quot;</a></li>
    </ul>
  </nav>
  <header>
    <div id="wb-bnr" class="container">
      <div class="row">
        <section id="wb-lng" class="col-xs-3 col-sm-12 pull-right text-right">
          <h2 class="wb-inv">Language selection</h2>
          <ul class="list-inline mrgn-bttm-0">
            <li><a lang="fr" hreflang="fr" href="/explorer-programmes/index.asp"><span class="hidden-xs">Français</span><abbr title="Français" class="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase">fr</abbr></a></li>
          </ul>
        </section>
        <div class="brand col-xs-9 col-sm-5 col-md-4" property="publisher" resource="#wb-publisher" typeof="GovernmentOrganization">
          <a href="https://www.canada.ca/en.html" property="url"><img src="https://ircc.canada.ca/wet-v4/dist/GCWeb/assets/sig-blk-en.svg" alt="Government of Canada" property="logo"><span class="wb-inv"> / <span lang="fr">Gouvernement du Canada</span></span></a>
          <meta property="name" content="Government of Canada">
          <meta property="areaServed" typeof="Country" content="Canada">
          <link property="logo" href="https://ircc.canada.ca/wet-v4/dist/GCWeb/assets/wmms-blk.svg">
        </div>
      </div>
    </div>
    <hr>
  </header>
  <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
${body}
  </main>
  <footer id="wb-info">
    <h2 class="wb-inv">About this site</h2>
    <div class="gc-sub-footer">
      <div class="container d-flex align-items-center">
        <nav>
          <h3 class="wb-inv">Government of Canada Corporate</h3>
          <ul>
            <li><a href="https://www.canada.ca/en/social.html">Social media</a></li>
            <li><a href="https://www.canada.ca/en/mobile.html">Mobile applications</a></li>
            <li><a href="https://design.canada.ca/about/">About Canada.ca</a></li>
            <li><a href="https://www.canada.ca/en/transparency/terms.html">Terms and conditions</a></li>
            <li><a href="https://www.canada.ca/en/transparency/privacy.html">Privacy</a></li>
          </ul>
        </nav>
        <div class="wtrmrk align-self-end"><img src="https://ircc.canada.ca/wet-v4/dist/GCWeb/assets/wmms-blk.svg" alt="Symbol of the Government of Canada"></div>
      </div>
    </div>
  </footer>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <script src="https://ircc.canada.ca/wet-v4/dist/wet-boew/js/wet-boew.min.js"></script>
  <script src="https://ircc.canada.ca/wet-v4/dist/GCWeb/js/theme.min.js"></script>
  <script src="https://ircc.canada.ca/wet-v4/dist/GCWeb/meli-melo/2024-09-kejimkujik.min.js"></script>
  <script src="js/program-finder.js"></script>
</body>
</html>
`;

fs.writeFileSync(outputPath, html, "utf8");
console.log(`Built ${path.relative(repoRoot, outputPath)}`);
