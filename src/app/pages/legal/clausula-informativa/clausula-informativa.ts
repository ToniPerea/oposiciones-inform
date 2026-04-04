import { Component, inject } from '@angular/core';
import { SeoService } from '../../../shared/seo/seo';

@Component({
  selector: 'app-clausula-informativa',
  templateUrl: './clausula-informativa.html',
})
export class ClausulaInformativa {
  constructor() {
    inject(SeoService).set({
      title: 'Cláusula Informativa — EDUCOEF',
      description: 'Cláusula informativa de EDUCOEF, academia de oposiciones de Educación Física en Córdoba.',
      canonical: 'https://educoef.com/clausula-informativa',
      noindex: true,
    });
  }
}
