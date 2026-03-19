# Progreso de Implementación — SEO + Cookies + Antibot

> Plan completo: `docs/superpowers/plans/2026-03-17-seo-cookies-antibot.md`
> Última actualización: 2026-03-17

---

## Estado general

| Fase | Descripción | Estado |
|------|-------------|--------|
| **Chunk 1** | SEO Local (meta tags, Schema.org, sitemap) | ✅ Completado |
| **Chunk 2** | Antibot (honeypot, rate limiting, reCAPTCHA) | ✅ Completado (honeypot + rate limiting) / ⚠️ reCAPTCHA pendiente de acción manual |
| **Chunk 3** | Cookies RGPD (página política + banner) | ✅ Completado |

---

## Chunk 1: SEO Local

| # | Tarea | Estado | Commit |
|---|-------|--------|--------|
| 1 | Meta tags y Title en Home, About, Plans, Contact | ✅ | `3bcc3d4` |
| 2 | Schema.org JSON-LD en index.html | ✅ | `b22cf81` |
| 3 | sitemap.xml + robots.txt + assets | ✅ | `93cd79f` |

## Chunk 2: Antibot

| # | Tarea | Estado | Notas |
|---|-------|--------|-------|
| 4 | Honeypot en formulario de contacto | ✅ | Commit `ce9d43e` |
| 5 | Rate limiting (60s entre envíos) | ✅ | Commit `ce9d43e` |
| 6 | reCAPTCHA v3 | ⚠️ Bloqueado | **Requiere Site Key de Google** — ver acción manual abajo |

## Chunk 3: Cookies

| # | Tarea | Estado | Commit |
|---|-------|--------|--------|
| 7 | Página /politica-cookies | ✅ | `842c4e7` |
| 8 | Banner de cookies | ✅ | `842c4e7` |

---

## Acciones manuales pendientes (hacer tú)

- [ ] **Desplegar a producción** — hacer push a `main` para que GitHub Actions despliegue automáticamente en `educoef.com`
- [x] Registrar `educoef.com` en **Google Search Console** y enviar `https://educoef.com/sitemap.xml` ✅ (2026-03-17)
- [ ] Registrar en **Google reCAPTCHA v3**:
  1. Ir a https://www.google.com/recaptcha/admin/create
  2. Elegir reCAPTCHA v3, añadir dominio `educoef.com`
  3. Copiar la **Site Key** (pública)
  4. Añadir secret `RECAPTCHA_SITE_KEY` en GitHub → Settings → Secrets → Actions
  5. Avisar para implementar la Tarea 6 del plan
- [ ] Crear/reclamar **Google Business Profile** con dirección de Córdoba
- [ ] Pedir reseñas en Google a alumnos

---

## Lo que se ha implementado

### SEO
- Cada página tiene su propio `<title>` y `<meta description>` con keywords de Córdoba y Andalucía
- Schema.org JSON-LD en `index.html` identifica el negocio como `EducationalOrganization + LocalBusiness` en Córdoba
- `sitemap.xml` con todas las URLs y prioridades
- `robots.txt` apuntando al sitemap

### Antibot
- **Honeypot**: campo invisible en el formulario; si un bot lo rellena, el envío se simula silenciosamente sin llegar a EmailJS
- **Rate limiting**: un usuario/navegador no puede enviar más de 1 mensaje cada 60 segundos; contador visible en la interfaz

### Cookies RGPD
- Página `/politica-cookies` con tabla de cookies, instrucciones de eliminación por navegador y contacto
- Banner fijo en la parte inferior visible solo la primera vez; desaparece al aceptar y no vuelve a aparecer (localStorage)
- Enlace "Política de cookies" añadido al pie legal del footer

---

## Pendiente: Google Analytics 4 (para otra sesión)

### Pasos a seguir en orden:

**1. Crear propiedad GA4** (tú, manual)
- Ve a analytics.google.com
- Crea una cuenta/propiedad para `educoef.com`
- Obtén el **Measurement ID** con formato `G-XXXXXXXXXX`

**2. Configurar Tag Manager** (ya tienes el contenedor `GTM-TZN5F65L`)
- En Tag Manager → **Nueva etiqueta → Google Analytics → GA4**
- Pega el Measurement ID `G-XXXXXXXXXX`
- Activador: **All Pages**
- Guarda y **Publica**

**3. Añadir snippet GTM al código** (Claude Code)
- Añadir en `index.html` justo después de `<head>`:
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TZN5F65L');</script>
```
- Añadir en `index.html` justo después de `<body>`:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZN5F65L"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

**4. Actualizar política de cookies** (Claude Code)
- Añadir cookies de GA4 a la tabla en `/politica-cookies`

**5. Desplegar** — push a `main` → GitHub Actions despliega automáticamente

---

## Leyenda de estados
- ⏳ Pendiente
- 🔄 En progreso
- ✅ Completado
- ⚠️ Bloqueado (requiere acción manual)
