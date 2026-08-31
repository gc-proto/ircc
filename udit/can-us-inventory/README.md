# LibreCrawl Audit Dashboard

Static, GitHub-Pages–hostable viewer for LibreCrawl crawl reports.

## What it shows
- An overview card per crawl (rows, depth, internal/external split, JS-rendered count, status-code breakdown).
- Click a card to drill into every crawled URL: status code, depth, title, word count, response time, in/out link counts, JS-rendered flag.
- Sortable/filterable table (URL/title search, status-code group, internal vs external, JS-only).
- Top issue summary per crawl.

## Data source
Generated from LibreCrawl on TrueNAS (http://192.168.2.84:30160). The four crawls are:
- `14` Canada Strong
- `15` Canada–U.S. Overview
- `16` Global Affairs Canada–U.S. Engagement
- `18` Finance Canada Tariff Responses

## Files
- `index.html` — the dashboard (no build step; pure HTML/CSS/JS).
- `data/summary.json` — crawl summaries + issue rollups.
- `data/pages-<id>.json` — per-crawl page records.

## Deploy to GitHub Pages
1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. On push to `main`, the workflow in `.github/workflows/pages.yml` publishes it.
4. Live at `https://<user>.github.io/<repo>/`.

## Local preview
```bash
python3 -m http.server 8080
# open http://localhost:8080
```
(Use a local server, not `file://`, so the `fetch()` calls to `data/*.json` work.)

## Regenerate data
Re-run the export on the TrueNAS host and copy `data/` over:
```bash
docker exec -i librecrawl python3 < librecrawl_export.py
docker exec librecrawl cp /app/data/dashboard_export.json /tmp/dashboard_export.json
docker cp librecrawl:/tmp/dashboard_export.json ./data/
python3 librecrawl_split.py
```
