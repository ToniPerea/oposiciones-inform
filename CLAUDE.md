# Academia Oposiciones EF

Website for a Physical Education teacher exam preparation academy in Spain.
**Live**: https://ToniPerea.github.io/oposiciones-inform/

## Commands

- `pnpm start` — Dev server (http://localhost:4200)
- `pnpm build` — Production build
- `pnpm ng build --base-href=/oposiciones-inform/` — Build for GitHub Pages
- `pnpm ng deploy --base-href=/oposiciones-inform/` — Deploy to GitHub Pages
- `pnpm test` — Run unit tests (Karma)
- `pnpm ng generate component <path>` — Generate a new component

## Tech Stack

- **Angular 20** (standalone components, no NgModules)
- **TailwindCSS v4** (CSS-first config via `@theme` block in `src/styles.css`)
- **pnpm** package manager
- **TypeScript 5.9**
- **GitHub Pages** deployment via `angular-cli-ghpages`

## Architecture

### Zoneless & Signals
- Uses `provideZonelessChangeDetection()` — no Zone.js
- All reactive state uses Angular signals: `signal()`, `input()`, `input.required()`, `computed()`
- Read signals in templates with function call syntax: `mySignal()`

### Component Conventions
- Angular 20 file naming: `navbar.ts`, `navbar.html`, `navbar.css` (not `.component.ts`)
- Standalone by default (no `standalone: true` needed in Angular 20)
- Modern control flow: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`)
- Lazy-loaded routes via `loadComponent()` in `app.routes.ts`
- Component classes are exported with PascalCase names (e.g., `export class Navbar`)

### Styling
- TailwindCSS v4 with custom theme in `src/styles.css`
- Color tokens: `primary-*` (blue), `secondary-*` (green), `accent-*` (orange)
- Fonts: `font-sans` (Inter), `font-heading` (Montserrat) — loaded via Google Fonts in `index.html`
- All styling via Tailwind utility classes in templates (no component CSS needed)
- Use `@reference "tailwindcss"` in component `.css` files if `@apply` is needed

### Content Language
- All user-facing content is in **Spanish**
- Route paths are in Spanish: `/nosotros`, `/cursos`, `/contacto`

## Project Structure

```
src/
├── styles.css              — Tailwind v4 theme (colors, fonts)
├── index.html              — lang="es", Google Fonts, meta tags, SPA redirect
├── 404.html                — GitHub Pages SPA routing redirect
├── app/
│   ├── app.ts / app.html   — Root: Navbar + RouterOutlet + Footer
│   ├── app.config.ts       — Zoneless + Router providers
│   ├── app.routes.ts       — Lazy-loaded routes
│   ├── layout/
│   │   ├── navbar/         — Sticky responsive navbar with mobile hamburger
│   │   └── footer/         — 4-column footer with nav, contact, social links
│   ├── shared/
│   │   └── hero/           — Reusable hero (signal inputs: title, subtitle, ctaText, ctaLink)
│   └── pages/
│       ├── home/           — Landing: hero, features, stats, testimonials, CTA
│       ├── about/          — Mission, methodology, team members
│       ├── courses/        — 3 pricing tiers, included items, FAQ accordion
│       └── contact/        — Reactive form with validation, map, WhatsApp button
└── public/
    └── favicon.ico
```

## GitHub Pages Deployment

- SPA routing handled by `src/404.html` which redirects all paths to `index.html`
- The `404.html` is included in the build via `angular.json` assets config
- Always use `--base-href=/oposiciones-inform/` when building or deploying
- Repository must be **public** for free GitHub Pages hosting

## Key Decisions

- Contact form is a **mock** (logs to console) — no backend/EmailJS integration yet
- No images/photos used — SVG icons are inline in templates (Heroicons style)
- Team member avatars use initials in colored circles instead of photos
- Google Maps iframe embedded in contact page (centered on Madrid)
- WhatsApp floating button with pre-filled message on contact page
