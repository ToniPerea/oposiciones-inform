import { Component, inject } from '@angular/core';
import { SeoService } from '../../../shared/seo/seo';

@Component({
  selector: 'app-politica-cookies',
  imports: [],
  templateUrl: './politica-cookies.html',
})
export class PoliticaCookies {
  constructor() {
    inject(SeoService).set({
      title: 'Política de Cookies — EDUCOEF',
      description: 'Política de cookies de EDUCOEF. Información sobre las cookies que usamos y cómo gestionarlas.',
      canonical: 'https://educoef.com/politica-cookies',
      noindex: true,
    });
  }
}
