import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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

interface Testimonial {
  quote: string;
  author: string;
  year: string;
  rating: number;
  placeholder?: boolean;
}

@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink, ScrollAnimate],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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
        'Atención personalizada con grupos de máximo 15 alumnos por clase.',
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

  readonly testimonials: Testimonial[] = [
    {
      quote: 'Testimonio próximamente.',
      author: 'Nombre del alumno',
      year: 'Promoción 2024',
      rating: 5,
      placeholder: true,
    },
    {
      quote: 'Testimonio próximamente.',
      author: 'Nombre del alumno',
      year: 'Promoción 2024',
      rating: 5,
      placeholder: true,
    },
    {
      quote: 'Testimonio próximamente.',
      author: 'Nombre del alumno',
      year: 'Promoción 2024',
      rating: 5,
      placeholder: true,
    },
  ];

  readonly starArray = [1, 2, 3, 4, 5];
}
