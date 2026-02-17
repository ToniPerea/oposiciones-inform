import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';

interface PlansFeature {
  text: string;
}

interface Plan {
  name: string;
  price: string;
  priceType: 'monthly' | 'onetime';
  featured: boolean;
  badge?: string;
  features: PlansFeature[];
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
  selector: 'app-plans',
  imports: [Hero, RouterLink],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans {
  readonly openFaqIndex = signal<number | null>(null);

  readonly plans: Plan[] = [
    {
      name: 'Plan Básico',
      price: '399',
      priceType: 'onetime',
      featured: false,
      badge: 'Autónomo',
      features: [
        { text: 'Acceso al temario completo' },
        { text: 'Clases semanales online en diferido' },
        { text: 'Supuestos prácticos resueltos' },
        { text: 'Modelo de programación didáctica y situación de aprendizaje' },
        { text: 'Modelo desarrollado de exposición oral' },
      ],
      ctaText: 'Mas Informacion',
      ctaLink: '/contacto',
    },
    {
      name: 'Plan Premium',
      price: '120',
      priceType: 'monthly',
      featured: true,
      badge: 'Recomendado',
      features: [
        { text: 'Todo lo del Plan Básico' },
        { text: 'Clases presenciales/online en directo' },
        { text: 'Simulacro de temas mensual' },
        { text: 'Simulacro oral ante tribunal real' },
        { text: 'Corrección de supuestos prácticos' },
        { text: 'Correcciones periódicas de la programación didáctica' },
      ],
      ctaText: 'Más Información',
      ctaLink: '/contacto',
    },
    {
      name: 'Plan Completo',
      price: '100',
      priceType: 'monthly',
      featured: false,
      badge: 'Online',
      features: [
        { text: 'Todo lo del Plan Básico' },
        { text: 'Clases online en directo' },
        { text: 'Corrección de programacion didactica' },
        { text: 'Simulacro en diferido de temas' },
      ],
      ctaText: 'Comenzar Ahora',
      ctaLink: '/contacto',
    }
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
