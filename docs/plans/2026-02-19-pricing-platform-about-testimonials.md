# Pricing, Platform, About & Testimonials Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update 4 sections of the EDUCOEF site: redesign the 3 pricing tiers, refresh the platform content section, update the About team section, and rebuild the testimonials with real 2024 satisfaction stats.

**Architecture:** All changes are purely presentational — updating data arrays in `.ts` files and markup in `.html` files. No new components, no new routes. Plans page handles prompts 1+2 together. About page handles prompt 3. Home page handles prompt 4.

**Tech Stack:** Angular 20 standalone components, TailwindCSS v4, signals, inline SVG icons (Heroicons style).

---

### Task 1: Update pricing plans data (plans.ts)

**Files:**
- Modify: `src/app/pages/plans/plans.ts`

**Step 1: Replace the `plans` array with new data**

Replace lines 40–89 in `plans.ts` with:

```typescript
readonly plans: Plan[] = [
  {
    name: 'Plan Materiales',
    price: '149',
    priceType: 'onetime',
    featured: false,
    badge: 'Autónomo',
    features: [
      { text: 'Temario completo (25 temas actualizados)' },
      { text: 'Clases grabadas disponibles en plataforma' },
      { text: 'Supuestos prácticos resueltos' },
      { text: 'Contenido actualizado durante el año de curso' },
      { text: 'Acceso a todas las actualizaciones del año' },
    ],
    discount: 'Exalumnos: 129 € (−20 €)',
    ctaText: 'Más Información',
    ctaLink: '/contacto',
  },
  {
    name: 'Plan Personalizado',
    price: '79',
    priceType: 'monthly',
    featured: true,
    badge: 'Personalizado',
    features: [
      { text: 'Todo lo del Plan Materiales' },
      { text: 'Corrección de temas (servicio aparte, por uso)', extra: true },
      { text: 'Corrección de supuestos prácticos (servicio aparte, por uso)', extra: true },
    ],
    ctaText: 'Más Información',
    ctaLink: '/contacto',
  },
  {
    name: 'Plan Premium',
    price: '150',
    priceType: 'monthly',
    featured: false,
    badge: 'Plazas Limitadas',
    features: [
      { text: 'Clases online en directo' },
      { text: 'Clases presenciales' },
      { text: 'Correcciones incluidas en el precio' },
    ],
    discount: 'Exalumnos: 130 € (−20 €)',
    ctaText: 'Más Información',
    ctaLink: '/contacto',
  },
];
```

**Step 2: Update the interfaces to support new fields**

Replace the `PlansFeature` and `Plan` interfaces at the top of `plans.ts`:

```typescript
interface PlansFeature {
  text: string;
  extra?: boolean; // true = paid separately (shown differently)
}

interface Plan {
  name: string;
  price: string;
  priceType: 'monthly' | 'onetime';
  featured: boolean;
  badge?: string;
  badgeStyle?: 'accent' | 'red'; // accent=default, red=limited spots
  features: PlansFeature[];
  discount?: string; // alumni discount note
  ctaText: string;
  ctaLink: string;
}
```

**Step 3: Verify TypeScript compiles**

Run: `pnpm ng build --configuration development 2>&1 | head -30`
Expected: no TypeScript errors

---

### Task 2: Update pricing cards template (plans.html — cards section)

**Files:**
- Modify: `src/app/pages/plans/plans.html` (lines 7–77)

**Step 1: Replace the plan cards section**

Replace the plan cards section (from `<!-- plan Cards Section -->` to the closing `</section>` at line 77) with:

```html
<!-- Plan Cards Section -->
<section class="bg-white py-16 md:py-24">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mb-16 text-center">
      <h2 class="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
        Elige tu Plan de Preparación
      </h2>
      <p class="mt-4 text-lg text-gray-600">
        Tres niveles de acompañamiento adaptados a tu ritmo y objetivos
      </p>
    </div>

    <div class="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
      @for (plan of plans; track plan.name; let i = $index) {
        <div
          class="relative flex flex-col rounded-2xl p-8"
          [class]="plan.featured
            ? 'border-2 border-primary-600 bg-white shadow-2xl ring-2 ring-primary-600/20 lg:scale-105 lg:z-10'
            : 'border border-gray-200 bg-white shadow-lg'"
        >
          <!-- Badge -->
          @if (plan.badge) {
            <span
              class="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-sm font-semibold text-white"
              [class]="plan.badge === 'Plazas Limitadas'
                ? 'bg-red-500'
                : plan.featured
                  ? 'bg-primary-600'
                  : 'bg-accent-500'"
            >
              {{ plan.badge }}
            </span>
          }

          <!-- Plan Name -->
          <h3 class="font-heading text-2xl font-bold text-gray-900">
            {{ plan.name }}
          </h3>

          <!-- Price -->
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-bold text-primary-600">{{ plan.price }}€</span>
            <span class="text-base text-gray-500">
              @if (plan.priceType === 'onetime') {
                pago único
              } @else {
                /mes
              }
            </span>
          </div>

          <!-- Alumni discount note -->
          @if (plan.discount) {
            <p class="mt-2 inline-block rounded-md bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              🎓 {{ plan.discount }}
            </p>
          }

          <!-- Divider -->
          <hr class="my-6 border-gray-200" />

          <!-- Features List -->
          <ul class="mb-8 flex-1 space-y-4">
            @for (feature of plan.features; track feature.text) {
              <li class="flex items-start gap-3">
                @if (feature.extra) {
                  <!-- Extra paid service icon (accent/orange plus) -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                } @else {
                  <!-- Included feature icon (green check) -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                }
                <span [class]="feature.extra ? 'text-gray-500 italic text-sm' : 'text-gray-700'">
                  {{ feature.text }}
                </span>
              </li>
            }
          </ul>

          <!-- Note for Plan Personalizado extra services -->
          @if (plan.name === 'Plan Personalizado') {
            <p class="mb-4 rounded-lg bg-accent-50 px-4 py-3 text-xs text-accent-700">
              Las correcciones se contratan de forma individual, por servicio y según necesidad.
            </p>
          }

          <!-- CTA Button -->
          <a
            [routerLink]="plan.ctaLink"
            class="mt-auto block w-full rounded-lg px-6 py-3 text-center text-lg font-semibold transition-colors duration-300"
            [class]="plan.featured
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : plan.name === 'Plan Premium'
                ? 'bg-accent-500 text-white hover:bg-accent-600'
                : 'bg-gray-800 text-white hover:bg-gray-900'"
          >
            {{ plan.ctaText }}
          </a>
        </div>
      }
    </div>
  </div>
</section>
```

**Step 2: Verify in browser**

Run: `pnpm start`
Navigate to `http://localhost:4200/planes`
Expected: 3 cards visible, center card (Plan Personalizado) scaled up, Plan Premium has red "Plazas Limitadas" badge, alumni discount notes appear in amber on Plans Materiales and Premium, correction features shown in italic with orange `+` icon.

---

### Task 3: Update platform content section (plans.ts + plans.html)

**Files:**
- Modify: `src/app/pages/plans/plans.ts` (includedItems array)
- Modify: `src/app/pages/plans/plans.html` (included items section)

**Step 1: Replace includedItems array in plans.ts**

Replace the `includedItems` array (lines 91–182) with:

```typescript
readonly includedItems: IncludedItem[] = [
  {
    icon: 'book',
    title: 'Temario Actualizado (25 temas)',
    description: 'Los 25 temas completos, revisados y actualizados con la normativa vigente.',
  },
  {
    icon: 'clipboard',
    title: 'Supuestos Prácticos',
    description: 'Banco de supuestos prácticos resueltos para preparar todos los escenarios posibles.',
  },
  {
    icon: 'document',
    title: 'Programación Didáctica',
    description: 'Modelo de programación didáctica y situación de aprendizaje para la oposición.',
  },
  {
    icon: 'microphone',
    title: 'Defensa Oral',
    description: 'Materiales y simulacros para preparar la exposición ante el tribunal.',
  },
  {
    icon: 'audio',
    title: 'Resúmenes en Audio',
    description: 'Audios de todos los temas para estudiar donde quieras, cuando quieras.',
  },
  {
    icon: 'chart',
    title: 'Infografías Visuales',
    description: 'Esquemas visuales de alta calidad para fijar conceptos clave de cada tema.',
  },
  {
    icon: 'exam',
    title: 'Simulacros Mensuales',
    description: 'Examen y supuesto práctico mensual con corrección detallada para medir tu progreso.',
  },
  {
    icon: 'report',
    title: 'Seguimiento con IA',
    description: 'Informe personalizado generado por IA con tus notas y progreso hacia tus objetivos.',
  },
  {
    icon: 'ai',
    title: 'Asistente IA',
    description: 'Chatbot con los 25 temas integrados para resolver tus dudas al instante.',
  },
];
```

**Step 2: Add the AI icon to the template icon block in plans.html**

In the "What's Included" section of `plans.html`, add after the last `@if (item.icon === 'attention')` block (before closing `</div>` of the icon container):

```html
@if (item.icon === 'ai') {
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.347.347a3.003 3.003 0 01-.635.467A2.98 2.98 0 0112 17a2.98 2.98 0 01-1.414-.354 3.003 3.003 0 01-.635-.467l-.347-.347z" />
  </svg>
}
```

**Step 3: Update the section title in plans.html**

Change `¿Qué Incluye Nuestra Preparación?` to `¿Qué Incluye la Plataforma?` and add a subtitle:

```html
<h2 class="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
  ¿Qué Incluye la Plataforma?
</h2>
<p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
  Todos los recursos que necesitas para preparar la oposición en un solo lugar
</p>
```

**Step 4: Verify in browser**

Navigate to `http://localhost:4200/planes`, scroll to platform section.
Expected: 9 cards visible in a 3-column grid, last card shows lightbulb/AI icon.

---

### Task 4: Update About page team section (about.ts)

**Files:**
- Modify: `src/app/pages/about/about.ts`

**Step 1: Replace teamMembers array**

Replace the `teamMembers` array (lines 72–93) with:

```typescript
readonly teamMembers: TeamMember[] = [
  {
    name: 'Profesores Universitarios',
    initials: 'PU',
    role: 'Formación académica de alto nivel',
    description:
      'Doctores y graduados en CAFYD con experiencia docente universitaria. Conocen el temario en profundidad y lo transmiten con rigor académico.',
  },
  {
    name: 'Docentes en Activo',
    initials: 'DA',
    role: 'Experiencia real en el aula',
    description:
      'Profesores de Secundaria que trabajan hoy en centros educativos. Su perspectiva práctica y actualizada es clave para preparar los supuestos prácticos y la programación didáctica.',
  },
  {
    name: 'Opositores Aprobados',
    initials: 'OA',
    role: 'Han vivido el proceso en primera persona',
    description:
      'Preparadores que han superado el proceso de selección y conocen de primera mano qué valoran los tribunales. Su experiencia directa marca la diferencia en la preparación.',
  },
];
```

**Step 2: Update mission text in about.html**

Replace the two `<p>` paragraphs inside "Nuestra Misión" (lines 16–27 of about.html) with:

```html
<p class="mt-6 text-lg leading-relaxed text-gray-600">
  En EDUCOEF llevamos más de una década dedicados a la preparación de
  opositores para el cuerpo de Profesores de Secundaria en la especialidad
  de Educación Física. Nuestro equipo combina profesores universitarios,
  docentes en activo y opositores aprobados para ofrecerte la preparación
  más completa y realista posible.
</p>
<p class="mt-4 text-lg leading-relaxed text-gray-600">
  Creemos en una preparación integral que combina el dominio del temario
  con el desarrollo de competencias prácticas y la capacidad de
  comunicación ante el tribunal.
</p>
```

**Step 3: Verify in browser**

Navigate to `http://localhost:4200/nosotros`, scroll to team section.
Expected: 3 cards with initial-avatar circles (PU, DA, OA), updated role/description text, updated mission paragraph.

---

### Task 5: Update home page testimonials with satisfaction stats (home.ts + home.html)

**Files:**
- Modify: `src/app/pages/home/home.ts`
- Modify: `src/app/pages/home/home.html`

**Step 1: Replace testimonials array in home.ts with placeholders**

Replace the `testimonials` array (lines 64–85) with:

```typescript
readonly testimonials: Testimonial[] = [
  {
    quote: 'Testimonio próximamente.',
    author: 'Nombre del alumno',
    year: 'Promoción 2024',
    rating: 5,
    placeholder: true,
  },
  {
    quote: 'Testimonio próximamente.',
    author: 'Nombre del alumno',
    year: 'Promoción 2024',
    rating: 5,
    placeholder: true,
  },
  {
    quote: 'Testimonio próximamente.',
    author: 'Nombre del alumno',
    year: 'Promoción 2024',
    rating: 5,
    placeholder: true,
  },
];
```

**Step 2: Add `placeholder` field to Testimonial interface in home.ts**

```typescript
interface Testimonial {
  quote: string;
  author: string;
  year: string;
  rating: number;
  placeholder?: boolean;
}
```

**Step 3: Replace the testimonials section in home.html**

Replace the entire `<!-- Testimonials Section -->` block (lines 72–108) with:

```html
<!-- Testimonials Section -->
<section class="bg-gray-50 py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Lo que Dicen Nuestros Alumnos
      </h2>
    </div>

    <!-- Satisfaction Stats -->
    <div class="mb-16 flex flex-col items-center gap-4">
      <p class="text-sm font-medium uppercase tracking-wide text-gray-500">
        Basado en encuestas a alumnos 2024
      </p>
      <div class="flex flex-col sm:flex-row gap-8 justify-center">
        <!-- 56% High satisfaction -->
        <div class="flex flex-col items-center gap-3">
          <div class="relative h-32 w-32">
            <svg viewBox="0 0 36 36" class="h-32 w-32 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3" />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="#2563eb"
                stroke-width="3"
                stroke-dasharray="56 44"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="font-heading text-3xl font-bold text-primary-600">56%</span>
            </div>
          </div>
          <p class="text-center text-sm font-semibold text-gray-700">Alta Satisfacción</p>
        </div>

        <!-- 43% Very high satisfaction -->
        <div class="flex flex-col items-center gap-3">
          <div class="relative h-32 w-32">
            <svg viewBox="0 0 36 36" class="h-32 w-32 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3" />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="#16a34a"
                stroke-width="3"
                stroke-dasharray="43 57"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="font-heading text-3xl font-bold text-secondary-600">43%</span>
            </div>
          </div>
          <p class="text-center text-sm font-semibold text-gray-700">Muy Alta Satisfacción</p>
        </div>
      </div>
      <p class="text-center text-sm text-gray-500 max-w-xs">
        El 99% de los encuestados valoró su experiencia con alta o muy alta satisfacción
      </p>
    </div>

    <!-- Testimonial Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      @for (testimonial of testimonials; track testimonial.author) {
        <div
          class="bg-white p-8 rounded-xl shadow"
          [class]="testimonial.placeholder ? 'opacity-60' : ''"
        >
          <!-- Avatar placeholder -->
          @if (testimonial.placeholder) {
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          } @else {
            <!-- Star Rating -->
            <div class="flex gap-1 mb-4">
              @for (star of starArray; track star) {
                @if (star <= testimonial.rating) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                }
              }
            </div>
          }

          <!-- Quote -->
          <p
            class="leading-relaxed mb-6"
            [class]="testimonial.placeholder ? 'text-gray-400 italic text-sm' : 'text-gray-700 italic'"
          >
            "{{ testimonial.quote }}"
          </p>

          <!-- Author -->
          <div>
            <p
              class="font-semibold"
              [class]="testimonial.placeholder ? 'text-gray-400' : 'text-gray-900'"
            >
              {{ testimonial.author }}
            </p>
            <p
              class="text-sm"
              [class]="testimonial.placeholder ? 'text-gray-400' : 'text-primary-600'"
            >
              {{ testimonial.year }}
            </p>
          </div>
        </div>
      }
    </div>
  </div>
</section>
```

**Step 4: Verify in browser**

Navigate to `http://localhost:4200/`
Expected: satisfaction stats section with two SVG donut rings (blue 56%, green 43%), subtitle text, then 3 greyed-out placeholder testimonial cards below.

---

## Summary of File Changes

| File | Change |
|---|---|
| `src/app/pages/plans/plans.ts` | New plan data, new `discount` + `extra` fields, updated includedItems (9 items) |
| `src/app/pages/plans/plans.html` | New card markup (badges, alumni note, extra-service indicators), platform section title, AI icon |
| `src/app/pages/about/about.ts` | teamMembers replaced with 3 role-type profiles |
| `src/app/pages/about/about.html` | Updated mission paragraph |
| `src/app/pages/home/home.ts` | Testimonial placeholders, `placeholder` field on interface |
| `src/app/pages/home/home.html` | Satisfaction stats SVG rings + placeholder testimonial cards |
