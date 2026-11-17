# Content Quality and On-Page Findings: educoef.com

Audit date: 2026-11-17. Method: raw HTML fetch (`render_page.py --mode never/raw`; pages are SSR-prerendered, `is_spa: false`, no Playwright needed). Pages checked: `/`, `/nosotros/`, `/planes/`, `/contacto/`, plus the 4 legal URLs linked in the footer. The `feat/video-plataforma` branch (home video) is not live yet, so it is not covered here.

## Scores

| Metric | Score |
|---|---|
| **Content Quality** | **55 / 100** |
| **On-Page SEO** | **60 / 100** |
| E-E-A-T (weighted) | 53 / 100 |
| AI citation readiness | 40 / 100 |
| Templated metadata site risk | low (0/4 templated) |

### E-E-A-T breakdown (this skill's own weights, not Google's)

| Factor | Weight | Score | Evidence |
|---|---|---|---|
| Experience | 20% | 70 | 5 named Google reviews. Three give the year they won a post ("saqué mi plaza en 2022", "en 2024") and name specific trainers (Juande, Álvaro, Fran, Moisés). First-hand proof like this is uncommon for a small academy. |
| Expertise | 25% | 60 | 5 named team members with photos. There is a doctorate in CAFYD, 20-30 years of experience, and one member has sat on an exam panel. Gaps: no university or school is named, no publications or ORCID/LinkedIn links, and Juan de Dios is labelled "Profesor Universitario" while his bio says "Antiguo Docente funcionario". |
| Authoritativeness | 25% | 40 | Only 5 Google reviews. `sameAs` links only to Instagram. No press coverage, no association memberships, no outside citations, no published pass-rate data. |
| Trustworthiness | 30% | 45 | Good: real street address, phone, email, opening hours, HTTPS. Bad: all 4 legal pages return HTTP 404 to crawlers; plan prices are not shown in the HTML; the site's own claims contradict each other (see C2); "Alto Porcentaje de Aprobados" has nothing to back it. |

Weighted: 0.2x70 + 0.25x60 + 0.25x40 + 0.3x45 = **52.5**

## Critical / High

**T1. Legal pages return HTTP 404 (high, trust and indexing).** `/aviso-legal`, `/politica-privacidad`, `/politica-cookies` and `/clausula-informativa` all return status 404. They are served the GitHub Pages `404.html` SPA redirect with `<meta name="robots" content="noindex">`, so they were not prerendered. Users still see them after the JS redirect, but Google sees four 404s linked from every footer. A Spanish LSSI/RGPD trust signal that crawlers cannot reach is the weakest point in Trust. `/politica-cookies` is also listed in `sitemap.xml`, so the sitemap includes a 404. Fix: add the legal routes to prerendering in `app.routes.server.ts` (RenderMode.Prerender) so `/aviso-legal/index.html` and the others exist.

**T2. Canonical and redirect conflict (high, on-page).** `/nosotros`, `/planes` and `/contacto` each 301-redirect to the trailing-slash version (`/nosotros/` etc.). The `<link rel="canonical">`, `og:url` and sitemap `<loc>` all point to the version without the slash, which redirects. So every canonical points at a 301. Pick one form: either make canonical, og:url and sitemap use the trailing slash (simplest on GitHub Pages), or serve flat `nosotros.html` files.

**C1. No prices on /planes (high, trust and AI citation).** The plan cards list features but no price appears anywhere in the HTML (no "€"). Project notes say Plan Básico is 399€ one-time. For a commercial "planes" page, price is the most-asked and most-quoted fact. Its absence lowers trust and leaves AI answers with nothing to cite. Add prices, or at least "desde X €", plus an `Offer` in JSON-LD.

**C2. The site's own claims contradict each other (high, trust).**
- Home says "Más de 15 años" / "+15 Años de Experiencia"; /nosotros says "más de una década".
- Home shows "98% Alumnos Satisfechos" in the stats strip and "100% de satisfacción alta o muy alta" in the survey block just below it.
- "Alto Porcentaje de Aprobados: Un alto porcentaje de nuestros alumnos superan la oposición cada convocatoria" gives no number, year or method. Quality raters treat unsupported results claims on YMYL-adjacent education/career pages as a negative. Either publish real figures ("X aprobados con plaza en 2024 de Y alumnos presentados") or soften the claim.
- "+200 Alumnos Formados" is not sourced either. That is fine as a stat, but keep it in line with the survey data.

## Medium

**C3. Thin content against page-type floors.**

| Page | Main-content words (extracted) | Full page incl. nav/footer | Floor | Status |
|---|---|---|---|---|
| Home | ~262 (extracted text drops the reviews carousel); ~600 with reviews | 737 | 500 | Borderline. Most of the text is reviews. |
| /nosotros | 297 | 428 | 500 (about) | Thin. Values (Excelencia/Compromiso/Innovación) are one generic line each. |
| /planes | 407 | 589 | 800 (service) | Thin. FAQ answers run 6-20 words. |
| /contacto | 52 | 198 | n/a | Acceptable for contact, but no directions, parking or transport info, and no FAQ. |

The bigger gap is topical coverage, not word count. No page explains the oposición itself: the structure of the Andalusian exam (written theme, supuesto práctico, programación and defence), 2027 Primaria / 2028 Secundaria timelines, number of temas (it differs by body, so give each separately), how many places were offered in past calls, or what changes between Primaria and Secundaria. That content is what searchers ("oposiciones educación física andalucía 2027", "temario EF secundaria") look for, and the site has none of it. Recommendation: one evergreen guide per body, `/oposiciones-primaria-educacion-fisica-andalucia` and `/oposiciones-secundaria-educacion-fisica-andalucia` (1,500+ words each, with dates, the official BOJA reference, exam phases, and a FAQ), linked from the home banner.

**C4. Generic, template-like copy (medium, QRG low-effort markers).** Values blocks ("Buscamos la máxima calidad en todo lo que hacemos", "Nos comprometemos con el éxito de cada alumno", "Actualizamos constantemente nuestra metodología") and the CTA ("No dejes pasar esta oportunidad") could be on any academy's site. The methodology steps are one line each. Replace with specifics: how the initial diagnosis works, how often supuestos are corrected, turnaround times, an example of a correction. "Grupos Reducidos ... máximo 22 alumnos" undercuts itself, since 22 is not "reducido" to most readers. Reword ("grupos de hasta 22") or show a real average.

**C5. Primaria/Secundaria wording drift.** The home CTA ends "consigue tu plaza de profesor" and the JSON-LD `description` says "oposiciones de profesor de Educación Física". Both read as Secundaria-only. Use "maestro o profesor" to match the rest of the site.

**O1. Generic H1s on inner pages.** H1s are "Sobre Nosotros", "Nuestros Planes" and "Contacto", with no topic or location. Suggested: "Equipo de preparadores de oposiciones de Educación Física en Córdoba", "Planes de preparación para oposiciones de EF (Primaria y Secundaria)", "Contacta con EDUCOEF, academia de oposiciones de EF en Córdoba". The home H1 is good.

**O2. Heading misuse in footer.** Every page has a footer `<h2>EDUCOEF</h2>` and `<h3>` Enlaces/Contacto/Síguenos. That adds an extra off-topic H2 to each outline. Make them `<p>` or `<span>` styled as headings. On home, "¿Te gusta EDUCOEF?" as an H2 is also low-value.

**O3. FAQ questions are not visible as text in the SSR HTML.** The /planes extracted text shows only the FAQ answers. The questions live in the FAQPage JSON-LD, but in the HTML they look like they sit in button/accordion markup that the extractor drops. Make sure each question is a real text node (e.g. `<h3>` or `<button>` text) in the prerendered HTML. Expand the answers: "¿Hay facilidades de pago?" answered with "contáctanos" does not answer the question.

**O4. Titles and descriptions: unique, slightly long.** Titles run 66-71 characters, so expect truncation at about 60 (shorten the tail, e.g. drop "| EDUCOEF" duplication). The /nosotros description is 180 characters; cut it to about 155. Templated-metadata check: `site_risk: low`, `templated_ratio: 0.0`, no `shared_cta_phrases`. One low signal: `/contacto/` has `brand_suffix_in_description`.

**O5. Twitter Card tags are the same site-wide.** Every page carries the static `index.html` `twitter:title` / `twitter:description`, while `og:*` is per-page. Set `twitter:title` and `twitter:description` in each component's Meta service, or remove them so platforms fall back to OG. `og:image` and `twitter:image` are the logo on every page and `twitter:card` is `summary`. A 1200x630 share image would do better.

**O6. Internal linking is nav and footer only.** All 4 pages have the identical link set (nav + footer + Google review + Instagram). There are no contextual in-body links (for example, the home "Supuestos Prácticos" feature does not link to /planes#supuestos, and team bios do not link to the plans they teach). The home banner "Empieza ahora" is the only in-body path. Add descriptive anchor links between pages.

## Low

- Sitemap has no `<lastmod>`. `publication_date` reads 2026-01-01 on all pages, while Last-Modified is 2026-10-22. Add lastmod and a visible "actualizado" date on /planes (the temario is updated each convocatoria).
- Team images have no `width`/`height` (CLS risk) and no `loading="lazy"`. Alt text is the person's name, which is fine.
- JSON-LD: add `Person` entries for the team (`jobTitle`, `alumniOf`, `sameAs` LinkedIn) and `Course`/`Offer` for plans. Add `aggregateRating` only if the reviews are first-party collected and follow Google's self-serving review policy (Google reviews embedded on your own site do not qualify for LocalBusiness star snippets).
- "Fran Plata" is the only team member without a full name. A full name strengthens the expertise signal.
- Readability (Fernández-Huerta, extracted text): home 45.8, nosotros 44.5, planes 49.0, average 7 words per "sentence". The score is pulled down by short heading fragments and long technical words (programación, oposiciones), not by dense prose. Real readability is fine: short sentences, plain register, informal "tú". No action needed.
- Typos in the embedded reviews ("dió", "acabe", "ayudo") are user-generated, so leave them as they are.

## AI citation readiness (40/100)

Strengths: SSR HTML, clear H1, FAQPage schema, address/phone in LocalBusiness schema, testimonials with concrete outcomes.
Weaknesses: no quotable facts (prices, exam dates, temario counts per body, number of past aprobados, class schedule), FAQ answers too short to quote, no definition-style content about the oposición, no Person/Course/Offer entities, no dated update signals. The long-form guides (C3), prices (C1) and published results (C2) are the main levers.

## AI-generated content assessment (QRG Sept 2025)

The body copy does not read as mass-produced. Testimonials and team bios are specific and first-hand. The low-effort markers sit in the values, methodology and CTA blocks (generic phrasing, no original insight) and in the unbacked results claim. There is no repetitive structure across pages beyond the shared footer.

## Structured findings (Content Quality category, audit-data.json)

```json
[
  {"id":"legal-pages-404","severity":"high","category":"Content Quality","title":"Legal pages return HTTP 404 (noindex SPA fallback)","urls":["/aviso-legal","/politica-privacidad","/politica-cookies","/clausula-informativa"],"fix":"Prerender legal routes in app.routes.server.ts; remove 404 URL from sitemap until fixed"},
  {"id":"canonical-points-to-redirect","severity":"high","category":"On-Page","title":"Canonical/og:url/sitemap use non-slash URLs that 301 to trailing slash","urls":["/nosotros","/planes","/contacto"],"fix":"Use trailing-slash URLs consistently"},
  {"id":"no-prices","severity":"high","category":"Content Quality","title":"No prices on /planes","urls":["/planes/"],"fix":"Show prices and add Offer schema"},
  {"id":"inconsistent-claims","severity":"high","category":"Content Quality","title":"15 años vs una década; 98% vs 100% satisfacción; unsubstantiated 'alto porcentaje de aprobados'","urls":["/","/nosotros/"],"fix":"Unify figures; publish verifiable pass data or soften claim"},
  {"id":"thin-topical-coverage","severity":"medium","category":"Content Quality","title":"No content about the oposición itself; /planes and /nosotros below floors","fix":"Create Primaria and Secundaria guide pages; expand FAQ and methodology"},
  {"id":"generic-copy","severity":"medium","category":"Content Quality","title":"Generic values/methodology/CTA copy","urls":["/nosotros/","/"]},
  {"id":"profesor-only-wording","severity":"medium","category":"Content Quality","title":"'plaza de profesor' and JSON-LD description read as Secundaria-only"},
  {"id":"generic-h1","severity":"medium","category":"On-Page","title":"Inner-page H1s lack topic/location","urls":["/nosotros/","/planes/","/contacto/"]},
  {"id":"footer-headings","severity":"low","category":"On-Page","title":"Footer uses H2/H3 for brand and link groups site-wide"},
  {"id":"faq-questions-not-text","severity":"medium","category":"On-Page","title":"FAQ questions not extracted as visible text; answers too short","urls":["/planes/"]},
  {"id":"title-desc-length","severity":"low","category":"On-Page","title":"Titles 66-71 chars; /nosotros description 180 chars","templated_metadata":{"site_risk":"low","templated_ratio":0.0,"shared_cta_phrases":{}}},
  {"id":"twitter-static","severity":"low","category":"On-Page","title":"twitter:title/description identical on all pages"},
  {"id":"no-contextual-links","severity":"medium","category":"On-Page","title":"Internal linking limited to nav/footer"},
  {"id":"sitemap-lastmod","severity":"low","category":"Content Quality","title":"No lastmod in sitemap; no visible update dates"}
]
```
