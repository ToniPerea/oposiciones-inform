# EDUCOEF — Plan de acción SEO (audit 2026-11-17)

SEO Health Score: **61/100** (antes de aplicar el plan)

> **Estado a 2026-11-17 (tras desplegar el commit `14618e4` en `main`)**
>
> | # | Acción | Estado |
> |---|---|---|
> | 1 | Prerender de páginas legales | ✅ Hecho (siguen `noindex` y fuera del sitemap; el audit se equivocó al sugerir incluirlas) |
> | 2 | Banner de cookies compacto en móvil | ✅ Hecho (el alto final no se midió con navegador) |
> | 3 | Logo de la navbar | ✅ Hecho (722 KB → 15 KB) |
> | 4 | Páginas `/primaria` y `/secundaria` | ⛔ **Descartado**: nunca han existido y se decidió no crearlas |
> | 5 | Canonicals y sitemap con barra final | ✅ Hecho |
> | 6 | JSON-LD como `@graph` | ✅ Hecho (con horario de lunes a viernes) |
> | 7 | Horario real | ✅ Lunes a viernes 9:00-20:00 (sábados eliminados de la web) |
> | 8 | Fotos del equipo | ✅ Hecho (~1,7 MB → ~0,55 MB) |
> | 9 | `/planes`: H1, tabla comparativa, `Offer` | ✅ Hecho |
> | 10 | Cifras contradictorias | ⏸ Pendiente por decisión: se dejan como están |
> | 11 | Sitemap con `lastmod`, sin `priority`/`changefreq`, fuente única | ✅ Hecho (los `lastmod` son manuales y habrá que actualizarlos) |
> | 12 | Ampliar `/planes`, `/nosotros` y FAQ | ✅ Hecho (`/planes` ~1.100 palabras, `/nosotros` ~490) |
> | 14 | `Person` del equipo | ✅ Hecho |
> | 15 | Teléfono con `tel:` y código postal | ✅ Hecho |
> | 13, 16-21 | Reseñas visibles, directorios, fuentes en local, política de IA, medición, Cloudflare | ⏳ Pendientes |
>
> Contraste: el banner y los botones naranjas usan ahora `accent-700` para cumplir WCAG AA.


## Fase 1 — Crítico / High (semana 1)

1. **Prerenderizar las 4 páginas legales** (`/aviso-legal`, `/politica-privacidad`, `/politica-cookies`, `/clausula-informativa`). Hoy dan 404+noindex en acceso directo.
   Fix: entradas `RenderMode.Prerender` en `src/app/app.routes.server.ts` (hoy caen en `**` → `Client`).
   Dependencia: desbloquea el sitemap y el cumplimiento legal.
   Falla si: `curl -I` a cada ruta no devuelve 200.
2. **Banner de cookies en móvil**: ocupa ~26% de la pantalla y tapa el CTA de la home. Compactarlo (una fila de botones, menos alto) y no solapar el toast de Instagram.
3. **Logo de la navbar**: `logo-alt.png` 2000×2000 / 722 KB mostrado a ~40 px. Sustituir por WebP/SVG con `width`/`height`. Ahorra ~700 KB por página.
4. ~~**Páginas por cuerpo**: crear `/primaria` y `/secundaria` (temario, fases del examen, calendario de convocatorias 2027/2028, FAQ). Enlazar el banner de la home a ellas. Verificar plazas contra el BOJA antes de publicar cifras.~~ *(Descartado: no se van a crear.)*

## Fase 2 — High/Medium (semanas 2-3)

5. **Canonicals y sitemap con barra final** (GitHub Pages redirige 301 a `/planes/`). Unificar canonical, `og:url` y sitemap.
6. **JSON-LD como `@graph`**: Organization + WebSite con `@id`; `name: "EDUCOEF"` (largo como `alternateName`); `logo`, `image`, `geo` (37.8948126,-4.7749106), `openingHoursSpecification`, `priceRange`, `sameAs` (Instagram, GBP), `hasMap`; `areaServed` con Córdoba; mover `serviceType` a un nodo `Service`; corregir la descripción (suena a solo Secundaria). No publicar el NIF.
7. **Decidir el horario real** (L-V 9-20 en la web vs. sábados 10-14 en `contact.ts`) y alinear web, schema y Google Business Profile.
8. **Fotos del equipo** (`/nosotros`, ~1,7 MB para 96×96 px): redimensionar a ~192 px, WebP, `width`/`height`, lazy.
9. **/planes**: H1 con palabra clave, tabla comparativa, nodos `Offer`/`priceSpecification` (500€ único, 100€/mes, 160€/mes).
10. **Cifras coherentes**: "+15 años" vs. "más de una década"; "98%" vs. "100% satisfacción"; dar cifra real a "Alto porcentaje de aprobados" o quitarla.
11. **Sitemap**: añadir `lastmod` reales, quitar `priority`/`changefreq`, reconciliar `public/sitemap.xml` (4 URLs) con el publicado (5).

## Fase 3 — Contenido y autoridad (mes 2)

12. Ampliar `/planes` (~407 palabras) y `/nosotros` (~297); FAQ con respuestas de 40-80 palabras y las preguntas visibles como texto.
13. Mostrar nota y nº de reseñas de Google en la web (`aggregateRating` solo si cumple las directrices de Google).
14. `Person` para el equipo (y apellido completo de "Fran Plata").
15. Sección del centro de Córdoba en la home (dirección, mapa, tamaño de grupo); teléfono como enlace `tel:`; código postal en el footer.
16. Altas en educaweb, emagister, aprendemas y oposiciones.es; mirar Search Console > Enlaces.
17. Fuentes Google Fonts en local (WOFF2, menos pesos); mapa de contacto con carga al clic.
18. Decidir política de IA en `robots.txt` (entrenamiento sí/no) y, opcional, `llms.txt`.

## Fase 4 — Medición (continuo)

19. Crear API key de Google (`/seo google setup`) y re-medir Lighthouse/CWV reales; verificar el sitio en Search Console y Bing Webmaster.
20. Captura de baseline con `/seo drift baseline https://educoef.com` y repetir tras los cambios.
21. Plan B de infraestructura: Cloudflare delante (caché larga, brotli, cabeceras de seguridad).
