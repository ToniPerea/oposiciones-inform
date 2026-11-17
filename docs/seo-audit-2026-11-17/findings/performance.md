# Performance findings: educoef.com (2026-11-17)

IMPORTANT: no field data (no Google API key; PSI keyless quota exhausted). No Lighthouse/Playwright lab run was possible: the plugin runtime only runs allowlisted scripts and the Lighthouse CLI via npx was denied by the permission classifier. All figures below come from curl/HTTP measurements and static HTML/source inspection. LCP/CLS/INP values are NOT measured; they are estimates from resource analysis. Score is an estimate.

Estimated score: ~72/100 (mobile, estimated). Desktop likely ~85-90.

## CWV status (estimated, unmeasured)
- LCP: likely Needs Improvement on mobile (est. 2.5-3.5s on slow 4G); hero is text, but the 722 KB navbar logo and the render-blocking Google Fonts CSS delay first paint.
- CLS: at risk (small). Navbar img `h-10 w-auto` has no width/height attributes, so width is unknown until the PNG loads. Team photos (/nosotros) have no width/height.
- INP: likely Good. Zoneless Angular, small JS (~120 KB gz total on home), no heavy handlers seen. GA4 is consent-gated.

## Measured facts
- TTFB (curl, from here): ~52 ms; HTML 92 KB raw home (15.8 KB gzip). Good. Served by GitHub Pages/Fastly.
- Cache headers: ALL assets (HTML, hashed JS/CSS, images) have `cache-control: max-age=600` (GitHub Pages cannot be changed). Hashed bundles are re-validated every 10 min; poor repeat-visit caching.
- /planes and /contacto (no trailing slash) return a 301 to the slash URL: one extra round trip for links/sitemap entries without trailing slash.
- JS (gzip): main 6.7 KB, chunk-AF2GDH3A 64 KB (Angular core), chunk-NHFYNM6Q 21 KB, chunk-GJMTDEV3 7 KB (home page), plus tiny chunks, about 105 KB gz on home. CSS: 7.4 KB gz, loaded with print/onload trick (non-blocking) and Beasties inlines critical CSS. Good.
- Prerendering/SSR active: content is in the initial HTML. Good for LCP.

## Bottlenecks (by impact)
1. logo-alt.png: 2000x2000 px PNG, 722 KB, displayed at ~40 px high, on EVERY page, in the navbar (no lazy needed; it is above the fold and possibly the LCP/largest image). Also uncompressed by gzip. A logo.svg (616 KB) also exists in public/ but is unused and also huge (embedded raster?). Fix: export a ~160x160 (or 2x of display size) WebP/AVIF/SVGO-optimized SVG (<10 KB), add width/height attributes, `fetchpriority="high"`. Expected saving: ~700 KB on every page, notable LCP and CLS gain on mobile.
2. Team photos (/nosotros): fran-plata.png 1.07 MB (1203x1280), alvaro-morente.png 251 KB, moises 226 KB, juan-de-dios 169 KB, all shown at 96x96 px (h-24 w-24). Total ~1.7 MB for 96 px avatars. No width/height, no loading="lazy". Fix: resize to 192x192, WebP/AVIF (~5-10 KB each), add width/height and loading="lazy". Savings ~1.6 MB.
3. Google Fonts: render-blocking-ish third-party CSS from fonts.googleapis.com (Inter 5 weights + Montserrat 3 weights, display=swap) adds 2 origins (DNS/TLS) on the critical path. Fix: self-host WOFF2 (Angular can inline font CSS; use `@fontsource`/variable fonts), reduce weights (Inter 400/600/700; Montserrat 700/800), preload the main WOFF2. Reduces LCP and FOUT-related CLS.
4. Video (live, confirmed): https://educoef.com/assets/video/plataforma-educoef.mp4 returns 200, 2.39 MB, H.264 1920x1080, ~330 kbps video + 115 kbps AAC. Home markup: `<video controls playsinline preload="none" poster=assets/video/plataforma-educoef-poster.jpg class="aspect-video w-full">`. This is good practice: preload=none, poster (86 KB JPEG), aspect-video reserves space (no CLS). Notes: the repo status is clean and the video is committed on branch feat/video-plataforma (commit e5f05bf) and already served in production, so the task note about "untracked" is outdated. Improvements: poster 86 KB JPEG -> WebP/AVIF ~30 KB and `loading`-style lazy behavior is implicit; check poster is not the LCP (it is below the fold, should not be). GitHub Pages honors Range requests (accept-ranges: bytes) so streaming works; no CDN though. Consider also 1280x720 variant for mobile (~1.5 MB) and `faststart` (moov atom at front) check.
5. Third parties:
   - Google Analytics 4 (G-M341BPDKFR) is injected only after cookie consent by CookieConsentService: no cost for non-consenting visits; for consenting visits loads ~50 KB gz async. Fine. Ensure the script is added with async and after load/idle.
   - EmailJS: imported statically in contact.ts, in lazy contact chunk only (chunk-PPTBTUIH), so it does not hit home. Fine.
   - Google Maps iframe on /contacto: `loading="lazy"`, 300 px height set (no CLS). It pulls ~500 KB-1 MB of Google JS when near viewport; add a click-to-load facade (static map image + button) for INP/TBT and privacy. Medium impact on /contacto only.
6. Caching/transport: cannot set headers on GitHub Pages. If stronger caching/CDN (HTTP/3, brotli, immutable) is wanted, front with Cloudflare (free) and set `Cache-Control: public, max-age=31536000, immutable` for hashed /*.js,/*.css, and long TTL for images. Also gzip only (no brotli) seen via `content-encoding: gzip`; Cloudflare would give brotli (~15-20% smaller JS).
7. Minor: modulepreload of 6 chunks on home is fine; 404.html SPA redirect not relevant with prerender. Ensure internal links and sitemap use trailing-slash URLs to avoid 301s.

## Prioritized recommendations
1. Replace logo-alt.png with an optimized small asset and set width/height (high impact, 15 min).
2. Resize/convert team photos to WebP 192 px, add width/height + lazy (high impact on /nosotros).
3. Self-host fonts, trim weights (medium-high LCP).
4. Cloudflare in front of GitHub Pages for cache headers + brotli (medium).
5. Maps click-to-load facade (medium, /contacto).
6. Poster to WebP/AVIF, optional 720p mobile video source (low-medium).
7. Measure for real: add a PSI API key (`/seo google setup`) or run Lighthouse locally (`npx lighthouse https://educoef.com --view`) and review CrUX once traffic is sufficient.

## Pages not individually measured
/planes and /contacto: HTML 89 KB and 59 KB raw; same shared shell/logo issue; /contacto adds EmailJS chunk + Maps iframe. No page-specific image beyond the logo found on /planes.
