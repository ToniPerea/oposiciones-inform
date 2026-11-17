# Visual findings educoef.com (2026-11-17)
Screenshots: .../educoef.com-audit/screenshots/{home,planes,nosotros,contacto}/educoef_com_{desktop,laptop,tablet,mobile}.png
Sandbox: true. analyze_visual: no horizontal scroll, viewport meta ok, touch targets ok, base font 16px, no overlaps on all 4 pages.
Method note: custom Playwright scripts cannot run via launcher (bundled basenames only), so no per-element tap measurements beyond analyze_visual.

## Issues
1. HIGH (mobile, all pages): cookie banner fixed at bottom takes about 208 of 812 CSS px (~26%) on first load, with 3 stacked actions (Personalizar, Solo necesarias, Aceptar todas). On home it covers the hero subtitle and fully hides the primary CTA "Comienza tu Preparación" above the fold.
2. MED (mobile home): orange announcement banner (~140px) plus 64px nav push the H1 down; H1 is large (5 lines) so with cookie banner the visible content is mostly banner + headline.
3. MED (desktop, all pages): "¡Síguenos en Instagram!" toast bottom-right sits directly above and is partly clipped by the cookie banner (text cut at 1080 fold). Two competing overlays.
4. LOW (desktop): cookie banner covers bottom ~72px of 1080 fold; below-fold video section heading partially hidden. Hero CTA itself is visible at y~550.
5. LOW: hero blocks on inner pages (planes, nosotros, contacto) are tall (~360-390px desktop, ~540px mobile) with empty space; on /planes mobile the pricing cards start below fold, no CTA above fold.
6. LOW (/planes desktop): Plan Premium card is offset upward vs other two with a "Todo incluido" pill; fine, intentional. Prices 500€ one-time / 100€/mes / 160€/mes.

## Positives
Clear H1 on all pages, nav collapses to hamburger on mobile, "Contactar" header CTA visible on desktop, form fields full width and legible on mobile, no overflow.
