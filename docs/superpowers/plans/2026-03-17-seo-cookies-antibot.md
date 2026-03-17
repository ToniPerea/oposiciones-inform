# SEO + Cookies + Antibot — Plan de Implementación

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Proteger el formulario de spam, cumplir RGPD/LSSI con banner de cookies, y mejorar el SEO local de EDUCOEF para Córdoba y Andalucía.

**Architecture:** Tres fases independientes. Fase 1 (SEO) no tiene dependencias externas y se puede desplegar sola. Fase 2 (Antibot) añade 3 capas de protección al formulario. Fase 3 (Cookies) añade banner + página de política de cookies.

**Tech Stack:** Angular 20 (zoneless, signals), TailwindCSS v4, EmailJS, GitHub Actions (deploy)

---

## Archivos que se van a crear o modificar

### Crear
- `src/app/pages/legal/politica-cookies/politica-cookies.ts`
- `src/app/pages/legal/politica-cookies/politica-cookies.html`
- `src/app/layout/cookie-banner/cookie-banner.ts`
- `src/app/layout/cookie-banner/cookie-banner.html`
- `src/sitemap.xml`
- `src/robots.txt`

### Modificar
- `src/index.html` — Schema.org JSON-LD
- `src/app/app.routes.ts` — ruta `/politica-cookies`
- `src/app/app.html` — añadir `<app-cookie-banner />`
- `src/app/app.ts` — importar CookieBanner
- `src/app/layout/footer/footer.ts` — añadir enlace Política de Cookies
- `src/app/layout/footer/footer.html` — renderizar enlace
- `src/app/pages/home/home.ts` — meta tags SEO
- `src/app/pages/about/about.ts` — meta tags SEO
- `src/app/pages/plans/plans.ts` — meta tags SEO
- `src/app/pages/contact/contact.ts` — meta tags SEO + honeypot + rate limiting
- `src/app/pages/contact/contact.html` — campo honeypot
- `src/environments/environment.ts` — clave reCAPTCHA (desarrollo)
- `src/environments/environment.prod.ts` — clave reCAPTCHA (producción)
- `.github/workflows/deploy.yml` — inyectar secret RECAPTCHA_SITE_KEY
- `angular.json` — añadir sitemap.xml y robots.txt a assets

---

## Chunk 1: SEO Local

### Tarea 1: Meta tags y Title en cada página

**Archivos:**
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/about/about.ts`
- Modify: `src/app/pages/plans/plans.ts`
- Modify: `src/app/pages/contact/contact.ts`

- [ ] **Paso 1: Añadir Title y Meta en Home**

En `src/app/pages/home/home.ts`, añadir los imports e inyectar los servicios:

```typescript
import { Title, Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';
```

En el constructor de la clase `Home`:

```typescript
constructor() {
  inject(Title).setTitle('Academia Oposiciones Educación Física Córdoba | EDUCOEF Andalucía');
  inject(Meta).updateTag({ name: 'description', content: 'Prepara tus oposiciones de profesor de Educación Física en Andalucía. Clases presenciales en Córdoba y online para toda Andalucía. Metodología probada y plazas limitadas.' });
}
```

- [ ] **Paso 2: Añadir Title y Meta en About**

En `src/app/pages/about/about.ts`:

```typescript
import { Title, Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';
```

En el constructor de la clase `About`:

```typescript
constructor() {
  inject(Title).setTitle('Quiénes Somos | Academia Oposiciones EF Córdoba Andalucía | EDUCOEF');
  inject(Meta).updateTag({ name: 'description', content: 'Equipo de preparadores especializados en oposiciones de Educación Física para Andalucía. Metodología probada con profesores universitarios y docentes activos en Córdoba.' });
}
```

- [ ] **Paso 3: Añadir Title y Meta en Plans**

En `src/app/pages/plans/plans.ts`:

```typescript
import { Title, Meta } from '@angular/platform-browser';
import { inject } from '@angular/core';
```

En el constructor de la clase `Plans`:

```typescript
constructor() {
  inject(Title).setTitle('Planes de Preparación | Oposiciones EF Andalucía — EDUCOEF Córdoba');
  inject(Meta).updateTag({ name: 'description', content: 'Plan Materiales, Plan Plus y Plan Premium para preparar oposiciones de EF en Andalucía. Modalidad presencial en Córdoba u online desde cualquier punto de Andalucía.' });
}
```

- [ ] **Paso 4: Añadir Title y Meta en Contact**

En `src/app/pages/contact/contact.ts` (el constructor ya existe, añadir dentro):

```typescript
import { Title, Meta } from '@angular/platform-browser';
```

Al inicio del constructor:

```typescript
inject(Title).setTitle('Contacto | Academia Oposiciones Educación Física Córdoba | EDUCOEF');
inject(Meta).updateTag({ name: 'description', content: 'Contacta con EDUCOEF, academia de oposiciones de Educación Física en Córdoba. Preparación presencial en Córdoba y online para toda Andalucía.' });
```

- [ ] **Paso 5: Commit**

```bash
git add src/app/pages/home/home.ts src/app/pages/about/about.ts src/app/pages/plans/plans.ts src/app/pages/contact/contact.ts
git commit -m "feat(seo): añadir meta tags y title con keywords locales Córdoba/Andalucía"
```

---

### Tarea 2: Schema.org JSON-LD en index.html

**Archivos:**
- Modify: `src/index.html`

- [ ] **Paso 1: Añadir bloque JSON-LD en `<head>`**

En `src/index.html`, añadir justo antes del cierre `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "name": "EDUCOEF — Academia Oposiciones Educación Física",
  "description": "Preparación de oposiciones de profesor de Educación Física para Andalucía. Clases presenciales en Córdoba y online para toda Andalucía.",
  "url": "https://educoef.com",
  "telephone": "+34957476921",
  "email": "info@educoef.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Alonso El Sabio, 26",
    "addressLocality": "Córdoba",
    "postalCode": "14001",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "areaServed": [
    { "@type": "State", "name": "Andalucía" }
  ],
  "serviceType": "Preparación de oposiciones de Educación Física Secundaria",
  "knowsAbout": ["Oposiciones Educación Física", "Secundaria Andalucía", "Preparación oposiciones docentes", "EF Córdoba"]
}
</script>
```

- [ ] **Paso 2: Commit**

```bash
git add src/index.html
git commit -m "feat(seo): añadir Schema.org JSON-LD para SEO local Córdoba"
```

---

### Tarea 3: sitemap.xml + robots.txt + assets

**Archivos:**
- Create: `src/sitemap.xml`
- Create: `src/robots.txt`
- Modify: `angular.json`

- [ ] **Paso 1: Crear `src/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://educoef.com/</loc>
    <priority>1.0</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://educoef.com/nosotros</loc>
    <priority>0.8</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://educoef.com/planes</loc>
    <priority>0.9</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://educoef.com/contacto</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://educoef.com/politica-cookies</loc>
    <priority>0.3</priority>
    <changefreq>yearly</changefreq>
  </url>
</urlset>
```

- [ ] **Paso 2: Crear `src/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://educoef.com/sitemap.xml
```

- [ ] **Paso 3: Añadir a assets en `angular.json`**

Localizar el array `"assets"` dentro de la configuración de `build` y añadir:

```json
"src/sitemap.xml",
"src/robots.txt"
```

- [ ] **Paso 4: Verificar build**

```bash
pnpm build
```

Verificar que `dist/.../sitemap.xml` y `dist/.../robots.txt` existen.

- [ ] **Paso 5: Commit**

```bash
git add src/sitemap.xml src/robots.txt angular.json
git commit -m "feat(seo): añadir sitemap.xml y robots.txt para indexación"
```

---

## Chunk 2: Antibot (sin reCAPTCHA externo)

> **Nota:** La capa reCAPTCHA v3 requiere que el usuario registre el dominio en Google. Las capas 2 (rate limiting) y 3 (honeypot) son independientes y se implementan primero.

### Tarea 4: Honeypot en el formulario de contacto

**Archivos:**
- Modify: `src/app/pages/contact/contact.ts`
- Modify: `src/app/pages/contact/contact.html`

- [ ] **Paso 1: Añadir control 'website' al FormGroup en `contact.ts`**

Localizar la definición del `FormGroup` y añadir el campo:

```typescript
contactForm: FormGroup = this.fb.group({
  nombre: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  telefono: ['', [Validators.pattern(/^(\+34)?[6-9]\d{8}$/)]],
  curso: [''],
  mensaje: ['', [Validators.required, Validators.minLength(10)]],
  website: [''], // honeypot — campo trampa para bots, nunca lo rellena un humano
});
```

- [ ] **Paso 2: Añadir comprobación honeypot al inicio de `onSubmit()`**

Al principio del método `onSubmit()`, antes de cualquier otra lógica:

```typescript
// Honeypot: si este campo tiene valor, es un bot — silenciar sin avisar
if (this.contactForm.get('website')?.value) {
  this.submitted.set(true); // simular éxito para no alertar al bot
  return;
}
```

- [ ] **Paso 3: Añadir campo oculto en `contact.html`**

Dentro del `<form>`, añadir este campo (invisible para humanos):

```html
<!-- Honeypot: campo trampa para bots, NO modificar -->
<input
  type="text"
  formControlName="website"
  tabindex="-1"
  autocomplete="off"
  aria-hidden="true"
  style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden"
>
```

- [ ] **Paso 4: Commit**

```bash
git add src/app/pages/contact/contact.ts src/app/pages/contact/contact.html
git commit -m "feat(antibot): añadir honeypot al formulario de contacto"
```

---

### Tarea 5: Rate limiting en el formulario (1 mensaje / 60 segundos)

**Archivos:**
- Modify: `src/app/pages/contact/contact.ts`

- [ ] **Paso 1: Añadir signal `rateLimitSeconds` y lógica de rate limiting**

En `contact.ts`, añadir el signal para el contador regresivo:

```typescript
rateLimitSeconds = signal(0);
private rateLimitTimer: ReturnType<typeof setInterval> | null = null;
```

- [ ] **Paso 2: Añadir método privado `checkRateLimit()`**

```typescript
private checkRateLimit(): boolean {
  const lastSent = localStorage.getItem('lastContactSent');
  if (!lastSent) return false;
  const elapsed = (Date.now() - parseInt(lastSent, 10)) / 1000;
  if (elapsed < 60) {
    const remaining = Math.ceil(60 - elapsed);
    this.rateLimitSeconds.set(remaining);
    // Countdown
    this.rateLimitTimer = setInterval(() => {
      this.rateLimitSeconds.update(v => {
        if (v <= 1) {
          clearInterval(this.rateLimitTimer!);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return true;
  }
  return false;
}
```

- [ ] **Paso 3: Llamar `checkRateLimit()` en `onSubmit()` después del honeypot check**

```typescript
// Rate limiting: máximo 1 mensaje por minuto
if (this.checkRateLimit()) return;
```

- [ ] **Paso 4: Guardar timestamp después del envío exitoso**

Al final del bloque `try`, después de `this.submitted.set(true)`:

```typescript
localStorage.setItem('lastContactSent', Date.now().toString());
```

- [ ] **Paso 5: Mostrar contador en la plantilla `contact.html`**

Localizar el botón de envío y añadir condición:

```html
@if (rateLimitSeconds() > 0) {
  <p class="text-sm text-amber-600 mt-2">
    Por favor, espera {{ rateLimitSeconds() }} segundos antes de enviar otro mensaje.
  </p>
}
```

- [ ] **Paso 6: Commit**

```bash
git add src/app/pages/contact/contact.ts src/app/pages/contact/contact.html
git commit -m "feat(antibot): rate limiting de 60 segundos entre envíos de formulario"
```

---

### Tarea 6: reCAPTCHA v3 (requiere acción manual previa)

> **ACCIÓN MANUAL REQUERIDA antes de esta tarea:**
> 1. Registrar `educoef.com` en https://www.google.com/recaptcha/admin/create
> 2. Elegir **reCAPTCHA v3**
> 3. Añadir dominio: `educoef.com` (y opcionalmente `localhost` para dev)
> 4. Guardar la **Site Key** (pública) y **Secret Key** (privada)
> 5. Añadir el secret `RECAPTCHA_SITE_KEY` en GitHub → Settings → Secrets → Actions

**Archivos:**
- Modify: `src/environments/environment.ts`
- Modify: `src/environments/environment.prod.ts`
- Modify: `src/index.html`
- Modify: `src/app/pages/contact/contact.ts`
- Modify: `.github/workflows/deploy.yml`

- [ ] **Paso 1: Añadir `recaptchaSiteKey` a los environments**

En `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  emailjs: {
    publicKey: '',
    serviceId: '',
    confirmationTemplateId: '',
    notificationTemplateId: '',
  },
  recaptchaSiteKey: 'TU_SITE_KEY_DE_DESARROLLO', // reemplazar con la site key real
};
```

En `src/environments/environment.prod.ts`, añadir el mismo campo:

```typescript
recaptchaSiteKey: 'RECAPTCHA_SITE_KEY', // el workflow lo reemplazará con el secret
```

- [ ] **Paso 2: Cargar el script de reCAPTCHA en `index.html`**

Añadir en `<head>` (sustituir `SITE_KEY` con la key real al construir):

```html
<!-- reCAPTCHA v3 -->
<script src="https://www.google.com/recaptcha/api.js?render=RECAPTCHA_SITE_KEY" async defer></script>
```

> **Nota:** El script se carga pero la verificación real del score se hace en el backend. Dado que este proyecto no tiene backend propio, la integración de reCAPTCHA se limita a: (a) cargar el script para dificultar bots, (b) obtener el token en el submit. La validación del score (< 0.5 = bloquear) idealmente requiere un endpoint backend o una función serverless. Sin backend, se omite la validación del score y se confía en honeypot + rate limiting.

- [ ] **Paso 3: Inyectar `RECAPTCHA_SITE_KEY` en el workflow de GitHub Actions**

En `.github/workflows/deploy.yml`, localizar el paso `sed` de sustitución de secrets y añadir:

```yaml
- name: Inject secrets into environment
  run: |
    sed -i "s/EMAILJS_PUBLIC_KEY/${{ secrets.EMAILJS_PUBLIC_KEY }}/g" src/environments/environment.prod.ts
    sed -i "s/EMAILJS_SERVICE_ID/${{ secrets.EMAILJS_SERVICE_ID }}/g" src/environments/environment.prod.ts
    sed -i "s/EMAILJS_CONFIRMATION_TEMPLATE_ID/${{ secrets.EMAILJS_CONFIRMATION_TEMPLATE_ID }}/g" src/environments/environment.prod.ts
    sed -i "s/EMAILJS_NOTIFICATION_TEMPLATE_ID/${{ secrets.EMAILJS_NOTIFICATION_TEMPLATE_ID }}/g" src/environments/environment.prod.ts
    sed -i "s/RECAPTCHA_SITE_KEY/${{ secrets.RECAPTCHA_SITE_KEY }}/g" src/environments/environment.prod.ts
    sed -i "s/RECAPTCHA_SITE_KEY/${{ secrets.RECAPTCHA_SITE_KEY }}/g" src/index.html
```

- [ ] **Paso 4: Commit**

```bash
git add src/environments/ src/index.html .github/workflows/deploy.yml
git commit -m "feat(antibot): integrar reCAPTCHA v3 (site key via GitHub secret)"
```

---

## Chunk 3: Cookies (RGPD / LSSI)

### Tarea 7: Página de Política de Cookies

**Archivos:**
- Create: `src/app/pages/legal/politica-cookies/politica-cookies.ts`
- Create: `src/app/pages/legal/politica-cookies/politica-cookies.html`
- Modify: `src/app/app.routes.ts`
- Modify: `src/app/layout/footer/footer.ts`
- Modify: `src/app/layout/footer/footer.html`

- [ ] **Paso 1: Crear `politica-cookies.ts`**

Seguir el patrón de las otras páginas legales existentes:

```typescript
import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-politica-cookies',
  imports: [],
  templateUrl: './politica-cookies.html',
})
export class PoliticaCookies {
  constructor() {
    inject(Title).setTitle('Política de Cookies | EDUCOEF');
    inject(Meta).updateTag({ name: 'description', content: 'Política de cookies de EDUCOEF. Información sobre las cookies que usamos y cómo gestionarlas.' });
  }
}
```

- [ ] **Paso 2: Crear `politica-cookies.html`**

```html
<section class="max-w-4xl mx-auto px-4 py-16">
  <h1 class="text-3xl font-heading font-bold text-primary-900 mb-8">Política de Cookies</h1>

  <p class="text-gray-700 mb-6">
    En <strong>EDUCOEF</strong> (en adelante, "el Sitio"), utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación. Esta página explica qué son las cookies, cuáles usamos y cómo puedes gestionarlas.
  </p>

  <h2 class="text-xl font-heading font-semibold text-primary-800 mt-8 mb-4">¿Qué son las cookies?</h2>
  <p class="text-gray-700 mb-6">
    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias y mejoran la funcionalidad de la web.
  </p>

  <h2 class="text-xl font-heading font-semibold text-primary-800 mt-8 mb-4">Cookies que usamos</h2>
  <div class="overflow-x-auto mb-6">
    <table class="w-full text-sm border-collapse border border-gray-200">
      <thead class="bg-primary-50">
        <tr>
          <th class="border border-gray-200 px-4 py-2 text-left font-semibold">Cookie</th>
          <th class="border border-gray-200 px-4 py-2 text-left font-semibold">Finalidad</th>
          <th class="border border-gray-200 px-4 py-2 text-left font-semibold">Duración</th>
          <th class="border border-gray-200 px-4 py-2 text-left font-semibold">Proveedor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-gray-200 px-4 py-2 font-mono">_GRECAPTCHA</td>
          <td class="border border-gray-200 px-4 py-2">Verificación anti-spam del formulario de contacto (reCAPTCHA v3)</td>
          <td class="border border-gray-200 px-4 py-2">6 meses</td>
          <td class="border border-gray-200 px-4 py-2">Google</td>
        </tr>
        <tr class="bg-gray-50">
          <td class="border border-gray-200 px-4 py-2 font-mono">cookieConsent</td>
          <td class="border border-gray-200 px-4 py-2">Guarda si has aceptado el aviso de cookies para no mostrarlo de nuevo</td>
          <td class="border border-gray-200 px-4 py-2">1 año</td>
          <td class="border border-gray-200 px-4 py-2">Propia</td>
        </tr>
        <tr>
          <td class="border border-gray-200 px-4 py-2 font-mono">lastContactSent</td>
          <td class="border border-gray-200 px-4 py-2">Evita el envío masivo de mensajes desde el formulario de contacto</td>
          <td class="border border-gray-200 px-4 py-2">Sesión</td>
          <td class="border border-gray-200 px-4 py-2">Propia</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="text-xl font-heading font-semibold text-primary-800 mt-8 mb-4">Cómo eliminar o desactivar las cookies</h2>
  <p class="text-gray-700 mb-4">Puedes eliminar o bloquear las cookies desde la configuración de tu navegador:</p>
  <ul class="list-disc list-inside text-gray-700 mb-6 space-y-1">
    <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
    <li><strong>Firefox:</strong> Ajustes → Privacidad y seguridad → Cookies y datos del sitio</li>
    <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos del sitio web</li>
    <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio → Cookies y datos del sitio</li>
  </ul>
  <p class="text-gray-700 mb-6">
    Ten en cuenta que bloquear todas las cookies puede afectar al correcto funcionamiento del formulario de contacto.
  </p>

  <h2 class="text-xl font-heading font-semibold text-primary-800 mt-8 mb-4">Contacto</h2>
  <p class="text-gray-700">
    Si tienes cualquier duda sobre nuestra política de cookies, puedes contactarnos en
    <a href="mailto:info@educoef.com" class="text-primary-600 hover:underline">info&#64;educoef.com</a>.
  </p>
</section>
```

- [ ] **Paso 3: Añadir ruta en `app.routes.ts`**

Añadir antes del wildcard `**`:

```typescript
{
  path: 'politica-cookies',
  loadComponent: () => import('./pages/legal/politica-cookies/politica-cookies').then(m => m.PoliticaCookies),
  title: 'Política de Cookies — EDUCOEF',
},
```

- [ ] **Paso 4: Añadir enlace en el footer**

En `footer.ts`, añadir `politica-cookies` al array de `navLinks` o a un array de legal links:

```typescript
protected readonly legalLinks: NavLink[] = [
  { label: 'Aviso Legal', path: '/aviso-legal' },
  { label: 'Política de Privacidad', path: '/politica-privacidad' },
  { label: 'Política de Cookies', path: '/politica-cookies' },
];
```

En `footer.html`, verificar que los enlaces legales se muestran correctamente. Si ya hay una sección legal, añadir el enlace. Si no, añadirla.

- [ ] **Paso 5: Commit**

```bash
git add src/app/pages/legal/politica-cookies/ src/app/app.routes.ts src/app/layout/footer/
git commit -m "feat(cookies): añadir página de política de cookies y enlace en footer"
```

---

### Tarea 8: Banner de cookies

**Archivos:**
- Create: `src/app/layout/cookie-banner/cookie-banner.ts`
- Create: `src/app/layout/cookie-banner/cookie-banner.html`
- Modify: `src/app/app.ts`
- Modify: `src/app/app.html`

- [ ] **Paso 1: Crear `cookie-banner.ts`**

```typescript
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  templateUrl: './cookie-banner.html',
})
export class CookieBanner {
  visible = signal(!localStorage.getItem('cookieConsent'));

  accept(): void {
    localStorage.setItem('cookieConsent', 'true');
    this.visible.set(false);
  }
}
```

- [ ] **Paso 2: Crear `cookie-banner.html`**

```html
@if (visible()) {
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-4 py-4 shadow-lg">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-sm text-gray-200 text-center sm:text-left">
        Usamos cookies técnicas y de reCAPTCHA para mejorar tu experiencia y proteger el formulario de contacto.
        <a routerLink="/politica-cookies" class="underline text-primary-300 hover:text-primary-200 ml-1">
          Más información
        </a>
      </p>
      <button
        (click)="accept()"
        class="shrink-0 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
      >
        Aceptar
      </button>
    </div>
  </div>
}
```

- [ ] **Paso 3: Añadir CookieBanner a `app.ts`**

En `src/app/app.ts`, importar y añadir al array `imports`:

```typescript
import { CookieBanner } from './layout/cookie-banner/cookie-banner';
```

Añadir `CookieBanner` al array `imports` del decorador `@Component`.

- [ ] **Paso 4: Añadir `<app-cookie-banner />` en `app.html`**

```html
<app-navbar />
<main>
  <router-outlet />
</main>
<app-footer />
<app-cookie-banner />
```

- [ ] **Paso 5: Commit**

```bash
git add src/app/layout/cookie-banner/ src/app/app.ts src/app/app.html
git commit -m "feat(cookies): añadir banner de cookies RGPD con aceptación persistente"
```

---

## Resumen de tareas

| # | Tarea | Chunk | Estado |
|---|-------|-------|--------|
| 1 | Meta tags y Title en todas las páginas | SEO | ⏳ |
| 2 | Schema.org JSON-LD en index.html | SEO | ⏳ |
| 3 | sitemap.xml + robots.txt | SEO | ⏳ |
| 4 | Honeypot en formulario | Antibot | ⏳ |
| 5 | Rate limiting (60s entre envíos) | Antibot | ⏳ |
| 6 | reCAPTCHA v3 (requiere acción manual) | Antibot | ⏳ |
| 7 | Página /politica-cookies | Cookies | ⏳ |
| 8 | Banner de cookies | Cookies | ⏳ |

---

## Acciones manuales (no automatizables)

Estas acciones las debe hacer el usuario:

1. **Google Search Console** — Registrar `educoef.com` en https://search.google.com/search-console y enviar el sitemap `/sitemap.xml`. Gratis y esencial para indexación.

2. **Google reCAPTCHA** — Registrar el dominio en https://www.google.com/recaptcha/admin/create (reCAPTCHA v3), obtener la Site Key y añadirla como secret `RECAPTCHA_SITE_KEY` en GitHub → Settings → Secrets → Actions.

3. **Google Business Profile** — Crear o reclamar el perfil del negocio en Google Maps con la dirección de Córdoba. Imprescindible para SEO local.

4. **Reseñas en Google** — Pedir a alumnos que dejen reseñas en Google Maps.
