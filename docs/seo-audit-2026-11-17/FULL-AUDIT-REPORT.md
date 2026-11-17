# EDUCOEF — Informe completo de SEO (2026-11-17)

Sitio: https://educoef.com · Tipo: negocio local híbrido (aula en Córdoba + online Andalucía), academia de oposiciones EF Primaria y Secundaria · Stack: Angular 20 prerender, GitHub Pages.

## Score: 61/100

| Categoría | Peso | Nota | Fuente |
|---|---|---|---|
| Technical SEO | 22% | 74 | seo-technical (+ sitemap) |
| Content Quality | 23% | 55 | seo-content |
| On-Page | 20% | 60 | seo-content |
| Schema | 10% | 58 | seo-schema |
| Performance | 10% | ~72 (estimado) | seo-performance, sin medición de laboratorio |
| AI Search Readiness | 10% | 49 | seo-geo (agentic: heurística 100/100 solo home, Lighthouse no medido) |
| Images | 5% | ~45 (estimado) | logo 722 KB, fotos 1,7 MB, sin width/height |

Notas de método: no hay credenciales Google/Moz/Bing, ni baseline de drift. Backlinks: sin datos (Common Crawl no tiene el dominio) y por eso no puntúa. Performance e Images son estimaciones. SXO 52/100 y Local ~58/100 son informativos y no entran en la fórmula.

## Top 5 problemas
1. 4 páginas legales con 404+noindex en acceso directo (una está en el sitemap).
2. Sin páginas dedicadas a Primaria/Secundaria: la intención informativa/convocatorias no se cubre (SXO crítico).
3. Peso de imágenes: logo 722 KB y fotos del equipo 1,7 MB.
4. Canonical/sitemap sin barra final frente a 301 a la versión con barra.
5. Banner de cookies cubre ~26% de la pantalla móvil y el CTA de la home.

## Top 5 quick wins
1. Prerender de las rutas legales (cambio de pocas líneas).
2. Reemplazar `logo-alt.png`.
3. `sameAs`, `geo`, horario, `name` en el JSON-LD.
4. Unificar cifras contradictorias (+15 años / una década, 98% / 100%).
5. Quitar `/politica-cookies` del sitemap hasta que dé 200, y añadir `lastmod` reales.

## Hallazgos por área
Detalle completo en `findings/`: technical.md, content.md, schema.md, sitemap.md, performance.md, visual.md, geo.md, agentic.md, local.md, backlinks.md, sxo.md.

## Discrepancias resueltas entre subagentes
- Content dijo que /planes no tenía precios: **falso**, el HTML contiene 500€, 100€ y 160€.
- Vídeo de la plataforma: **en producción** desde ~18:38 del 2026-11-17, desplegado durante el audit; content y GEO auditaron antes.
- FAQPage de /planes: GEO lo ve en el HTML servido; content observa que solo las respuestas aparecen como texto. FAQ rich results retirados por Google en mayo de 2026, así que se trata como Info.
- CLAUDE.md dice "Plan Básico 399€"; la web muestra Plan Materiales a 500€.

## Limitaciones
Sin Lighthouse/CrUX (PSI 429, `npx lighthouse` denegado), sin datos de Search Console/GA4, SERP vía WebSearch y no google.es real, GBP no accesible, citas en directorios no revisadas.

---

## Adenda 2026-11-17: mediciones reales y correcciones

### Lighthouse real (PageSpeed Insights v5, producción antes de los cambios)
La estimación de Performance (~72) quedó muy por debajo de la realidad.

| Página | Móvil perf | Escritorio perf | LCP móvil | CLS móvil | TBT móvil |
|---|---|---|---|---|---|
| Home | 100 | 100 | 0,9 s | 0,055 | 10 ms |
| /planes/ | 100 | 100 | 1,0 s | 0,016 | 50 ms |
| /nosotros/ | 99 | 100 | 2,0 s | 0,012 | 40 ms |
| /contacto/ | 99 | 100 | 1,5 s | 0,042 | 30 ms |

Accesibilidad 96, Buenas prácticas 100 y SEO 92 en todas las páginas. Datos de campo (CrUX): no disponibles por poco tráfico de Chrome, así que son datos de laboratorio.

Fallos detectados y su resolución:
- SEO 92: enlace "Más información" del banner de cookies sin texto descriptivo → corregido.
- Accesibilidad 96: texto blanco sobre `accent-500` (contraste 2,8:1) en el banner de convocatorias y en los botones naranjas → corregido con `accent-700`.
- Imágenes sin dimensiones y ahorro de ~785 KiB (logo y póster del vídeo) → logo corregido; el póster sigue pendiente.

La nota de Performance pasa de ~72 a ~98, y Performance deja de ser un problema prioritario.

### Correcciones al audit original
- Las páginas legales llevan `noindex` a propósito. Se prerenderizan para que respondan 200, pero **no deben ir en el sitemap**.
- `/planes` sí muestra precios (500 €, 100 €/mes y 160 €/mes). El subagente de content se equivocó.
- El vídeo de la plataforma está en producción desde el merge del PR #2.
- Había dos sitemaps (`public/` y `src/`) y `angular.json` publicaba el de `src/`, el antiguo. Era la causa del desajuste.
- No se crearán páginas `/primaria` ni `/secundaria`, que no existían.

### Limitaciones que persisten
Sin datos de Search Console ni GA4 en el plugin (haría falta una cuenta de servicio), ficha de Google Business Profile no revisada, citas en directorios no revisadas y SERP vía WebSearch, no google.es.
