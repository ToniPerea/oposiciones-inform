# GEO / AI Search Readiness: educoef.com (audited 2026-11-17)

## GEO Readiness Score: 49/100

| Dimension | Score | Weight | Weighted |
|---|---|---|---|
| Citability | 35 | 25% | 8.8 |
| Structural Readability | 55 | 20% | 11.0 |
| Multi-Modal Content | 30 | 15% | 4.5 |
| Authority & Brand Signals | 40 | 20% | 8.0 |
| Technical Accessibility | 85 | 20% | 17.0 |
| **Total** | | | **49** |

## AI Crawler Access (robots.txt: `User-agent: * / Allow: /` + Sitemap)
No bot is named, so every crawler is allowed by the wildcard.

| Crawler | Governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed (wildcard) |
| Claude-SearchBot | Claude search citations | Allowed (wildcard) |
| PerplexityBot | Perplexity index | Allowed (wildcard) |
| Googlebot | Google Search + AI Overviews / AI Mode | Allowed |
| Bingbot | Bing / Copilot | Allowed |
| Applebot | Siri / Spotlight / Safari | Allowed |
| GPTBot | OpenAI training only | Allowed (optional) |
| ClaudeBot | Anthropic training only | Allowed (optional) |
| Google-Extended | Gemini/Vertex training + grounding; not Search/AIO | Allowed (optional) |
| Applebot-Extended | Apple Intelligence training only | Allowed (optional) |
| CCBot, cohere-ai | Training | Allowed (optional) |

Verdict: nothing to fix. Allowing training bots is a business choice. For a small local brand, being in training data helps models recognize the entity.

## llms.txt / RSL
- `/llms.txt`: 404 (missing). Low priority: it's optional, Google ignores it, and no major AI search engine has been shown to use it for ranking.
- `/license.xml` (RSL 1.0): 404 (missing). Not needed.

## Technical Accessibility (85)
- Pages are prerendered with SSR: the full text of home, /planes/ and /nosotros/ is in the raw HTML (is_spa=false). Crawlers that don't run JavaScript can read everything.
- JSON-LD (EducationalOrganization + LocalBusiness) is in the HTML. FAQPage JSON-LD is server-rendered on /planes/ and matches the visible FAQ.
- Problem: the sitemap lists `/planes`, `/nosotros` and `/contacto` without a trailing slash, and the canonicals use the same form. But GitHub Pages answers those URLs with a 301 to `/planes/` etc. So the canonical and sitemap URLs point at a redirect. Pick one form and use it in the sitemap, canonicals and internal links.
- No visible date and no `dateModified` on any page (the render reports 2026-01-01, probably taken from the footer copyright).

## Citability (35)
- The home page is thin: about 300 words of extractable text, mostly CTAs and short feature blurbs. No passage is 130+ words and self-contained.
- The strongest citable fact is "100% de satisfacción alta o muy alta (Encuesta 2024; 56% alto, 44% muy alto)". It is specific and attributed, but it sits in fragmented UI text with no sentence giving context (sample size, who ran the survey).
- "Alto Porcentaje de Aprobados" has no number. AI engines won't cite a vague claim. Publish an actual pass rate or number of plazas per convocatoria, with a source or method.
- Facts contradict each other: home says "Más de 15 años", /nosotros/ says "más de una década". Pick one figure and use it everywhere, JSON-LD included (`foundingDate`).
- The FAQ answers are 10-35 words each, too short to stand alone as answers. "¿Hay facilidades de pago?" doesn't actually answer the question ("contáctanos").
- None of the high-intent questions that opositores ask AI assistants are covered: exam structure in Andalucía (parts, weighting), dates of the Primaria 2027 / Secundaria 2028 convocatorias, number of topics per cuerpo, the difference between Primaria and Secundaria EF, "¿cuánto cuesta preparar la oposición de EF?", online vs presencial. The live banner mentions the convocatorias but gives no supporting detail.
- Pricing on /planes/ is concrete and extractable (Materiales 500€ one-time, Plus 100€/mes, Premium 160€/mes). This is the site's best answer-ready content, but there's no single prose summary sentence and no Offer schema.

## Structural Readability (55)
- One H1 per page and a clean H2/H3 hierarchy.
- Question-based headings appear only in the /planes/ FAQ. Elsewhere the headings are marketing labels ("¿Por qué Elegirnos?", "Excelencia", "Compromiso").
- Sections don't open with a direct answer. The mission paragraph on /nosotros/ is the only prose block (about 70 words).

## Multi-Modal (30)
- Home: the only image is the logo. There's no video in production. The "Qué incluye nuestra plataforma online" video is only on branch `feat/video-plataforma` (commit e5f05bf) and not deployed.
- /nosotros/: 5 team photos with name alt text (good). No video, infographic samples or tables.
- Recommendation: deploy the video with a VideoObject schema and a text transcript or summary, and publish it on a YouTube channel. YouTube mentions are the brand signal most strongly correlated with AI citations (about 0.74).

## Authority & Brand Signals (40)
- Strengths: 5 named team members with credentials (Doctor CAFYD, university lecturers, a funcionario in post, a former tribunal member). There's a real Google Business Profile with a review link, and the NAP (name, address, phone) is consistent.
- Gaps:
  - No `sameAs` in the Organization JSON-LD. The footer has Instagram (`instagram.com/educoef`) and a Google review link, but neither is declared as `sameAs`.
  - No Person schema for team members, and no links to their university or ORCID profiles. Javier Murillo is a Doctor, so a Google Scholar/ORCID link would be strong.
  - Brand mentions: Wikipedia (es) has 0 results for "EDUCOEF", which is expected for a local academy and not worth pursuing. Reddit was blocked from the automated check and is unverified (manual check of r/oposiciones suggested). No YouTube channel or LinkedIn company page is linked.
  - Only one Google review is quoted on-page, with no aggregate rating or count. Don't add `aggregateRating` markup for your own reviews: Google won't show self-serving LocalBusiness review stars.
  - The JSON-LD `description` still says "profesor de Educación Física", which reads as Secundaria-only. Mention both cuerpos, as `serviceType` already does.
  - `name` "EDUCOEF — Academia Oposiciones Educación Física" mixes the brand and a descriptor. Use `name: "EDUCOEF"` and put the descriptor in `alternateName` or `description` for cleaner entity resolution.

## Brand Mention Summary
| Platform | Status |
|---|---|
| Wikipedia | Not present (expected; skip) |
| Reddit | Unverified (blocked from the automated check) |
| YouTube | No channel linked; video not deployed |
| LinkedIn | Not linked |
| Instagram | @educoef linked in footer, not in sameAs |
| Google Business Profile | Present (review link), not in sameAs |

## Platform Scores (estimates)
- Google AI Overviews: 45. Indexable, has schema and local GBP, but thin informational content.
- ChatGPT Search: 40. Accessible via OAI-SearchBot and Bing, but weak off-site entity footprint.
- Perplexity: 45. Accessible, and the concrete pricing and FAQ can be cited, but few facts.
- Bing Copilot: 45. Same as ChatGPT. Submitting via IndexNow or Bing Webmaster Tools would help.

## Top 5 Highest-Impact Changes
1. **Publish answer-first informational content** on the Andalucía EF oposición: exam structure, convocatorias 2027/2028, temario by cuerpo, Primaria vs Secundaria, cost of preparation. Use question H2s and a 40-60-word direct answer under each, followed by detail. Effort: medium (2-4 pages, about 1-2 days of writing). Impact: high.
2. **Add `sameAs`** (Instagram, Google Business Profile/Maps CID URL, plus YouTube and LinkedIn once created) and set `name: "EDUCOEF"` in the index.html JSON-LD. Add Person schema with `jobTitle` and `sameAs` for the team on /nosotros/. Effort: low (about 1 hour). Impact: medium-high.
3. **Replace vague claims with sourced numbers**: actual pass rate or plazas obtained per convocatoria, the survey sample size, and one consistent years-of-experience figure. Effort: low. Impact: high for citability.
4. **Deploy the platform video** with VideoObject schema and a transcript, and host it on a YouTube channel. Effort: low-medium. Impact: medium (multi-modal score plus the YouTube brand signal).
5. **Expand the FAQ answers to 40-80 words** with concrete facts: payment options (installments, methods), recording retention period, group size, the start dates of each group. Add 4-6 new questions (price, online vs presencial, which convocatoria the course targets). Keep FAQPage JSON-LD in sync. Also align the sitemap and canonicals with the trailing-slash URLs. Effort: low (2-3 hours). Impact: medium.

Optional and low priority: add `/llms.txt` with a short site summary and links (about 15 minutes; minimal measurable effect).

## Structured findings (audit-data.json, category "AI Search Readiness")
```json
{
  "category": "AI Search Readiness",
  "score": 49,
  "dimensions": {"citability": 35, "structural_readability": 55, "multimodal": 30, "authority_brand": 40, "technical_accessibility": 85},
  "findings": [
    {"id": "geo-robots", "severity": "pass", "title": "All AI search and training crawlers allowed via wildcard"},
    {"id": "geo-ssr", "severity": "pass", "title": "Content prerendered (SSR); no JS dependency for AI crawlers"},
    {"id": "geo-faq-schema", "severity": "pass", "title": "FAQPage JSON-LD server-rendered on /planes/ and matches visible FAQ"},
    {"id": "geo-llms-txt", "severity": "info", "title": "llms.txt missing (optional, low impact)"},
    {"id": "geo-thin-content", "severity": "high", "title": "No informational, answer-first content on exam structure, convocatorias, temario"},
    {"id": "geo-vague-claims", "severity": "high", "title": "'Alto porcentaje de aprobados' unquantified; 15 años vs una década inconsistency"},
    {"id": "geo-sameas", "severity": "medium", "title": "No sameAs in Organization JSON-LD; Instagram/GBP not declared"},
    {"id": "geo-person-schema", "severity": "medium", "title": "Team credentials present but no Person schema or external profile links"},
    {"id": "geo-faq-depth", "severity": "medium", "title": "FAQ answers 10-35 words; payment FAQ non-answer"},
    {"id": "geo-video", "severity": "medium", "title": "No video in production (feat/video-plataforma not deployed); no YouTube presence"},
    {"id": "geo-trailing-slash", "severity": "low", "title": "Sitemap/canonical URLs without trailing slash 301 to slash versions"},
    {"id": "geo-ld-description", "severity": "low", "title": "JSON-LD description reads Secundaria-only; name mixes brand and descriptor"}
  ]
}
```
