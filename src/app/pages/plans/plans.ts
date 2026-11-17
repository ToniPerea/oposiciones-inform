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
  presencialFullStage?: 'primaria' | 'secundaria';
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
      title: 'Planes de Preparación | Oposiciones EF Primaria y Secundaria — EDUCOEF',
      description: 'Plan Materiales, Plus y Premium para oposiciones de EF en Andalucía, para Primaria y Secundaria. Presencial en Córdoba u online. Plazas limitadas para Plan Premium.',
      canonical: 'https://educoef.com/planes/',
    });
  }

  ngOnInit(): void {
    this.injectFaqSchema();
    this.injectPlansSchema();
  }

  ngOnDestroy(): void {
    this.document.getElementById('faq-schema')?.remove();
    this.document.getElementById('plans-schema')?.remove();
  }

  private injectPlansSchema(): void {
    if (this.document.getElementById('plans-schema')) return;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://educoef.com/planes/#service',
      name: 'Preparación de oposiciones de Educación Física (Primaria y Secundaria)',
      serviceType: 'Preparación de oposiciones de Educación Física',
      provider: { '@id': 'https://educoef.com/#organization' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Andalucía' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planes de preparación',
        itemListElement: this.plans.map(plan => ({
          '@type': 'Offer',
          name: plan.name,
          url: 'https://educoef.com/planes/',
          priceCurrency: 'EUR',
          price: plan.price,
          priceSpecification:
            plan.priceType === 'monthly'
              ? {
                  '@type': 'UnitPriceSpecification',
                  price: plan.price,
                  priceCurrency: 'EUR',
                  referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
                }
              : { '@type': 'PriceSpecification', price: plan.price, priceCurrency: 'EUR' },
        })),
      },
    };
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'plans-schema';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private injectFaqSchema(): void {
    if (this.document.getElementById('faq-schema')) return;
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
      features: [
        { text: 'Todo lo del Plan Materiales' },
        { text: 'Acceso a plataforma con clases en diferido' },
        { text: 'Tips para mejorar tu proceso de estudio' },
        { text: 'Acceso a foro para preguntas en comunidad' },
        { text: 'Organización del estudio de temas' },
        { text: 'Temas y criterios actualizados durante el año' },
        { text: 'Corrección de programación y situaciones de aprendizaje' },
        { text: 'Correcciones y exposiciones servicio aparte, según necesidad', extra: true },
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
      presencialFullStage: 'primaria',
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

  /** Orden de columnas: Plan Materiales, Plan Plus, Plan Premium */
  readonly comparisonRows: { label: string; included: [boolean, boolean, boolean] }[] = [
    { label: 'Temario completo', included: [true, true, true] },
    { label: 'Supuestos prácticos resueltos', included: [true, true, true] },
    { label: 'Resúmenes y esquemas de cada tema', included: [true, true, true] },
    { label: 'Plataforma con clases en diferido', included: [false, true, true] },
    { label: 'Foro de preguntas en comunidad', included: [false, true, true] },
    { label: 'Organización del estudio de los temas', included: [false, true, true] },
    { label: 'Temas y criterios actualizados durante el año', included: [false, true, true] },
    { label: 'Corrección de programación y situaciones de aprendizaje', included: [false, true, true] },
    { label: 'Simulacros de temas y supuestos prácticos', included: [false, false, true] },
    { label: 'Preparación y simulacro de la defensa oral', included: [false, false, true] },
    { label: 'Seguimiento personalizado', included: [false, false, true] },
    { label: 'Clases online en directo o presenciales en Córdoba', included: [false, false, true] },
  ];

  readonly includedItems: IncludedItem[] = [
    {
      icon: 'book',
      title: 'Temario Actualizado',
      description: 'Temario completo, revisado y actualizado con la normativa vigente de Primaria y Secundaria.',
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
      question: '¿Cuánto cuesta preparar las oposiciones de Educación Física con EDUCOEF?',
      answer:
        'Tenemos tres planes: el Plan Materiales cuesta 500 € en un único pago, el Plan Plus 100 € al mes y el Plan Premium 160 € al mes. Las correcciones y exposiciones del Plan Materiales y del Plan Plus se contratan aparte, según tus necesidades. Escríbenos y te ayudamos a elegir el plan que mejor encaja contigo.',
    },
    {
      question: '¿Qué diferencia hay entre los tres planes?',
      answer:
        'El Plan Materiales incluye el temario completo, los supuestos prácticos resueltos y los esquemas de cada tema. El Plan Plus añade la plataforma con clases en diferido, el foro de comunidad y la corrección de programación y situaciones de aprendizaje. El Plan Premium suma simulacros, preparación de la defensa oral, seguimiento personalizado y clases en directo online o presenciales en Córdoba.',
    },
    {
      question: '¿Puedo prepararme online o solo presencial?',
      answer:
        'Puedes hacerlo de las dos formas. La plataforma online está disponible para toda Andalucía y, con el Plan Premium, también ofrecemos clases en directo online o presenciales en nuestra sede de Calle Alonso El Sabio, 26, en Córdoba.',
    },
    {
      question: '¿Cuándo comienzan los cursos?',
      answer:
        'Ofrecemos incorporación continua, así que puedes empezar en cualquier momento del año. Adaptamos el plan a tu fecha de examen y a tu punto de partida, tanto si te presentas a Primaria como a Secundaria.',
    },
    {
      question: '¿Puedo cambiar de modalidad?',
      answer:
        'Sí, puedes cambiar entre modalidades en cualquier momento, por ejemplo de online a presencial en Córdoba si tu plan lo incluye. Escríbenos o llámanos y lo organizamos contigo.',
    },
    {
      question: '¿Hay facilidades de pago?',
      answer:
        'El Plan Materiales es un pago único de 500 € y los planes Plus y Premium se pagan mensualmente (100 € y 160 € al mes), sin necesidad de abonar toda la preparación de una vez. Si necesitas otra fórmula de pago, contáctanos y lo valoramos contigo.',
    },
    {
      question: '¿Las clases quedan grabadas?',
      answer:
        'Sí, todas las clases en directo quedan grabadas y disponibles en la plataforma durante tu período de matriculación, para que puedas verlas en diferido y repasarlas cuando quieras.',
    },
    {
      question: '¿Preparáis oposiciones de Primaria y de Secundaria?',
      answer:
        'Sí. Nuestros planes cubren tanto el Cuerpo de Maestros de Educación Primaria como el Cuerpo de Profesores de Educación Secundaria en la especialidad de Educación Física, con el temario actualizado de cada cuerpo. Nuestro equipo combina profesores universitarios, docentes en activo y miembros de tribunal.',
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
