# SXO Findings: educoef.com (2026-11-17)

Label: **SXO Gap Score** (separate from the SEO Health Score)

## Pages analysed
Rendered with `render_page.py --mode always` (Chromium sandbox: on; `is_spa: false`, SSR/prerender confirmed) and parsed with `parse_html.py`.

| URL | Title | H1 | Words | Schema |
|---|---|---|---|---|
| `/` | Oposiciones Educación Física Primaria y Secundaria \| EDUCOEF Córdoba | Prepara tus Oposiciones de Educación Física: Primaria y Secundaria | ~686 (parser) / 292 main text | EducationalOrganization + LocalBusiness (no geo, no openingHours, no aggregateRating) |
| `/planes` | Planes de Preparación \| Oposiciones EF Primaria y Secundaria — EDUCOEF | Nuestros Planes | ~407 main text | FAQPage (5 Q), plus the global Org block |

Prices on /planes are in the rendered HTML: Plan Materiales 500 EUR one-time, Plan Plus 100 EUR/mes, Plan Premium 160 EUR/mes. **Mismatch:** CLAUDE.md says the "Plan Básico" costs 399 EUR. The live site shows "Plan Materiales" at 500 EUR, so the docs are out of date. There is no Offer/Course/Product schema for the prices.

Site inventory (sitemap.xml): `/`, `/nosotros`, `/planes`, `/contacto`, plus legal pages. **There is no `/primaria` (404), `/secundaria`, `/cordoba`, `/online`, `/temario`, `/convocatoria-*` or blog.** All four target queries have to be served by just two URLs.

## SERP analysis (WebSearch; not a live Google SERP, see Limitations)

| Query | Dominant page type in top results | Consensus | Notable |
|---|---|---|---|
| academia oposiciones educación física Córdoba | Course-directory listings (educaweb, emagister, aprendemas, oposiciones.es/academias/cordoba). These are comparison pages listing academies with price and format. Also local news (CSIF Córdoba, priegodigital) | ~70% comparison/directory | Competitors that show up: Academia Cruz Conde (Córdoba, Primaria + Secundaria course listings), MasterD Davante. Local pack expected (not observed). |
| oposiciones educación física primaria | Informational (UNIR guide, Campus Educación temario articles, Campus Training process guide, oposiciones.es convocatoria news) plus course listings | ~60% blog/guide, ~40% course listings | Searchers want temario (25 temas), requirements (mención EF) and the process |
| oposiciones educación física secundaria Andalucía | Convocatoria/news (El Español: 503 EF plazas 2026; oposiciones.es OEP pages: 141/424 plazas; CSIF calificaciones 2026; BOE/BOJA) | ~75% news/convocatoria info | Freshness-driven, focused on plazas, dates and results. Academia pages are rare. |
| preparación oposiciones educación física online | Course-directory product listings (educaweb x4, emagister, aprendemas) showing prices (Ucademy 2.679 EUR, Opospills 1.285 EUR). Some listicles (apps) | ~75% comparison/course listing | Prices are visible in the snippets. Users compare price and modality. |

SERP features observed: none confirmed (no PAA, ads or local pack data from this tool). Related search themes you'd expect from the results: temario, plazas, convocatoria 2027/2028, precio, opiniones.

## Page-type mismatch

| Query | Best EDUCOEF URL | Page type | SERP dominant | Severity |
|---|---|---|---|---|
| academia ... Córdoba | `/` | Landing (with some local signals; the map is on /contacto, not home) | Directory/comparison + Local | **MEDIUM**: a landing page can rank for the brand+local query, but home has no Córdoba-specific section, address or map, and no opening hours or geo in the schema |
| oposiciones EF primaria | `/` (shared) | Landing | Guide/informational + course listing | **HIGH**: no Primaria-specific page, temario, process or requirements content |
| oposiciones EF secundaria Andalucía | `/` (shared) | Landing | News/convocatoria info | **CRITICAL**: no content on the convocatoria, plazas or calendar. The home banner mentions "Primaria 2027 / Secundaria 2028" but there is no page behind it. |
| preparación oposiciones EF online | `/planes` | Product/pricing (Landing) | Course listing with price + modality | **MEDIUM**: the type matches, but the H1 "Nuestros Planes" has no keywords, "online" is only in the subtitle, there's no Course/Offer schema, and nothing compares it with alternatives |

**Primary finding:** one generic home page plus one pricing page are being asked to rank for four intents, two of them informational. Competitors that rank (Cruz Conde, Ucademy, Opospills via educaweb/emagister) have **separate course pages per cuerpo** (Primaria EF vs Secundaria EF), and the informational queries are won by guides and convocatoria news. The missing landing pages per stage (`/primaria`, `/secundaria`) are the main structural gap.

## User stories (from the observed signals)
1. **Awareness**: "As a Primaria graduate with the EF mention, I want to know the temario, requirements and phases of the Andalucía Maestros exam so I can decide whether to sit it." Signal: the UNIR/Campus Educación/Campus Training guides rank for "oposiciones EF primaria".
2. **Awareness**: "As a future Secundaria opositor, I want the number of plazas and the dates for the next Andalucía convocatoria so I can plan when to start." Signal: El Español 503 plazas, oposiciones.es OEP pages and CSIF 2026 results dominate the Secundaria Andalucía query.
3. **Consideration**: "As someone comparing academies, I want to see price, modality (online/presencial) and what's included side by side." Signal: the educaweb/emagister/aprendemas listings with prices dominate the "online" and "Córdoba" queries.
4. **Decision**: "As a Córdoba-based opositor, I want to confirm the academy has a physical centre, small groups and real results before I pay." Signal: the local directory results (oposiciones.es/academias/cordoba) and a listed local competitor (Cruz Conde, address shown).
5. **Decision**: "As a working opositor, I want to know whether live classes are recorded and whether I can start mid-year." Signal: the online modality framing in listings (MasterD "campus virtual", Opospills online). EDUCOEF's FAQ already answers this, which is good.

## SXO Gap Score (home + planes combined): **52 / 100**

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 7/15 | Landing/pricing pages exist; there are no stage-specific or informational pages for 2 of the 4 intents |
| Content Depth | 5/15 | Home has ~290 words of main text and /planes ~400. No temario breakdown, exam phases, plazas or convocatoria dates |
| UX Signals | 11/15 | Clear CTA above the fold, a 40s platform video, a convocatoria banner, prices visible on /planes, an FAQ. The banner ("Primaria 2027 / Secundaria 2028") does not link to dedicated content |
| Schema | 7/15 | Org/LocalBusiness and FAQPage are present. Missing: Course/Offer with prices, geo, openingHours, aggregateRating, BreadcrumbList |
| Media | 9/15 | Platform video and team photos. No images of the classroom or centre, and no sample material (temario preview, infographic) |
| Authority | 8/15 | "+15 años", 2024 satisfaction survey (100% high/very high), one Google review. No pass-rate figures ("Alto porcentaje" is vague), no named alumni who got plazas, no preparer credentials on home |
| Freshness | 5/10 | The 2027/2028 convocatoria banner is current. There is no dated content, and htmldate returns 2026-01-01 |

## Persona scoring (Relevance / Clarity / Trust / Action, 25 each), weakest first

| Persona | R | C | T | A | Total | Top fixes |
|---|---|---|---|---|---|---|
| **Secundaria Andalucía info-seeker** (wants plazas and dates) | 6 | 5 | 12 | 12 | **35** | Create `/oposiciones-educacion-fisica-secundaria-andalucia` covering the 2026 results and plazas, the expected 2028 calendar, exam phases, the temario (Orden 1993 / current), and a CTA to Plan Premium. Link the home banner "Secundaria 2028" to it |
| **Opositor Primaria** (Maestros EF, Andalucía 2027) | 9 | 8 | 13 | 15 | **45** | Create `/oposiciones-educacion-fisica-primaria-andalucia` with the 25-tema temario list, the Primaria programación/situaciones de aprendizaje model, the 2027 calendar, Primaria-specific testimonials, and "Empieza Primaria 2027" as the CTA. Link the home banner |
| **Price comparer** (online preparation) | 15 | 16 | 11 | 15 | **57** | H1 "Precios de preparación de oposiciones de EF (online y presencial)". Add a comparison table (plan vs features vs Primaria/Secundaria), a "precio total estimado hasta el examen" example (for instance 160 EUR x months), the payment options, and Course+Offer schema. Market context: competitors list 1.285-2.679 EUR, so a total-cost framing helps EDUCOEF |
| **Opositor Secundaria** (commercial, ready to buy) | 12 | 12 | 13 | 17 | **54** | Stage landing page as above, with the Secundaria programación/defensa specifics, tribunal simulations, and a Secundaria testimonial |
| **Córdoba local opositor** | 14 | 13 | 14 | 17 | **58** | On home, add a "Centro en Córdoba" section with the address (Calle Alonso El Sabio 26), map/directions, group size (max 22) and schedule. Add geo and openingHours to the schema. Consider a `/academia-oposiciones-educacion-fisica-cordoba` page. Keep GBP reviews flowing (only one shown) |

## Recommended page architecture
- `/primaria` (or a keyword slug): Maestros EF Andalucía, covering temario, exam phases, convocatoria 2027, what the plans include for Primaria, FAQ (FAQPage), Course schema
- `/secundaria`: Profesores EF Andalucía, covering the 2026 results context, 2028 outlook, plazas history (141 in 2022, 503 EF in 2026 per El Español, to verify against BOJA), Course schema
- `/planes`: keyword H1, comparison table, Offer schema, link to both stage pages
- Optional `/blog` or `/convocatorias`: dated news for freshness (plazas, listas, calificaciones). This is the only realistic way to compete with CSIF/oposiciones.es on the informational SERPs
- List EDUCOEF on educaweb/emagister/aprendemas/oposiciones.es: these directories **are** the SERP for the commercial queries, so being listed there is the quickest way to get visibility

Cross-skill: `/seo schema` (Course/Offer/LocalBusiness enrichment), `/seo local` (GBP; the Córdoba query is local), `/seo content` (E-E-A-T: preparer credentials, pass-rate evidence), `/seo page` (thin home content).

## Structured findings (audit-data.json, category "Search Experience")
```json
[
 {"id":"sxo-01","severity":"critical","title":"No dedicated Primaria/Secundaria landing pages","evidence":"/primaria returns 404; sitemap has only /, /nosotros, /planes, /contacto; SERP competitors use separate course pages per cuerpo","fix":"Create stage-specific pages and link from home banner"},
 {"id":"sxo-02","severity":"critical","title":"Informational/convocatoria intent unserved","evidence":"'oposiciones EF secundaria Andalucía' SERP ~75% convocatoria/news (El Español, CSIF, oposiciones.es)","fix":"Add convocatoria/temario content hub with dated updates"},
 {"id":"sxo-03","severity":"high","title":"/planes lacks comparison framing and Offer/Course schema","evidence":"H1 'Nuestros Planes'; prices 500€ único / 100€/mes / 160€/mes not in schema","fix":"Keyword H1, comparison table, Course+Offer JSON-LD"},
 {"id":"sxo-04","severity":"medium","title":"Weak local signals on home for Córdoba query","evidence":"No address/map on home; LocalBusiness lacks geo, openingHours, aggregateRating","fix":"Add Córdoba centre section and enrich schema"},
 {"id":"sxo-05","severity":"medium","title":"Thin content and vague authority claims","evidence":"Home ~290 words main text; 'Alto porcentaje de aprobados' without figures; 1 Google review shown","fix":"Publish pass-rate data, preparer credentials, more reviews"},
 {"id":"sxo-06","severity":"low","title":"Docs/pricing inconsistency","evidence":"CLAUDE.md says Plan Básico 399€; live shows Plan Materiales 500€","fix":"Update CLAUDE.md"}
]
```
SXO Gap Score: 52/100.

## Limitations
- WebSearch is not a live google.es SERP. It returned aggregated results without reliable ranking order, PAA, ads, local pack or AI Overview data, so the SERP features could not be confirmed.
- No ranking or Search Console data, so it isn't known where EDUCOEF currently ranks.
- Plaza figures from third parties conflict (503 vs 6 for 2026). Verify against BOJA before publishing.
- Competitor pages were not rendered individually; their classification is based on titles and snippets.
- No wireframes were requested.
