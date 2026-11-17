# Sitemap findings - educoef.com (checked 2026-11-17)

Live sitemap: /sitemap.xml, 200, valid urlset, 5 URLs, 742 bytes, declared in robots.txt, no dupes, no lastmod.

| Check | Result |
|---|---|
| Valid XML / reachable | PASS |
| Limits (50k/50MB) | PASS |
| / /nosotros /planes /contacto | 200 (after 301 to trailing slash on 3 of them), canonical self (no trailing slash) |
| /politica-cookies | FAIL: HTTP 404 (served SPA 404.html with noindex) - HIGH |
| lastmod | MISSING on all URLs - Low/Medium |
| priority/changefreq | Present, ignored by Google - Info, remove |
| Redirects | MEDIUM: GH Pages 301s /nosotros -> /nosotros/ while sitemap and canonical use no slash; canonical/sitemap/final URL mismatch |

## Missing pages / mismatch
Routes in app.routes.ts: '', nosotros, planes, contacto, aviso-legal, politica-privacidad, clausula-informativa, politica-cookies. All 4 legal pages are linked in the footer.
- Legal pages are RenderMode.Client in app.routes.server.ts, so no static HTML is emitted; GitHub Pages returns real HTTP 404 on direct hits for all four (aviso-legal, politica-privacidad, clausula-informativa, politica-cookies). They only work via in-app navigation. Googlebot sees 404.
- Sitemap lists only politica-cookies (a 404). The other 3 are absent, which is correct while they 404.
- Live sitemap differs from repo public/sitemap.xml (repo has 4 URLs, weekly changefreq, no cookies entry): deployed copy is newer/other branch, or built differently. Reconcile.

## Recommendations
1. Prerender legal pages (add Prerender entries for aviso-legal, politica-privacidad, clausula-informativa, politica-cookies in app.routes.server.ts) so they return 200 with real HTML. Then add all 4 to sitemap, or leave them out (legal pages are low value; fine either way). Until fixed, remove /politica-cookies from sitemap.
2. Trailing slash: pick one form. Easiest: make canonicals, og:url and sitemap locs use trailing slash (/nosotros/) to match what GH Pages serves with 200, avoiding the 301.
3. lastmod: add real W3C dates (YYYY-MM-DD) per URL set to the date of the last meaningful content change (e.g. from `git log -1 --format=%cs -- <page files>` in a build/CI step). Do not stamp build date on all URLs. Omit rather than fake. Drop priority and changefreq.
4. No location-page quality gate concerns (5 pages).

Target sitemap sketch: 4 core URLs (trailing slash) with real lastmod, plus legal URLs only after they return 200.
