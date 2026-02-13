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
        'Material didactico revisado y actualizado cada convocatoria con las ultimas novedades legislativas.',
    },
    {
      icon: 'clipboard',
      title: 'Casos Practicos',
      description:
        'Preparacion intensiva de supuestos practicos con correccion personalizada.',
    },
    {
      icon: 'users',
      title: 'Grupos Reducidos',
      description:
        'Atencion personalizada con grupos de maximo 15 alumnos por clase.',
    },
    {
      icon: 'trophy',
      title: 'Alto Porcentaje de Aprobados',
      description:
        'Mas del 75% de nuestros alumnos consiguen plaza en su primera convocatoria.',
    },
  ];

  readonly stats: Stat[] = [
    { value: '+500', label: 'Alumnos Formados' },
    { value: '75%', label: 'Tasa de Aprobados' },
    { value: '+10', label: 'Anos de Experiencia' },
    { value: '98%', label: 'Alumnos Satisfechos' },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Gracias a la academia consegui mi plaza a la primera. La preparacion de los casos practicos fue clave.',
      author: 'Maria Garcia',
      year: 'Aprobada 2024',
      rating: 5,
    },
    {
      quote:
        'El equipo de profesores es increible. Siempre disponibles y con un dominio absoluto del temario.',
      author: 'Carlos Lopez',
      year: 'Aprobado 2024',
      rating: 5,
    },
    {
      quote:
        'La mejor inversion que he hecho. La metodologia de estudio y los simulacros marcaron la diferencia.',
      author: 'Ana Martinez',
      year: 'Aprobada 2023',
      rating: 5,
    },
  ];

  readonly starArray = [1, 2, 3, 4, 5];
}
