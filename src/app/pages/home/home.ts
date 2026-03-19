import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';
import { SeoService } from '../../shared/seo/seo';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}


@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink, ScrollAnimate],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor() {
    inject(SeoService).set({
      title: 'Academia Oposiciones Educación Física Córdoba | EDUCOEF Andalucía',
      description: 'Academia de oposiciones de EF para la Junta de Andalucía. Preparación presencial en Córdoba y online. Más de 15 años formando profesores.',
      canonical: 'https://educoef.com/',
    });
  }

  readonly features: Feature[] = [
    {
      icon: 'book',
      title: 'Temario Actualizado',
      description:
        'Material didáctico revisado y actualizado cada convocatoria con las últimas novedades legislativas.',
    },
    {
      icon: 'clipboard',
      title: 'Supuestos Prácticos',
      description:
        'Preparación intensiva de supuestos prácticos con corrección personalizada.',
    },
    {
      icon: 'users',
      title: 'Grupos Reducidos',
      description:
        'Atención personalizada con grupos de máximo 18 alumnos por clase.',
    },
    {
      icon: 'trophy',
      title: 'Alto Porcentaje de Aprobados',
      description:
        'Más del 75% de nuestros alumnos consiguen plaza en su primera convocatoria.',
    },
  ];

  readonly stats: Stat[] = [
    { value: '+500', label: 'Alumnos Formados' },
    { value: '75%', label: 'Tasa de Aprobados' },
    { value: '+15', label: 'Años de Experiencia' },
    { value: '98%', label: 'Alumnos Satisfechos' },
  ];

}
