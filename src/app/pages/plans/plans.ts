import { Component, signal, inject, OnInit, OnDestroy, DOCUMENT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';
import { SeoService } from '../../shared/seo/seo';

interface PlansFeature {
  text: string;
  extra?: boolean; // true = paid separately (shown differently in template)
}

interface Plan {
  name: string;
  price: string;
  priceType: 'monthly' | 'onetime';
  featured: boolean;
  badge?: string;
  limitedSpots?: boolean;
  features: PlansFeature[];
  discount?: string; // alumni discount note e.g. "Exalumnos: 129 € (−20 €)"
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
  imports: [Hero, RouterLink, ScrollAnimate],
  templateUrl: './plans.html',
  styleUrl: './plans.css',
})
export class Plans implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  constructor() {
    inject(SeoService).set({
      title: 'Planes de Preparación | Oposiciones EF Andalucía — EDUCOEF Córdoba',
      description: 'Plan Materiales, Plus y Premium para oposiciones de EF en Andalucía. Presencial en Córdoba u online. Plazas limitadas para Plan Premium.',
      canonical: 'https://educoef.com/planes',
    });
  }

  ngOnInit(): void {
    this.injectFaqSchema();
  }

  ngOnDestroy(): void {
    this.document.getElementById('faq-schema')?.remove();
  }

  private injectFaqSchema(): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  readonly openFaqIndex = signal<number | null>(null);
  readonly expandedPlanIndex = signal<number | null>(null);

  readonly plans: Plan[] = [
    {
      name: 'Plan Materiales',
      price: '500',
      priceType: 'onetime',
      featured: false,
      badge: 'Pago único',
      features: [
        { text: 'Temario completo' },
        { text: 'Supuestos prácticos resueltos' },
        { text: 'Resúmenes y esquemas completos de cada tema' },
        { text: 'Correcciones (servicio aparte, por uso)', extra: true },
      ],
      ctaText: 'Más Información',
      ctaLink: '/contacto',
    },
    {
      name: 'Plan Plus',
      price: '100',
      priceType: 'monthly',
      featured: false,
      badge: 'Más popular',
      features: [
        { text: 'Todo lo del Plan Materiales' },
        { text: 'Acceso a plataforma con clases en diferido' },
        { text: 'Tips para mejorar tu proceso de estudio' },
        { text: 'Acceso a foro para preguntas en comunidad' },
        { text: 'Organización del estudio de temas' },
        { text: 'Temas y criterios actualizados durante el año' },
        { text: 'Correcciones (servicio aparte, por uso)', extra: true },
      ],
      ctaText: 'Más Información',
      ctaLink: '/contacto',
    },
    {
      name: 'Plan Premium',
      price: '160',
      priceType: 'monthly',
      featured: true,
      badge: 'Todo incluido',
      limitedSpots: true,
      features: [
        { text: 'Todo lo del Plan Plus' },
        { text: 'Simulacros de temas y supuestos prácticos' },
        { text: 'Corrección de programación y situaciones de aprendizaje' },
        { text: 'Preparación y simulacro de la defensa oral' },
        { text: 'Seguimiento personalizado' },
        { text: 'Clases Online en directo/presencial en Córdoba'}
      ],
      ctaText: 'Reservar plaza',
      ctaLink: '/contacto',
    },
  ];

  readonly includedItems: IncludedItem[] = [
    {
      icon: 'book',
      title: 'Temario Actualizado (25 temas)',
      description: 'Los 25 temas completos, revisados y actualizados con la normativa vigente.',
    },
    {
      icon: 'clipboard',
      title: 'Supuestos Prácticos',
      description: 'Supuestos prácticos ya resueltos. Fórmulas optimizadas de resolución y ejercicios cortos.',
    },
    {
      icon: 'document',
      title: 'Programación Didáctica',
      description: 'Modelo de programación didáctica y situación de aprendizaje para la oposición.',
    },
    {
      icon: 'microphone',
      title: 'Defensa Oral',
      description: 'Materiales y simulacros para preparar la exposición ante el tribunal.',
    },
    {
      icon: 'audio',
      title: 'Resúmenes en Audio',
      description: 'Audios de todos los temas para estudiar donde quieras, cuando quieras.',
    },
    {
      icon: 'chart',
      title: 'Infografías Visuales',
      description: 'Esquemas visuales de alta calidad para fijar conceptos clave de cada tema.',
    },
    {
      icon: 'memory',
      title: 'Ejercicios para la Memorización',
      description: 'Ejercicios específicos diseñados para memorizar los temas de forma efectiva y duradera.',
    },
    {
      icon: 'exam',
      title: 'Simulacros Mensuales',
      description: 'Examen y supuesto práctico mensual con corrección detallada para medir tu progreso.',
    },
    {
      icon: 'report',
      title: 'Seguimiento personalizado',
      description: 'Informe personalizado con tus notas y progreso hacia tus objetivos.',
    }
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
        'Sí, puedes cambiar entre modalidades en cualquier momento.',
    },
    {
      question: '¿Hay facilidades de pago?',
      answer:
        'Sí, puedes contactarnos para más información sobre las opciones de pago disponibles.',
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

  togglePlan(index: number): void {
    this.expandedPlanIndex.update((current) =>
      current === index ? null : index
    );
  }
}
