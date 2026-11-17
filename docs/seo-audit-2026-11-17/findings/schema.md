# Schema audit educoef.com (score 58/100)

## Detected
- index.html (sitewide, server-rendered): 1 JSON-LD block, @type ["EducationalOrganization","LocalBusiness"], no @id, no @graph.
- /planes: FAQPage injected client-side via plans.ts (ngOnInit, id=faq-schema). Not in prerendered HTML unless SSR runs ngOnInit (verify).
- No WebSite, WebPage, BreadcrumbList, Offer/Course/Service, Person, VideoObject (home has a platform video), sameAs.
- Legal pages, /nosotros, /contacto, /: no page-specific schema.

## Validation
- Org block: valid JSON, https context, absolute URL. PASS with warnings.
- Missing for LocalBusiness: image/logo (Critical for local rich/KG), priceRange, openingHoursSpecification, geo, sameAs, @id, hasMap. (Google: name, address required; others recommended.)
- Multi-typing EducationalOrganization+LocalBusiness is valid, but better: LocalBusiness subtype is fine; keep both.
- areaServed State "Andalucia": acceptable; use AdministrativeArea/State with Wikidata sameAs optionally.
- serviceType/knowsAbout are strings: OK. serviceType is a Service property, not Organization -> not valid on this type (warning; move into a Service node).
- name "EDUCOEF — Academia Oposiciones Educación Física" differs from brand "EDUCOEF" used in og:site_name; use name "EDUCOEF", alternateName for the long form.
- FAQPage: Info only (rich results retired May 2026). No SERP benefit; keep or remove, low priority.

## NAP / consistency
- Phone +34 652 249 669 = footer/contact: match. Email match.
- Address Calle Alonso El Sabio 26, 14001 Córdoba: match across footer, contact, legal. 
- Geo: map embed uses 37.8948126,-4.7749106 -> not in schema (add).
- Hours: contact.html shows "Lunes a Viernes 9:00-20:00" but contact.ts data says also "Sábados 10:00-14:00". Visible/source conflict; resolve before adding openingHoursSpecification.
- Instagram https://www.instagram.com/educoef/ exists in footer + popup but not in sameAs.
- Legal entity: Inmaculada C. Martí Garrido (NIF in clausula). Could be founder/legalName; consider (privacy: do not publish NIF).
- Description says "para Andalucía" and presencial+online; copy covers Primaria+Secundaria but description in schema mentions only "profesor de Educación Física": minor, align.

## Opportunities (priority)
1. High: add @id/@graph linking Organization, WebSite, WebPage; add logo (https://educoef.com/logo.png), image, sameAs, geo, openingHoursSpecification, priceRange, hasMap.
2. Medium: Service/Course nodes with Offer for the 3 plans (Plan Materiales 500 EUR one-time; 100 EUR/mo; 160 EUR/mo) on /planes, using priceSpecification (UnitPriceSpecification billingDuration P1M for monthly). Course rich results need provider+description; Google Course list requires Course info; low-moderate SERP value. Only mark up if prices are visible (they are).
3. Medium: BreadcrumbList on inner pages; ContactPage on /contacto; AboutPage on /nosotros with Person (Javier Murillo Moraño) as employee.
4. Low: VideoObject for the home platform video (needs uploadDate, thumbnailUrl).
5. Info: FAQPage.
6. Ensure JSON-LD for page-level nodes is rendered in prerendered HTML, not only client-side.
No HowTo recommended.

## Suggested JSON-LD (replace index.html block)
{
 "@context":"https://schema.org",
 "@graph":[
  {"@type":["EducationalOrganization","LocalBusiness"],"@id":"https://educoef.com/#organization",
   "name":"EDUCOEF","alternateName":"EDUCOEF - Academia Oposiciones Educación Física",
   "url":"https://educoef.com/","logo":"https://educoef.com/logo.png","image":"https://educoef.com/logo.png",
   "telephone":"+34652249669","email":"info@educoef.com","priceRange":"€€",
   "address":{"@type":"PostalAddress","streetAddress":"Calle Alonso El Sabio, 26","addressLocality":"Córdoba","postalCode":"14001","addressRegion":"Andalucía","addressCountry":"ES"},
   "geo":{"@type":"GeoCoordinates","latitude":37.8948126,"longitude":-4.7749106},
   "openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"20:00"}],
   "areaServed":{"@type":"State","name":"Andalucía"},
   "sameAs":["https://www.instagram.com/educoef/"],
   "knowsAbout":["Oposiciones Educación Física","Cuerpo de Maestros","Cuerpo de Profesores de Secundaria"]},
  {"@type":"WebSite","@id":"https://educoef.com/#website","url":"https://educoef.com/","name":"EDUCOEF","inLanguage":"es","publisher":{"@id":"https://educoef.com/#organization"}}
 ]}
(Confirm hours before using; add Saturday 10:00-14:00 only if true.)

## Plans offer example (per plan, on /planes)
{"@context":"https://schema.org","@type":"Service","name":"Plan Materiales","provider":{"@id":"https://educoef.com/#organization"},"areaServed":"ES","offers":{"@type":"Offer","price":"500","priceCurrency":"EUR","url":"https://educoef.com/planes"}}
Monthly plans: Offer with priceSpecification {"@type":"UnitPriceSpecification","price":"100","priceCurrency":"EUR","billingDuration":"P1M","unitCode":"MON"}.
