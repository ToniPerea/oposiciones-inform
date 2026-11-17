# Agent readiness: https://educoef.com (checked 2026-11-17; vendor facts dated 2026-09-23)

## Lighthouse Agentic Browsing
Not measured. PSI returned HTTP 429 (daily quota, no API key) for both mobile and desktop. No X/N reported. Re-run after configuring a Google API key.
Note: llms.txt is 404, so Lighthouse would drop that audit from the fraction; publishing a valid llms.txt adds a counted audit.

## Agent-UX heuristic (separate from Lighthouse): 100/100, complete
496 a11y nodes, 15 buttons, 24 links, 11 landmarks, 0 unnamed interactive, 0 div-onclick widgets, 0 unlabeled inputs. Home page only.

## Findings
- P0 pass: server-rendered, 777 words without JS (SSR/prerender works).
- P0 pass: robots.txt 200; single group `User-agent: *` / `Allow: /` plus Sitemap.
- P1 pass: unknown URLs return real 404.
- P1 info: no Content-Signal line (draft/preference, Google does not act on it). Optional.
- P1 info: llms.txt and llms-full.txt 404 (community spec, Google Search ignores it). Optional, low effort.
- P1 info: no Markdown delivery (no Accept negotiation, no alternate link, /index.md 404). Opportunity only.
- P2/P3 n/a: no WebMCP (draft, WebKit opposes), no api-catalog, oauth, ai-catalog.json (draft), agent-card, ucp. Opportunities, not defects; not warranted for a small local academy.
- Caveat: only the home page was rendered; the contact form page was not tested for labels/WebMCP.

## Access policy
- Training crawlers: allowed (fall through to `*`, no named groups).
- Search crawlers: allowed.
- User-triggered agents: allowed; Claude-User honours robots, ChatGPT-User may not apply, Perplexity-User/Google-Agent generally ignore it.

## Proportionate recommendations
1. Decide training policy; if no training wanted, add named groups and a Content-Signal line (e.g. search=yes, ai-input=yes, ai-train=no). Preference only.
2. Optionally add a short /llms.txt (H1, > summary, links to /planes, /nosotros, /contacto).
3. Get a PSI API key and re-measure Lighthouse. Skip WebMCP, ai-catalog, Markdown.
