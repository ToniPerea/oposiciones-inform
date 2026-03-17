import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-politica-cookies',
  imports: [],
  templateUrl: './politica-cookies.html',
})
export class PoliticaCookies {
  constructor() {
    inject(Title).setTitle('Política de Cookies | EDUCOEF');
    inject(Meta).updateTag({ name: 'description', content: 'Política de cookies de EDUCOEF. Información sobre las cookies que usamos y cómo gestionarlas.' });
  }
}
