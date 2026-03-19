# SEO Improvements — EDUCOEF Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corregir los problemas de visibilidad en Google: añadir robots.txt, sitemap.xml, Open Graph tags, FAQ schema markup y preparar el terreno para Angular SSR.

**Architecture:** Angular 20 SPA desplegada en GitHub Pages con dominio personalizado `educoef.com`. Los cambios estáticos van a `public/`, las mejoras de schema markup en el componente `Plans`, y las meta tags sociales en `src/index.html`. Angular SSR se trata como tarea independiente al final por su mayor complejidad.

**Tech Stack:** Angular 20, TailwindCSS v4, GitHub Pages, JSON-LD (schema.org), pnpm

---

## Estado actual tras el audit (2026-03-19)

### ✅ Ya implementado
- `Title` + `Meta` service en los 4 componentes de página (home, about, plans, contact)
- JSON-LD `EducationalOrganization` + `LocalBusiness` en `index.html`
- `lang="es"` en `<html>`
- HTTPS + dominio personalizado
- Diseño responsive
- Páginas legales (privacidad, cookies, aviso)

### ❌ Pendiente (este plan)
| Problema | Impacto | Archivo |
|----------|---------|---------|
| ~~Sin `robots.txt`~~ | ~~Crítico~~ | ✅ Existe en `src/robots.txt` — incluido en build via `angular.json` |
| ~~Sin `sitemap.xml`~~ | ~~Crítico~~ | ✅ Existe en `src/sitemap.xml` — incluido en build via `angular.json` |
| Sin Open Graph / Twitter Cards | Alto | `src/index.html` (modificar) |
| Sin FAQ Schema markup | Medio | `src/app/pages/plans/plans.ts` (modificar) |
| Título iframe mapa incorrecto | Bajo | `src/app/pages/contact/contact.html` (modificar) |
| Sin Angular SSR | Crítico (largo plazo) | Ver Tarea 6 |

---

## File Map

| Archivo | Acción | Tarea |
|---------|--------|-------|
| `public/robots.txt` | Crear | T1 |
| `public/sitemap.xml` | Crear | T2 |
| `src/index.html` | Modificar — añadir OG/Twitter tags | T3 |
| `src/app/pages/plans/plans.ts` | Modificar — inyectar FAQ Schema JSON-LD | T4 |
| `src/app/pages/contact/contact.html` | Modificar — corregir title del iframe | T5 |

---

## Task 1: Crear robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Crear el archivo**

```
User-agent: *
Allow: /

Sitemap: https://educoef.com/sitemap.xml
```

- [ ] **Step 2: Verificar que se despliega correctamente**

Tras el build, comprobar que el archivo existe en `dist/`:
```bash
pnpm build && ls dist/oposiciones-inform/browser/robots.txt
```
Resultado esperado: el archivo existe.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): add robots.txt with sitemap reference"
```

---

## Task 2: Crear sitemap.xml

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Crear el sitemap con todas las rutas públicas**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://educoef.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://educoef.com/nosotros</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://educoef.com/planes</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://educoef.com/contacto</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

> **Nota:** Las páginas legales (`/aviso-legal`, `/politica-privacidad`, etc.) se excluyen del sitemap a propósito. No aportan valor de ranking y pueden diluir el crawl budget.

- [ ] **Step 2: Verificar que se despliega correctamente**

```bash
pnpm build && ls dist/oposiciones-inform/browser/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat(seo): add sitemap.xml with main routes"
```

- [ ] **Step 4: Tras el deploy, enviar a Google Search Console**

Ir a [Google Search Console](https://search.google.com/search-console) → Sitemaps → introducir `https://educoef.com/sitemap.xml` → Enviar.

---

## Task 3: Añadir Open Graph y Twitter Card tags

**Files:**
- Modify: `src/index.html`

- [ ] **Step 1: Añadir las meta tags de Open Graph y Twitter**

En `src/index.html`, justo después del bloque `<meta name="keywords">` (línea 9), añadir:

```html
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://educoef.com" />
  <meta property="og:site_name" content="EDUCOEF" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:title" content="EDUCOEF — Academia Oposiciones Educación Física Andalucía" />
  <meta property="og:description" content="Prepara tus oposiciones de profesor de Educación Física en Andalucía. Clases presenciales en Córdoba y online para toda Andalucía. Metodología probada, plazas limitadas." />
  <meta property="og:image" content="https://educoef.com/logo.png" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="EDUCOEF — Academia Oposiciones Educación Física Andalucía" />
  <meta name="twitter:description" content="Prepara tus oposiciones de profesor de Educación Física en Andalucía. Clases presenciales en Córdoba y online para toda Andalucía." />
  <meta name="twitter:image" content="https://educoef.com/logo.png" />
```

> **Nota sobre og:image:** Se usa `logo.png` que ya existe en `public/`. Idealmente debería ser una imagen de 1200×630px. Si en el futuro se crea una imagen social específica, actualizar esta ruta.

- [ ] **Step 2: Verificar en el build**

```bash
pnpm build && grep "og:title" dist/oposiciones-inform/browser/index.html
```
Resultado esperado: aparece la línea con `og:title`.

- [ ] **Step 3: Commit**

```bash
git add src/index.html
git commit -m "feat(seo): add Open Graph and Twitter Card meta tags"
```

---

## Task 4: FAQ Schema markup en página de planes

**Files:**
- Modify: `src/app/pages/plans/plans.ts`

Los 4 FAQ items ya existen en `faqItems[]`. Hay que inyectar un `<script type="application/ld+json">` en el DOM cuando el componente se carga y retirarlo cuando se destruye.

- [ ] **Step 1: Añadir el método `injectFaqSchema()` al componente `Plans`**

Modificar `src/app/pages/plans/plans.ts` para añadir la lógica de schema:

```typescript
import { Component, signal, inject, OnInit, OnDestroy, DOCUMENT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

// ... interfaces existentes sin cambios ...

@Component({
  selector: 'app-plans',
  imports: [Hero, RouterLink, ScrollAnimate],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit, OnDestroy {
  private document = inject(DOCUMENT);

  constructor() {
    inject(Title).setTitle('Planes de Preparación | Oposiciones EF Andalucía — EDUCOEF Córdoba');
    inject(Meta).updateTag({ name: 'description', content: 'Plan Materiales, Plan Plus y Plan Premium para preparar oposiciones de EF en Andalucía. Modalidad presencial en Córdoba u online desde cualquier punto de Andalucía.' });
  }

  ngOnInit(): void {
    this.injectFaqSchema();
  }

  ngOnDestroy(): void {
    this.document.getElementById('faq-schema')?.remove();
  }

  private injectFaqSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': this.faqItems.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer,
        },
      })),
    };
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  // ... resto del código existente sin cambios ...
}
```

- [ ] **Step 2: Verificar en el navegador**

```bash
pnpm start
```
Abrir DevTools → Elements → buscar en `<head>` el `<script id="faq-schema">`. Debe contener el JSON-LD con las 4 preguntas.

También verificar que al navegar a otra página y volver, no se duplica el script.

- [ ] **Step 3: Verificar con Rich Results Test**

Ir a https://search.google.com/test/rich-results e introducir `http://localhost:4200/planes`. Debería detectar el tipo `FAQPage`.

- [ ] **Step 4: Commit**

```bash
git add src/app/pages/plans/plans.ts
git commit -m "feat(seo): add FAQ schema markup (JSON-LD) to plans page"
```

---

## Task 5: Corrección menor en contact.html

**Files:**
- Modify: `src/app/pages/contact/contact.html`

- [ ] **Step 1: Corregir el title del iframe de Google Maps**

En `src/app/pages/contact/contact.html`, línea ~256, cambiar:

```html
title="Ubicacion de Educo Center en Córdoba"
```

por:

```html
title="Ubicación de EDUCOEF en Córdoba"
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/contact/contact.html
git commit -m "fix(seo): fix Google Maps iframe title to use correct brand name"
```

---

## Task 6: Angular SSR (Server-Side Rendering) — Plan independiente

> **⚠️ Esta tarea es la de mayor impacto pero también la más compleja. Se recomienda tratarla como un plan independiente una vez completadas las tareas 1-5.**

### Por qué es la más importante

Actualmente Googlebot ve solo `<app-root></app-root>` en el HTML inicial. Con SSR, el servidor renderiza el HTML completo antes de enviarlo, con todo el contenido, títulos y meta tags visibles desde el primer byte.

### Estimación de esfuerzo
- Añadir `@angular/ssr`: 30 min
- Adaptar el código para compatibilidad servidor/browser (localStorage, document, etc.): 2-4h
- Testing y ajustes: 1-2h
- Cambiar el deploy de GitHub Pages estático a una solución con Node.js (GitHub Pages NO soporta SSR): **cambio de infraestructura** (Vercel / Render / Railway recomendados)

### Bloqueante de infraestructura
GitHub Pages sirve archivos estáticos. SSR requiere un servidor Node.js. Las opciones gratuitas:
- **Vercel** (recomendado) — deploy automático desde GitHub, soporte Angular SSR nativo
- **Render** — tier gratuito con Node.js
- **Railway** — tier gratuito con Node.js

### Cómo iniciar cuando esté listo

```bash
ng add @angular/ssr
```

Esto genera `server.ts`, adapta `app.config.ts` y crea `app.config.server.ts`. Requiere revisar todos los usos de `document`, `window` y `localStorage` para protegerlos con `isPlatformBrowser()`.

---

## Checklist de verificación final (tareas 1-5)

Tras completar y desplegar todas las tareas:

- [ ] `https://educoef.com/robots.txt` devuelve 200 y contiene `Sitemap:`
- [ ] `https://educoef.com/sitemap.xml` devuelve 200 y lista las 4 URLs
- [ ] Compartir `https://educoef.com` en WhatsApp/Telegram muestra preview con título y descripción
- [ ] https://search.google.com/test/rich-results en `/planes` detecta `FAQPage`
- [ ] Google Search Console → Sitemaps → sitemap enviado con estado "Success"
- [ ] Google Search Console → URL Inspection → solicitar reindexación de homepage

---

## Recursos

- [Google Search Console](https://search.google.com/search-console) — enviar sitemap, inspeccionar URLs
- [Rich Results Test](https://search.google.com/test/rich-results) — verificar FAQ Schema
- [Open Graph Debugger (Meta)](https://developers.facebook.com/tools/debug/) — verificar OG tags
- [Schema.org FAQPage](https://schema.org/FAQPage) — referencia
