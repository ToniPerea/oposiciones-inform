import { Component, inject } from '@angular/core';
import { SeoService } from '../../../shared/seo/seo';

@Component({
  selector: 'app-aviso-legal',
  templateUrl: './aviso-legal.html',
})
export class AvisoLegal {
  constructor() {
    inject(SeoService).set({
      title: 'Aviso Legal — EDUCOEF',
      description: 'Aviso legal de EDUCOEF, academia de oposiciones de Educación Física en Córdoba.',
      canonical: 'https://educoef.com/aviso-legal',
      noindex: true,
    });
  }
}
