import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

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
export class Plans {
  readonly openFaqIndex = signal<number | null>(null);

  readonly plans: Plan[] = [
    {
      name: 'Plan Materiales',
      price: '149',
      priceType: 'onetime',
      featured: false,
      badge: 'Autónomo',
      features: [
        { text: 'Temario completo (25 temas actualizados)' },
        { text: 'Clases grabadas disponibles en plataforma' },
        { text: 'Supuestos prácticos resueltos' },
        { text: 'Contenido actualizado durante el año de curso' },
        { text: 'Acceso a todas las actualizaciones del año' },
      ],
      discount: 'Exalumnos: 129 € (−20 €)',
      ctaText: 'Más Información',
      ctaLink: '/contacto',
    },
    {
      name: 'Plan Personalizado',
      price: '79',
      priceType: 'monthly',
      featured: true,
      badge: 'Personalizado',
      limitedSpots: true,
      features: [
        { text: 'Todo lo del Plan Materiales' },
        { text: 'Online en directo — toda Andalucía' },
        { text: 'Corrección de temas (servicio aparte, por uso)', extra: true },
        { text: 'Corrección de supuestos prácticos (servicio aparte, por uso)', extra: true },
      ],
      ctaText: 'Reservar plaza',
      ctaLink: '/contacto',
    },
    {
      name: 'Plan Premium',
      price: '150',
      priceType: 'monthly',
      featured: false,
      badge: 'Plazas Limitadas',
      limitedSpots: true,
      features: [
        { text: 'Clases online en directo — toda Andalucía' },
        { text: 'Clases presenciales — Córdoba capital' },
        { text: 'Correcciones incluidas en el precio' },
      ],
      discount: 'Exalumnos: 130 € (−20 €)',
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
      title: 'Seguimiento con IA',
      description: 'Informe personalizado generado por IA con tus notas y progreso hacia tus objetivos.',
    },
    {
      icon: 'ai',
      title: 'Asistente IA',
      description: 'Chatbot con los 25 temas integrados para resolver tus dudas al instante.',
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
