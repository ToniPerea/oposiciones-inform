# Local SEO findings: educoef.com (free tier, no GBP/DataForSEO access)

Score: ~58/100. GBP signals 15/25, Reviews 11/20, On-page 15/20, NAP/citations 9/15, Schema 5/10, Links/authority 3/10.
Business type: hybrid (physical classroom at Calle Alonso El Sabio 26, 14001 Córdoba, plus online across Andalucía). Vertical: education / test-prep (not in the standard verticals).

## NAP
| Source | Name | Address | Phone |
|---|---|---|---|
| JSON-LD (index.html) | EDUCOEF — Academia Oposiciones Educación Física | Calle Alonso El Sabio, 26, 14001 Córdoba, Andalucía, ES | +34652249669 |
| Contact page | EDUCOEF | Calle Alonso El Sabio, 26, 14001 Córdoba, Andalucía | +34 652 249 669 |
| Footer | EDUCO EF (split display) | Calle Alonso El Sabio, 26, Córdoba, Andalucía (no postcode) | +34 652 249 669 |
Consistent apart from cosmetic differences: the footer has no postcode, and the schema name carries a descriptor. Phone is not a clickable tel: link on the pages fetched. The map embed uses a lat/lng query (37.8948126,-4.7749106), not a place or CID embed. The map is labelled "Educo Center" in project notes, so confirm the GBP name matches "EDUCOEF" exactly.

## Schema (types: EducationalOrganization + LocalBusiness)
Present: name, description, url, telephone, email, full PostalAddress, areaServed (State: Andalucía), serviceType, knowsAbout.
Missing:
- geo (GeoCoordinates). The coordinates are already on the map embed; use them at 5 decimals.
- openingHoursSpecification. The contact page states L-V 9-20 and S 10-14.
- image and logo.
- sameAs (Instagram https://www.instagram.com/educoef/, GBP URL).
- priceRange.
- hasMap.
- aggregateRating (only if it matches visible data and Google policy allows it; self-serving review markup on the organisation is not eligible for stars).
- @id.
Other issues:
- The type pair is generic. Prefer a single clear type (EducationalOrganization, or a LocalBusiness subtype such as ProfessionalService) and add areaServed City: Córdoba plus Andalucía.
- The JSON-LD is only in index.html, so it is global on every page. Fine for single-location, but add a page-specific one on /contacto.
- Description reads "online para toda Andalucía". Check whether online students outside Andalucía are accepted; if so, widen the audience wording (Spain-wide oposiciones, other comunidades).

## GBP signals (verifiable only from the site)
- Review CTA links to g.page/r/CZmNDjsV-Y6BEBM/review, so a GBP exists and is claimed (home and footer).
- The home page shows Google testimonials ("Lo que dicen en Google", e.g. José Antonio Luque) and a "Déjanos tu reseña" CTA.
- Contact page has a Maps iframe (coordinate-based).
- Not verifiable: primary category (the #1 ranking factor; should be something like "Centro de formación" / "Academia de oposiciones"), rating and count, review velocity, owner responses, photos, posts, hours on GBP, and whether the GBP hours match the site hours. The static Google reviews are hardcoded, so they may be stale.
- Not verifiable: whether the GBP is set as a storefront or as a hybrid with a service area. Do a manual check.

## Reviews
- Visible testimonials come from Google, but no aggregate rating or count was found in the fetched text, and there is no aggregateRating schema. Show the real Google rating and count (e.g. "4,9 de 5, N reseñas") and keep the review link prominent.
- Also note the "0% de valoraciones medias, bajas o muy bajas" claim in the results text. Make sure it is substantiated.

## Local keyword targeting
- Title: "Oposiciones Educación Física Primaria y Secundaria | EDUCOEF Córdoba". Good, Córdoba is present.
- Meta descriptions and H1/hero: Andalucía plus "Online y presencial en Córdoba". Consistent across home, contacto and nosotros.
- Weak spots:
  - Only a single geo-targeted page. There are no dedicated pages for "oposiciones educación física Córdoba", "Sevilla/Málaga/Granada/Jaén" (online), "Primaria" vs "Secundaria", or each exam (temario, programación didáctica, supuestos prácticos). Dedicated service pages are the #1 local organic factor.
  - No blog or guides on oposiciones calendar, plazas Andalucía, or the exam structure.
  - The old "Andalucía" vs the new "Córdoba" title shows drift; keep Córdoba plus Andalucía everywhere.

## Citations and authority (not fully checked)
Direct citation fetches were not performed. Check: Yelp, BBB (low relevance in Spain), Páginas Amarillas, Cylex, Infoempleo and education directories, Facebook, LinkedIn, Bing Places, Apple Business Connect. Only Instagram was found as a social link. The sitemap exists (HTTP 200). Pages are prerendered, so crawling is fine.

## Top actions
1. Critical: Verify the GBP primary category, hours, address and name match the site exactly.
2. Critical: Add geo, openingHoursSpecification, image/logo, sameAs and @id to the JSON-LD.
3. High: Show the real aggregate rating and count from Google on the home and contact pages.
4. High: Create dedicated landing pages: Córdoba presencial, Online Andalucía, Primaria, Secundaria.
5. High: Make the phone a tel: link and add a WhatsApp link with the same number; add the postcode to the footer.
6. Medium: Replace the lat/lng embed with a proper place embed (GBP listing) and add hasMap.
7. Medium: Build citations in Spanish directories; add Facebook, LinkedIn and YouTube profiles to sameAs.
8. Medium: Decide on national scope (online beyond Andalucía) and reflect it in areaServed and copy.
9. Medium: Set a review-request cadence (monthly) and reply to every review.
10. Low: Use a single schema type or a more specific subtype.

## Limitations
No GBP, Local Pack, citation or review-velocity data without paid tools. Proximity effects (about 55% of ranking variance) are not controllable. Pages were fetched without Playwright (raw HTML, prerendered), so client-side widgets could be missed. No browser sandbox issue was reported.
