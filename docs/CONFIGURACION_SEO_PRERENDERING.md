# Configuración SEO y Prerendering — EDUCOEF

> Documento de referencia técnica. Última actualización: 2026-03-19

---

## Estado actual del SEO

### Puntuación on-page (referencia: herramienta de auditoría externa)
- **Score inicial**: 88/100
- **Score tras mejoras**: ~97-100/100 (canonical + meta description corregidos)

### Qué tiene resuelto el proyecto

| Elemento | Estado | Archivo |
|----------|--------|---------|
| `robots.txt` | ✅ | `src/robots.txt` |
| `sitemap.xml` | ✅ | `src/sitemap.xml` |
| Meta description por página | ✅ | `SeoService` en cada componente |
| Title tag por página | ✅ | `SeoService` en cada componente |
| Canonical URL por página | ✅ | `SeoService` en cada componente |
| Open Graph / Twitter Cards | ✅ | `src/index.html` |
| Schema EducationalOrganization + LocalBusiness | ✅ | `src/index.html` |
| Schema FAQPage en `/planes` | ✅ | `src/app/pages/plans/plans.ts` |
| Prerendering HTML estático | ✅ | `@angular/ssr` + `app.routes.server.ts` |
| Angular SSR completo | ❌ | Requiere cambio de infraestructura (ver abajo) |

---

## Arquitectura de prerendering

### Por qué prerendering y no SSR completo

| | Prerendering estático | SSR completo |
|---|---|---|
| **Cómo funciona** | HTML generado en el BUILD | HTML generado en cada REQUEST |
| **Requiere servidor Node.js** | No | Sí |
| **Compatible con GitHub Pages** | ✅ Sí | ❌ No |
| **Beneficio SEO vs SPA puro** | ~80% del beneficio | ~100% del beneficio |
| **Coste de implementación** | Bajo | Alto (cambio infraestructura) |

Para EDUCOEF (sitio estático sin contenido dinámico por usuario), el prerendering cubre el 80% del beneficio del SSR sin ningún cambio de infraestructura. Es la solución óptima en este caso.

### Rutas prerenderizadas

Configurado en `src/app/app.routes.server.ts`:

```typescript
{ path: '',        renderMode: RenderMode.Prerender },  // home
{ path: 'nosotros', renderMode: RenderMode.Prerender },
{ path: 'planes',   renderMode: RenderMode.Prerender },
{ path: 'contacto', renderMode: RenderMode.Prerender },
{ path: '**',       renderMode: RenderMode.Client },    // legal pages: CSR
```

Las páginas legales usan `RenderMode.Client` porque no aportan valor de ranking y evitan aumentar el tiempo de build innecesariamente.

### Output del build

```
dist/academia-oposiciones/
├── browser/                    ← Desplegado a GitHub Pages
│   ├── index.html              ← Home prerenderizada
│   ├── nosotros/index.html     ← /nosotros prerenderizada
│   ├── planes/index.html       ← /planes prerenderizada
│   ├── contacto/index.html     ← /contacto prerenderizada
│   ├── index.csr.html          ← Fallback CSR (páginas legales)
│   └── main-*.js, styles-*.css ← Assets Angular
└── server/                     ← NO se despliega (solo usado en build)
    └── server.mjs
```

### Configuración angular.json relevante

```json
"server": "src/main.server.ts",
"outputMode": "server",
"ssr": {
  "entry": "src/server.ts"
}
```

> **Nota**: `outputMode: "server"` se usa aunque se despliegue a Pages estáticas. Con `outputMode: "static"` hay un bug en `@angular/ssr@20.3.x` (`allowedHosts is not iterable`). La carpeta `browser/` contiene los ficheros estáticos prerenderizados igualmente.

### Versiones críticas

```
@angular/ssr:  20.3.16  ← Debe coincidir con @angular/core
@angular/core: 20.3.16
```

> **Importante**: No actualizar `@angular/ssr` independientemente del resto de Angular. Si `@angular/ssr` es una versión más alta que `@angular/core`, el prerendering falla con `allowedHosts is not iterable`.

---

## Servicio SEO centralizado

`src/app/shared/seo/seo.ts` — gestiona título, meta description y canonical en un solo `set()`:

```typescript
inject(SeoService).set({
  title: 'Título de la página | EDUCOEF',
  description: 'Descripción bajo 160 caracteres.',
  canonical: 'https://educoef.com/ruta',
});
```

Cada página lo llama en el `constructor()`. El SeoService:
1. Actualiza `<title>` via Angular `Title` service
2. Actualiza `<meta name="description">` via Angular `Meta` service
3. Busca `<link rel="canonical">` en el `<head>` y lo crea si no existe, luego actualiza el `href`

---

## Compatibilidad SSR en componentes

Durante el prerendering, Node.js no tiene `window`, `localStorage` ni `IntersectionObserver`. Los archivos protegidos con `isPlatformBrowser()`:

| Archivo | API protegida | Motivo |
|---------|--------------|--------|
| `cookie-banner.ts` | `localStorage` | Inicialización del signal de visibilidad |
| `contact.ts` | `localStorage` | Rate limiting del formulario |
| `scroll-animate.ts` | `IntersectionObserver` | Animaciones de scroll |

```typescript
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

private readonly platformId = inject(PLATFORM_ID);

if (isPlatformBrowser(this.platformId)) {
  // código solo-browser
}
```

---

## FAQ Schema markup en `/planes`

`src/app/pages/plans/plans.ts` inyecta dinámicamente un `<script type="application/ld+json">` con `FAQPage` schema:
- Se crea en `ngOnInit()` y se elimina en `ngOnDestroy()` para evitar duplicados al navegar
- Con prerendering, el schema queda embebido en el HTML estático de `/planes/index.html`
- Verificable en: https://search.google.com/test/rich-results

---

## Qué mejoraría el SEO en el futuro

### Mejoras fáciles (sin cambio de infraestructura)

| Mejora | Impacto | Esfuerzo |
|--------|---------|----------|
| Imagen OG dedicada (1200×630px) | Medio | 30 min |
| `<meta name="author">` en páginas | Bajo | 15 min |
| `BreadcrumbList` schema en páginas interiores | Medio | 1h |
| `Person` schema para cada miembro del equipo en `/nosotros` | Medio | 1h |
| Enviar sitemap a Bing Webmaster Tools | Bajo | 10 min |

### SSR completo (requiere cambio de infraestructura)

El 20% de beneficio restante frente al prerendering viene del SSR dinámico: el servidor genera HTML en tiempo real, útil si hubiera contenido personalizado por usuario (precios dinámicos, plazas en tiempo real, etc.).

Para habilitarlo habría que:
1. Cambiar `publish_dir` en el workflow de GitHub Pages a un servicio con Node.js
2. **Opciones gratuitas**: Vercel (recomendado), Render, Railway
3. El código ya está preparado (`server.ts`, `app.config.server.ts`) — solo cambiaría el deploy

---

## Checklist de verificación post-deploy

- [ ] `https://educoef.com/` devuelve HTML con `<h1>` visible (no `<app-root>` vacío)
- [ ] `https://educoef.com/planes` devuelve `<title>Planes de Preparación | ...`
- [ ] `view-source:https://educoef.com/` muestra contenido real (no solo `<app-root>`)
- [ ] Google Search Console → URL Inspection → solicitar reindexación
- [ ] https://search.google.com/test/rich-results en `/planes` detecta FAQPage
