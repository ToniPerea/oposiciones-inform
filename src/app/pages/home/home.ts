import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

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
    inject(Title).setTitle('Academia Oposiciones Educación Física Córdoba | EDUCOEF Andalucía');
    inject(Meta).updateTag({ name: 'description', content: 'Prepara tus oposiciones de profesor de Educación Física en Andalucía. Clases presenciales en Córdoba y online para toda Andalucía. Metodología probada y plazas limitadas.' });
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
