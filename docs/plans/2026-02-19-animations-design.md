# Animations Design

## Page Transitions
- Add `withViewTransitions()` to `provideRouter()` in `app.config.ts`
- Custom CSS in `styles.css`: slide-up + fade for new page, fade-out for old page
- Graceful degradation in browsers without View Transitions API

## Scroll Animations
- New directive: `src/app/shared/animate-on-scroll/animate-on-scroll.ts`
- Uses `IntersectionObserver`, fires once per element, then disconnects
- Optional `delay` input (ms) for stagger effect on card grids
- Initial state: invisible + slight downward offset; animated state: visible + normal position
- Applied to: section headings, feature cards, stat numbers, plan cards, platform cards, team cards, satisfaction rings
