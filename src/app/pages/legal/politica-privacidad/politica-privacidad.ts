import { Component, inject } from '@angular/core';
import { SeoService } from '../../../shared/seo/seo';

@Component({
  selector: 'app-politica-privacidad',
  templateUrl: './politica-privacidad.html',
})
export class PoliticaPrivacidad {
  constructor() {
    inject(SeoService).set({
      title: 'Política de Privacidad — EDUCOEF',
      description: 'Política de privacidad de EDUCOEF, academia de oposiciones de Educación Física en Córdoba.',
      canonical: 'https://educoef.com/politica-privacidad',
      noindex: true,
    });
  }
}
