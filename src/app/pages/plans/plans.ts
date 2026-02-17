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
      ctaText: 'Más Información',
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
        { text: 'Corrección de programación didáctica' },
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
        '25 temas revisados y actualizados con la legislación vigente.',
    },
    {
      icon: 'clipboard',
      title: 'Casos Prácticos',
      description:
        'Banco de más de 200 supuestos prácticos resueltos y corregidos.',
    },
    {
      icon: 'document',
      title: 'Programación Didáctica',
      description:
        'Modelo de programación didáctica con correcciones personalizadas.',
    },
    {
      icon: 'microphone',
      title: 'Defensa Oral',
      description:
        'Simulacros de exposición ante tribunal con feedback detallado.',
    },
    {
      icon: 'audio',
      title: 'Resúmenes en Audio',
      description:
        'Audios de los temas para estudiar mientras te desplazas o haces deporte.',
    },
    {
      icon: 'file',
      title: 'Resumen de un Folio',
      description:
        'Cada tema resumido en una sola página para facilitar el repaso rápido.',
    },
    {
      icon: 'cards',
      title: 'Flashcards y Mapas Mentales',
      description:
        'Herramientas visuales interactivas para optimizar tu memorización.',
    },
    {
      icon: 'chart',
      title: 'Infografías Visuales',
      description:
        'Contenido visual de alta calidad para conceptos complejos y estadísticas.',
    },
    {
      icon: 'exam',
      title: 'Simulacros Mensuales',
      description:
        'Simulacro de examen y supuesto práctico mensuales con corrección detallada.',
    },
    {
      icon: 'location',
      title: 'Sesiones Presenciales',
      description:
        'Clases presenciales en academia real ubicada en Córdoba.',
    },
    {
      icon: 'computer',
      title: 'Plataforma Digital',
      description:
        'Basada en Google Classroom de fácil acceso desde cualquier dispositivo.',
    },
    {
      icon: 'report',
      title: 'Seguimiento Individualizado',
      description:
        'Informe personalizado de tu progreso y áreas de mejora continua.',
    },
    {
      icon: 'scale',
      title: 'Legislación',
      description:
        'Actualizaciones continuas sobre cambios normativos en educación.',
    },
    {
      icon: 'community',
      title: 'Comunidad',
      description:
        'Grupo exclusivo de alumnos para resolver dudas y compartir recursos.',
    },
    {
      icon: 'attention',
      title: 'Atención Personalizada',
      description:
        'Atención individual con tu preparador para resolver dudas y orientación continua.',
    },
  ];

  readonly faqItems: FaqItem[] = [
    {
      question: '¿Cuándo comienzan los cursos?',
      answer:
        'Ofrecemos incorporación continua. Puedes comenzar en cualquier momento del año y adaptamos el plan a tu fecha de examen.',
    },
    {
      question: '¿Puedo cambiar de modalidad?',
      answer:
        'Sí, puedes cambiar entre modalidades en cualquier momento sin coste adicional.',
    },
    {
      question: '¿Qué pasa si no apruebo?',
      answer:
        'Ofrecemos garantía de continuidad: si no apruebas, continúas tu preparación de forma gratuita hasta la siguiente convocatoria.',
    },
    {
      question: '¿Hay facilidades de pago?',
      answer:
        'Sí, ofrecemos pago mensual sin permanencia, y descuentos por pago trimestral o anual.',
    },
    {
      question: '¿Las clases quedan grabadas?',
      answer:
        'Sí, todas las clases en directo quedan grabadas y disponibles en la plataforma durante tu período de matriculación.',
    },
  ];

  toggleFaq(index: number): void {
    this.openFaqIndex.update((current) =>
      current === index ? null : index
    );
  }
}
