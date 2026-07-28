# Sección de reseñas de Google — Diseño

## Objetivo
Invitar a los usuarios a dejar una reseña en el perfil de Google de EDUCOEF, para
aumentar el número de reseñas públicas.

## Enlace de reseña
`https://g.page/r/CZmNDjsV-Y6BEBM/review`

## Texto sugerido
> En EDUCOEF queremos saber tu opinión. Publica una reseña en nuestro perfil.

## Ubicaciones

### 1. Home (`src/app/pages/home/home.ts` / `home.html`)
Nueva `<section>` insertada entre la sección "Lo que Dicen Nuestros Alumnos"
(satisfacción) y la sección "Final CTA" (líneas actuales ~155-157 de `home.html`).

- Fondo blanco (`bg-white`) para alternar con la sección de satisfacción
  (`bg-gray-50`) que la precede y el CTA final (degradado `secondary`) que la sigue.
- Contenido centrado (`max-w-3xl mx-auto text-center`):
  - Icono de estrella (SVG inline, estilo Heroicons, consistente con el resto del sitio).
  - Título `font-heading` (p. ej. "¿Te gusta EDUCOEF?").
  - Párrafo con el texto sugerido.
  - Botón/enlace `<a>` a la URL de reseña, `target="_blank" rel="noopener noreferrer"`,
    estilo consistente con los CTAs existentes (`bg-primary-600 text-white rounded-lg`).
- Sin lógica en el componente `home.ts`: la URL se declara como constante inline en el
  template (no hay necesidad de un signal o input, es contenido estático).

### 2. Footer (`src/app/layout/footer/footer.html` / `footer.ts`)
Nuevo ítem añadido a la lista de la columna "Contacto" (después de los ítems generados
por `@for (item of contactItems; ...)`), con:
- Icono de estrella (mismo estilo que los otros iconos de esa columna).
- Texto "Déjanos tu reseña en Google".
- Enlace `<a [href]="reviewUrl" target="_blank" rel="noopener noreferrer">`.
- La URL se expone como propiedad de clase `readonly reviewUrl` en `footer.ts`
  (mismo patrón que otras propiedades de esa clase, si existen; si no, constante simple).

## Fuera de alcance
- No se toca la columna "Síguenos" (actualmente deshabilitada con `*ngIf="false"`).
- No se añade a la página de Contacto ni se crea página nueva.
- No hay tracking/analytics del clic (no solicitado).

## Testing
- Verificación visual manual (`pnpm start`) en Home y Footer, en desktop y mobile.
- Comprobar que el enlace abre en nueva pestaña y apunta a la URL correcta.
