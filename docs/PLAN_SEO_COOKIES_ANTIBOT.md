# Plan para Claude Code — Academia de Oposiciones EF
## Seguridad del Formulario · Política de Cookies · SEO Local (Córdoba y Andalucía)

> **Stack del proyecto:** Angular + TailwindCSS · Alojamiento: GitHub Pages · Emails: EmailJS

---

## TAREA 1 — Proteger el formulario de contacto contra spam y ataques

### ¿Qué problema resolvemos?
Sin protección, un bot puede enviar cientos de emails a través del formulario en segundos. Esto satura la bandeja de entrada, consume la cuota de EmailJS y puede bloquear la cuenta. Se llama "form flooding" o "email bombing".

Vamos a poner **3 capas de protección combinadas**:

---

### Capa 1 — Google reCAPTCHA v3 (invisible, sin fricción para el usuario)

reCAPTCHA v3 analiza el comportamiento del usuario en segundo plano y asigna una puntuación de 0 a 1 (1 = persona real, 0 = bot). No muestra el clásico "no soy un robot", los usuarios no lo ven pero los bots no pueden superarlo.

**Pasos:**
1. Registrar el dominio de GitHub Pages en https://www.google.com/recaptcha (elegir reCAPTCHA v3)
2. Guardar la clave pública (site key) y la clave privada (secret key)

**Instrucción para Claude Code:**
```
Integra Google reCAPTCHA v3 en el formulario de contacto Angular (contact.component).
Instala: npm install ngx-recaptcha2 --save
En contact.component.ts, inyecta ReCaptchaV3Service y obtén un token al hacer submit.
En el método onSubmit(), antes de llamar a EmailJS, obtén el token de reCAPTCHA.
Si la puntuación devuelta es menor que 0.5, muestra un mensaje de error y bloquea el envío.
Añade la clave pública de reCAPTCHA al environment.ts como recaptchaSiteKey.
```

---

### Capa 2 — Rate limiting en el frontend (máximo 1 mensaje por minuto)

Aunque EmailJS gestiona el envío, podemos limitar en el propio Angular usando localStorage para que el mismo navegador no pueda enviar más de 1 mensaje cada 60 segundos.

**Instrucción para Claude Code:**
```
En contact.component.ts, añade esta lógica en el método onSubmit(), ANTES de llamar a EmailJS:

1. Comprueba en localStorage si existe la clave 'lastContactSent'
2. Si existe y han pasado menos de 60 segundos desde ese timestamp, muestra el mensaje:
   "Por favor, espera X segundos antes de enviar otro mensaje" y cancela el envío
3. Si se envía correctamente, guarda Date.now() en localStorage con la clave 'lastContactSent'

Opcionalmente, muestra un contador regresivo en el botón de envío mientras espera.
```

---

### Capa 3 — Honeypot (trampa para bots)

Un campo honeypot es un input oculto con CSS (invisible para humanos, visible para bots). Los bots lo rellenan; los usuarios reales no lo ven. Si llega relleno, es spam.

**Instrucción para Claude Code:**
```
En contact.component.html, añade este campo dentro del formulario:
<input type="text" name="website" tabindex="-1" autocomplete="off" 
       style="display:none; position:absolute; left:-9999px">

Añade el control 'website' al FormGroup en contact.component.ts.

En el método onSubmit(), ANTES de cualquier otra lógica, comprueba:
if (this.contactForm.get('website')?.value) { return; }
(Si tiene valor, simula éxito silenciosamente sin enviar nada. Los bots no sabrán que han sido bloqueados.)
```

---

### Resultado esperado tras la Tarea 1
- Los bots son bloqueados por reCAPTCHA antes de llegar a EmailJS
- Un usuario real no puede enviar más de 1 mensaje por minuto
- Los bots simples que ignoran reCAPTCHA caen en la trampa del honeypot
- El formulario sigue siendo igual de fácil de usar para visitantes reales

---

## TAREA 2 — Política de Cookies (RGPD / España)

### ¿Necesitas banner de cookies?

**Sí**, porque al instalar reCAPTCHA v3 en la Tarea 1 se añaden cookies de Google. La ley española (LSSI) y el RGPD europeo obligan a informar sobre cualquier cookie que no sea estrictamente técnica de sesión.

La buena noticia: no hace falta bloquear nada ni pedir permiso antes de cargar la web. Con un banner informativo sencillo y una página de política es suficiente.

---

### 2.1 — Página de Política de Cookies

**Instrucción para Claude Code:**
```
Crea un nuevo componente Angular en src/app/pages/cookies/cookies-policy.component.ts
Añade la ruta /politica-cookies en app.routes.ts
La página debe incluir una tabla con las cookies que usa la web:

| Cookie         | Finalidad                              | Duración   | Proveedor |
|----------------|----------------------------------------|------------|-----------|
| _GRECAPTCHA    | Verificación anti-bot (reCAPTCHA v3)   | 6 meses    | Google    |
| cookieConsent  | Guarda si el usuario aceptó el aviso   | 1 año      | Propia    |

Añade también: qué son las cookies, cómo eliminarlas en los principales navegadores,
y que el usuario puede contactar en [email] para cualquier duda sobre privacidad.

Añade un enlace "Política de cookies" en el footer.component.html
```

---

### 2.2 — Banner de cookies

**Instrucción para Claude Code:**
```
Crea un componente CookieBannerComponent en src/app/components/cookie-banner/

El banner debe:
- Aparecer en la parte inferior de la pantalla (position fixed, bottom: 0)
- Mostrarse solo si en localStorage NO existe 'cookieConsent'
- Tener este texto: "Usamos cookies técnicas y de reCAPTCHA para mejorar tu experiencia."
- Tener un botón "Aceptar" que guarde 'cookieConsent=true' en localStorage y oculte el banner
- Tener un enlace "Más información" que lleve a /politica-cookies

Diseño con TailwindCSS: fondo oscuro (bg-gray-900), texto blanco, botón azul (bg-blue-600).
Añade el componente en app.component.html para que aparezca en todas las páginas.
```

---

### Resultado esperado tras la Tarea 2
- La web cumple con la normativa española LSSI y el RGPD europeo
- Existe una página /politica-cookies accesible desde el footer
- Los usuarios ven el banner solo la primera vez
- No se bloquea ninguna funcionalidad de la web

---

## TAREA 3 — SEO Local para Córdoba y Andalucía

### Objetivo
Aparecer en los primeros resultados de Google para búsquedas como:
- "academia oposiciones educación física Córdoba"
- "preparar oposiciones EF secundaria Andalucía online"
- "preparador oposiciones EF Córdoba presencial"
- "oposiciones educación física Andalucía 2026"

---

### 3.1 — Meta tags y título en cada página

**Instrucción para Claude Code:**
```
En cada componente de página (HomeComponent, AboutComponent, PlansComponent, ContactComponent),
usa los servicios Title y Meta de @angular/platform-browser para establecer el título
y la meta description en el método ngOnInit().

Ejemplos de títulos y descripciones:

HOME:
- title: 'Academia Oposiciones Educación Física Secundaria Córdoba | Preparación Andalucía'
- description: 'Prepara tus oposiciones de profesor de Educación Física en Andalucía. Clases presenciales en Córdoba y online para toda Andalucía. Plazas limitadas.'

SOBRE NOSOTROS:
- title: 'Quiénes Somos | Academia Oposiciones EF Córdoba Andalucía'
- description: 'Equipo de preparadores especializados en oposiciones de Educación Física para Andalucía. Metodología probada, profesores universitarios y docentes activos.'

PLANES:
- title: 'Planes de Preparación | Oposiciones EF Andalucía — Presencial Córdoba y Online'
- description: 'Plan Materiales, Plan Personalizado y Plan Premium para preparar las oposiciones de EF en Andalucía. Presencial en Córdoba u online desde cualquier punto de Andalucía. Plazas limitadas.'

CONTACTO:
- title: 'Contacto | Academia Oposiciones Educación Física Córdoba'
- description: 'Contacta con nuestra academia de oposiciones de Educación Física en Córdoba. Preparación presencial en Córdoba y online para toda Andalucía.'
```

---

### 3.2 — Datos estructurados Schema.org (JSON-LD)

Esto le dice a Google exactamente qué es el negocio y dónde está. Es clave para el SEO local.

**Instrucción para Claude Code:**
```
En el <head> del archivo src/index.html, añade este bloque (adapta los datos reales del negocio):

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "name": "Academia Oposiciones EF Secundaria",
  "description": "Preparación de oposiciones de profesor de Educación Física para Andalucía. Clases presenciales en Córdoba y online para toda Andalucía.",
  "url": "https://[tu-dominio].github.io",
  "telephone": "[teléfono de contacto]",
  "email": "[email de contacto]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Córdoba",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "areaServed": [
    { "@type": "State", "name": "Andalucía" }
  ],
  "serviceType": "Preparación de oposiciones de Educación Física Secundaria",
  "knowsAbout": ["Oposiciones Educación Física", "Secundaria Andalucía", "Preparación oposiciones docentes"]
}
</script>
```

---

### 3.3 — sitemap.xml y robots.txt

**Instrucción para Claude Code:**
```
Crea el archivo src/sitemap.xml con este contenido (sustituye [dominio] por el dominio real de GitHub Pages):

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://[dominio]/</loc><priority>1.0</priority></url>
  <url><loc>https://[dominio]/sobre-nosotros</loc><priority>0.8</priority></url>
  <url><loc>https://[dominio]/planes</loc><priority>0.9</priority></url>
  <url><loc>https://[dominio]/contacto</loc><priority>0.7</priority></url>
  <url><loc>https://[dominio]/politica-cookies</loc><priority>0.3</priority></url>
</urlset>

Crea el archivo src/robots.txt:
User-agent: *
Allow: /
Sitemap: https://[dominio]/sitemap.xml

Añade ambos archivos al array "assets" dentro de angular.json para que se incluyan en el build de producción.
```

---

### 3.4 — Revisión de textos con keywords locales

**Instrucción para Claude Code:**
```
Revisa todos los componentes de página y aplica estas reglas:

1. Cada página tiene un único H1 que incluye la keyword principal con Córdoba o Andalucía
2. Los textos mencionan "Córdoba" y "Andalucía" de forma natural al menos 2-3 veces por página
3. Donde se hable de modalidades, dejar claro: "presencial en Córdoba · online para toda Andalucía"
4. Todas las etiquetas <img> tienen atributo alt descriptivo (ej: alt="preparador oposiciones educación física Córdoba")
5. Los links internos entre páginas usan texto descriptivo, no "haz clic aquí"
6. En la sección de planes, añadir texto: "Modalidad presencial disponible en Córdoba. Online disponible para toda Andalucía."
```

---

### 3.5 — Rendimiento y velocidad de carga (Core Web Vitals)

Google penaliza las webs lentas. Estos cambios mejoran la velocidad, que es un factor directo de posicionamiento.

**Instrucción para Claude Code:**
```
1. LAZY LOADING DE RUTAS: En app.routes.ts, cambia todos los imports estáticos a carga dinámica:
   Ejemplo: { path: 'sobre-nosotros', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) }
   Repite para todas las rutas.

2. IMÁGENES: Añade loading="lazy" a todas las etiquetas <img> que no estén en el viewport inicial (above the fold).

3. GOOGLE FONTS: Si se usan Google Fonts, añade en index.html dentro del <head>:
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

4. Verifica que en angular.json, dentro de la configuración "production", están activados:
   "optimization": true, "aot": true, "buildOptimizer": true, "sourceMap": false
```

---

### Resultado esperado tras la Tarea 3
- La web aparece indexada en Google en 1-2 semanas tras enviar el sitemap
- Posicionamiento en primeras páginas de búsquedas locales Córdoba/Andalucía en 1-3 meses
- Resultados enriquecidos en Google gracias a los datos estructurados Schema.org
- Carga más rápida = mejor experiencia = mejor posición en Google

---

## Orden de implementación recomendado

| # | Qué hacer | Tiempo estimado |
|---|-----------|----------------|
| 1 | Meta tags + title en cada página | 1h |
| 2 | reCAPTCHA v3 en formulario de contacto | 2h |
| 3 | Rate limiting (1 mensaje/minuto) | 30 min |
| 4 | Honeypot en formulario | 20 min |
| 5 | sitemap.xml + robots.txt | 30 min |
| 6 | Schema.org JSON-LD en index.html | 1h |
| 7 | Página /politica-cookies | 1h |
| 8 | Banner de cookies | 1h |
| 9 | Revisión de textos con keywords locales | 2h |
| 10 | Lazy loading + optimización rendimiento | 2h |

---

## Acciones adicionales fuera de Claude Code (hazlas tú)

Estas 3 cosas no las puede hacer Claude Code pero son las que más aceleran el SEO local:

1. **Google Search Console** — Registra la web en https://search.google.com/search-console y envía el sitemap. Gratis y esencial.
2. **Google Business Profile** — Crea o reclama el perfil del negocio en Google Maps con la dirección de Córdoba. Es lo que hace que aparezcas en el mapa y en las búsquedas locales.
3. **Reseñas en Google** — Pide a los primeros alumnos que dejen una reseña en Google Maps. Las reseñas son el factor número 1 en SEO local.