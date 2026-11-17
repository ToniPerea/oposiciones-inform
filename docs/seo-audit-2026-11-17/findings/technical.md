# Technical SEO - educoef.com (2026-11-17) Score 74/100
## High
1. Sitemap lists /politica-cookies, which returns HTTP 404 on direct request (legal routes are RenderMode.Client; GitHub Pages serves 404.html with noindex then JS redirect). Fix: prerender legal routes in app.routes.server.ts (aviso-legal, politica-privacidad, clausula-informativa, politica-cookies) so real files exist, or remove from sitemap.
2. Legal pages (aviso-legal, politica-privacidad, clausula-informativa, politica-cookies) all return 404 + noindex to crawlers; unreachable/unindexable, trust/compliance signal lost.
## Medium
3. Canonical/og:url without trailing slash (https://educoef.com/planes) but GitHub Pages 301-redirects /planes to /planes/ (the served URL). Sitemap also lists no-slash URLs, so every sitemap URL redirects. Fix: use trailing-slash canonicals + sitemap URLs (matches what GH Pages serves) .
4. No security headers (HSTS from GH Pages only if enforced; no CSP, X-Content-Type-Options, Referrer-Policy, X-Frame-Options); GitHub Pages cannot set custom headers. Low practical SEO impact; Cloudflare in front would allow it.
5. cache-control max-age=600 only (GH Pages limitation); hashed assets not long-cached.
## Low
6. Sitemap has no lastmod (priority/changefreq ignored by Google); add lastmod.
7. robots.txt minimal but valid; no AI crawler rules (policy decision).
8. Homepage <img> tags lack width/height (CLS risk); video uses preload=none + poster (good).
9. Custom 404 is the SPA shell with homepage title; fine with noindex, but ideally a real 404 page.
## Pass
- http->https 301, www->apex 301 (single hop), apex 200 HTTP/2.
- Sitemap valid (helper validated, declared in robots.txt).
- 4 core routes prerendered: unique title, description, canonical, og:url, single h1, lang=es, viewport OK, base href="/" so relative assets work.
- JSON-LD valid (EducationalOrganization + LocalBusiness) on home; content in raw HTML (is_spa false), no JS required. No render sandbox issues.
- Unknown URLs return true 404 + noindex.
