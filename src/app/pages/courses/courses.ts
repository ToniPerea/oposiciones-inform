import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';

interface CourseFeature {
  text: string;
}

interface Course {
  name: string;
  price: string;
  featured: boolean;
  badge?: string;
  features: CourseFeature[];
  ctaText: string;
  ctaLink: string;
}

interface IncludedItem {
  icon: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-courses',
  imports: [Hero, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  readonly openFaqIndex = signal<number | null>(null);

  readonly courses: Course[] = [
    {
      name: 'Curso Basico',
      price: '149',
      featured: false,
      features: [
        { text: 'Acceso al temario completo' },
        { text: 'Clases semanales online en directo' },
        { text: 'Foro de dudas con profesores' },
        { text: 'Material descargable' },
      ],
      ctaText: 'Mas Informacion',
      ctaLink: '/contacto',
    },
    {
      name: 'Curso Completo',
      price: '249',
      featured: true,
      badge: 'Mas Popular',
      features: [
        { text: 'Todo lo del Curso Basico' },
        { text: 'Preparacion de casos practicos' },
        { text: 'Correccion de programacion didactica' },
        { text: 'Simulacros de examen mensuales' },
        { text: 'Tutoria individual mensual' },
        { text: 'Preparacion de la defensa oral' },
      ],
      ctaText: 'Comenzar Ahora',
      ctaLink: '/contacto',
    },
    {
      name: 'Curso Premium',
      price: '399',
      featured: false,
      features: [
        { text: 'Todo lo del Curso Completo' },
        { text: 'Tutorias semanales individuales' },
        { text: 'Simulacros ante tribunal real' },
        { text: 'Preparacion psicologica' },
        { text: 'Acceso a grabaciones de todas las clases' },
        { text: 'Garantia de continuidad gratuita' },
      ],
      ctaText: 'Mas Informacion',
      ctaLink: '/contacto',
    },
  ];

  readonly includedItems: IncludedItem[] = [
    {
      icon: 'book',
      title: 'Temario Actualizado',
      description:
        '69 temas revisados y actualizados con la legislacion vigente.',
    },
    {
      icon: 'clipboard',
      title: 'Casos Practicos',
      description:
        'Banco de mas de 200 supuestos practicos resueltos y corregidos.',
    },
    {
      icon: 'document',
      title: 'Programacion Didactica',
      description:
        'Guia completa para elaborar tu programacion y unidades didacticas.',
    },
    {
      icon: 'microphone',
      title: 'Defensa Oral',
      description:
        'Simulacros de exposicion ante tribunal con feedback detallado.',
    },
    {
      icon: 'scale',
      title: 'Legislacion',
      description:
        'Actualizaciones continuas sobre cambios normativos en educacion.',
    },
    {
      icon: 'community',
      title: 'Comunidad',
      description:
        'Grupo exclusivo de alumnos para resolver dudas y compartir recursos.',
    },
  ];

  readonly faqItems: FaqItem[] = [
    {
      question: 'Cuando comienzan los cursos?',
      answer:
        'Ofrecemos incorporacion continua. Puedes comenzar en cualquier momento del ano y adaptamos el plan a tu fecha de examen.',
    },
    {
      question: 'Puedo cambiar de modalidad?',
      answer:
        'Si, puedes cambiar entre modalidades en cualquier momento sin coste adicional.',
    },
    {
      question: 'Que pasa si no apruebo?',
      answer:
        'Ofrecemos garantia de continuidad: si no apruebas, continuas tu preparacion de forma gratuita hasta la siguiente convocatoria.',
    },
    {
      question: 'Hay facilidades de pago?',
      answer:
        'Si, ofrecemos pago mensual sin permanencia, y descuentos por pago trimestral o anual.',
    },
    {
      question: 'Las clases quedan grabadas?',
      answer:
        'Si, todas las clases en directo quedan grabadas y disponibles en la plataforma durante tu periodo de matriculacion.',
    },
  ];

  toggleFaq(index: number): void {
    this.openFaqIndex.update((current) =>
      current === index ? null : index
    );
  }
}
