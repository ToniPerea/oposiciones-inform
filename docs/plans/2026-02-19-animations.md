# Animations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add page-transition animations (View Transitions API) and scroll-reveal animations (Intersection Observer directive) to the EDUCOEF site.

**Architecture:** Two independent features — (1) one-line router change + CSS keyframes for page transitions; (2) a standalone Angular directive that uses IntersectionObserver to add a CSS class when elements enter the viewport, applied across all pages via the `appScrollAnimate` attribute with an optional `delay` input for stagger effects.

**Tech Stack:** Angular 20 standalone components, TailwindCSS v4, native IntersectionObserver API, View Transitions API, CSS keyframes in `src/styles.css`.

---

### Task 1: Page transitions — router config + CSS

**Files:**
- Modify: `src/app/app.config.ts`
- Modify: `src/styles.css`

**Step 1: Add `withViewTransitions()` to `app.config.ts`**

Add `withViewTransitions` to the import line and to `provideRouter()`:

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions(),
    ),
  ],
};
```

**Step 2: Add view transition keyframes to `src/styles.css`**

Append after the existing `body` block:

```css
/* Page transition animations */
@keyframes fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes slide-up-fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

::view-transition-old(root) {
  animation: 200ms ease-out fade-out;
}

::view-transition-new(root) {
  animation: 300ms ease-out slide-up-fade-in;
}
```

**Step 3: Verify build**

Run: `pnpm ng build --configuration development 2>&1 | tail -5`
Expected: `Application bundle generation complete.` with no errors.

---

### Task 2: Scroll animate directive

**Files:**
- Create: `src/app/shared/scroll-animate/scroll-animate.ts`
- Modify: `src/styles.css`

**Step 1: Add scroll-animate CSS classes to `src/styles.css`**

Append after the view transition block added in Task 1:

```css
/* Scroll-reveal animations */
.scroll-animate {
  opacity: 0;
  transform: translateY(1.25rem);
  transition: opacity 0.55s ease-out, transform 0.55s ease-out;
}

.scroll-animate.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Create the directive at `src/app/shared/scroll-animate/scroll-animate.ts`**

```typescript
import { Directive, ElementRef, input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
})
export class ScrollAnimate implements OnInit, OnDestroy {
  readonly delay = input<number>(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const element = this.el.nativeElement;

    // Set initial hidden state
    element.classList.add('scroll-animate');

    const delayMs = this.delay();
    if (delayMs > 0) {
      element.style.transitionDelay = `${delayMs}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('in-view');
            this.observer?.disconnect();
            this.observer = null;
          }
        });
      },
      { threshold: 0.12 },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
```

**Step 3: Verify build**

Run: `pnpm ng build --configuration development 2>&1 | tail -5`
Expected: `Application bundle generation complete.` with no errors.

---

### Task 3: Apply directive to home page

**Files:**
- Modify: `src/app/pages/home/home.ts` — add `ScrollAnimate` to imports
- Modify: `src/app/pages/home/home.html` — add `appScrollAnimate` attributes

**Step 1: Add `ScrollAnimate` to `home.ts` imports**

```typescript
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink, ScrollAnimate],
  ...
})
```

**Step 2: Add `appScrollAnimate` to elements in `home.html`**

Apply to the following elements (add the attribute, do not change any other class or content):

- The `<h2>` in "¿Por qué Elegirnos?" section:
  ```html
  <h2 appScrollAnimate class="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
  ```

- Each feature card `<div>` inside the `@for` loop (use `$index` for stagger):
  ```html
  <div appScrollAnimate [delay]="i * 100" class="bg-white rounded-xl shadow-lg p-8 ...">
  ```

- The stats `<section>` element:
  ```html
  <section appScrollAnimate class="bg-primary-700 text-white py-16">
  ```

- The `<h2>` in the Testimonials section:
  ```html
  <h2 appScrollAnimate class="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
  ```

- The satisfaction stats container `<div class="mb-16 flex flex-col items-center gap-4">`:
  ```html
  <div appScrollAnimate class="mb-16 flex flex-col items-center gap-4">
  ```

- Each testimonial card `<div class="bg-white p-8 rounded-xl shadow"...>` (use `$index` for stagger):
  ```html
  <div appScrollAnimate [delay]="i * 100" class="bg-white p-8 rounded-xl shadow" ...>
  ```

**Note:** The `@for` loops in home.html already use `let i = $index` — use that variable for delay.

**Step 3: Verify build**

Run: `pnpm ng build --configuration development 2>&1 | tail -5`
Expected: no errors.

---

### Task 4: Apply directive to plans page

**Files:**
- Modify: `src/app/pages/plans/plans.ts` — add `ScrollAnimate` to imports
- Modify: `src/app/pages/plans/plans.html` — add `appScrollAnimate` attributes

**Step 1: Add `ScrollAnimate` to `plans.ts` imports**

```typescript
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

@Component({
  selector: 'app-plans',
  imports: [Hero, RouterLink, ScrollAnimate],
  ...
})
```

**Step 2: Add `appScrollAnimate` to elements in `plans.html`**

- The `<h2>` "Elige tu Plan de Preparación":
  ```html
  <h2 appScrollAnimate class="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
  ```

- Each plan card `<div class="relative flex flex-col rounded-2xl p-8"...>` (use `$index` for stagger):
  ```html
  <div appScrollAnimate [delay]="i * 120" class="relative flex flex-col rounded-2xl p-8" ...>
  ```

- The `<h2>` "¿Qué Incluye la Plataforma?":
  ```html
  <h2 appScrollAnimate class="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
  ```

- Each platform card `<div class="rounded-xl bg-white p-4 sm:p-8 shadow-md...">` (use `$index` for stagger, cap at 4 items to avoid long delays: `[delay]="(i % 3) * 100"`):
  ```html
  <div appScrollAnimate [delay]="(i % 3) * 100" class="rounded-xl bg-white p-4 sm:p-8 shadow-md ...">
  ```

- The `<h2>` "Preguntas Frecuentes":
  ```html
  <h2 appScrollAnimate class="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
  ```

**Step 3: Verify build**

Run: `pnpm ng build --configuration development 2>&1 | tail -5`
Expected: no errors.

---

### Task 5: Apply directive to about page

**Files:**
- Modify: `src/app/pages/about/about.ts` — add `ScrollAnimate` to imports
- Modify: `src/app/pages/about/about.html` — add `appScrollAnimate` attributes

**Step 1: Add `ScrollAnimate` to `about.ts` imports**

```typescript
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

@Component({
  selector: 'app-about',
  imports: [Hero, ScrollAnimate],
  ...
})
```

**Step 2: Add `appScrollAnimate` to elements in `about.html`**

- The `<h2>` "Nuestra Misión":
  ```html
  <h2 appScrollAnimate class="font-heading text-3xl font-bold text-gray-900">
  ```

- Each value `<div class="border-l-4 border-primary-600...">` (use `$index` for stagger):
  ```html
  <div appScrollAnimate [delay]="i * 100" class="border-l-4 border-primary-600 py-2 pl-4">
  ```

- The `<h2>` "Nuestra Metodología":
  ```html
  <h2 appScrollAnimate class="font-heading text-center text-3xl font-bold text-gray-900 md:text-4xl">
  ```

- Each methodology step `<div class="relative flex flex-col items-center text-center">` (use `$index` for stagger):
  ```html
  <div appScrollAnimate [delay]="i * 100" class="relative flex flex-col items-center text-center">
  ```

- The `<h2>` "Nuestro Equipo":
  ```html
  <h2 appScrollAnimate class="font-heading text-center text-3xl font-bold text-gray-900 md:text-4xl">
  ```

- Each team card `<div class="overflow-hidden rounded-xl bg-white shadow-lg">` (use `$index` for stagger):
  ```html
  <div appScrollAnimate [delay]="i * 150" class="overflow-hidden rounded-xl bg-white shadow-lg">
  ```

**Step 3: Verify build**

Run: `pnpm ng build --configuration development 2>&1 | tail -5`
Expected: no errors.

---

## Summary of File Changes

| File | Change |
|---|---|
| `src/app/app.config.ts` | Add `withViewTransitions()` |
| `src/styles.css` | Add keyframes + view-transition rules + scroll-animate CSS classes |
| `src/app/shared/scroll-animate/scroll-animate.ts` | New directive (create) |
| `src/app/pages/home/home.ts` | Import `ScrollAnimate` |
| `src/app/pages/home/home.html` | Add `appScrollAnimate` + `[delay]` to key elements |
| `src/app/pages/plans/plans.ts` | Import `ScrollAnimate` |
| `src/app/pages/plans/plans.html` | Add `appScrollAnimate` + `[delay]` to key elements |
| `src/app/pages/about/about.ts` | Import `ScrollAnimate` |
| `src/app/pages/about/about.html` | Add `appScrollAnimate` + `[delay]` to key elements |
