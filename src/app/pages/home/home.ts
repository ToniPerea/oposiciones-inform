import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';

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
}

@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink],
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
      title: 'Casos Prácticos',
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
    { value: '+10', label: 'Años de Experiencia' },
    { value: '98%', label: 'Alumnos Satisfechos' },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Gracias a la academia conseguí mi plaza a la primera. La preparación de los casos prácticos fue clave.',
      author: 'María García',
      year: 'Aprobada 2024',
      rating: 5,
    },
    {
      quote:
        'El equipo de profesores es increíble. Siempre disponibles y con un dominio absoluto del temario.',
      author: 'Carlos López',
      year: 'Aprobado 2024',
      rating: 5,
    },
    {
      quote:
        'La mejor inversión que he hecho. La metodología de estudio y los simulacros marcaron la diferencia.',
      author: 'Ana Martínez',
      year: 'Aprobada 2023',
      rating: 5,
    },
  ];

  readonly starArray = [1, 2, 3, 4, 5];
}
