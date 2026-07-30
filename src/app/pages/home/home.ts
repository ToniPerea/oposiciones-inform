import { Component, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';
import { SeoService } from '../../shared/seo/seo';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Review {
  name: string;
  initials: string;
  rating: number;
  timeAgo: string;
  text: string;
}


@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink, ScrollAnimate],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor() {
    inject(SeoService).set({
      title: 'Oposiciones Educación Física Primaria y Secundaria | EDUCOEF Córdoba',
      description: 'Academia de oposiciones de EF en Andalucía, para Primaria y Secundaria. Preparación presencial en Córdoba y online. Más de 15 años formando profesores.',
      canonical: 'https://educoef.com/',
    });

    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        const intervalId = setInterval(() => {
          if (!this.isAutoplayPaused()) {
            this.nextReview();
          }
        }, this.autoplayIntervalMs);
        inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
      }
    }
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
        'Atención personalizada con grupos de máximo 22 alumnos por clase.',
    },
    {
      icon: 'trophy',
      title: 'Alto Porcentaje de Aprobados',
      description:
        'Un alto porcentaje de nuestros alumnos superan la oposición cada convocatoria.',
    },
  ];

  readonly stats: Stat[] = [
    { value: '+200', label: 'Alumnos Formados' },
    { value: '+15', label: 'Años de Experiencia' },
    { value: '98%', label: 'Alumnos Satisfechos' },
  ];

  readonly googleReviewUrl = 'https://g.page/r/CZmNDjsV-Y6BEBM/review';

  readonly reviews: Review[] = [
    {
      name: 'José Antonio Luque',
      initials: 'JA',
      rating: 5,
      timeAgo: 'Hace 3 meses',
      text: 'Totalmente recomendable si estás pensando prepararte las oposiciones de Educación Física. Un temario muy completo y actualizado, gran cercanía por parte de todo el equipo de profesionales, seguimiento continuo de la programación y unidades didácticas, preparación de supuestos prácticos y defensas orales y actualización de todos los cambios de normativa presentes en cada oposición.',
    },
    {
      name: 'Miguel Jiménez Osuna',
      initials: 'MJ',
      rating: 5,
      timeAgo: 'Hace 3 meses',
      text: 'Me llamo Miguel Ángel Jiménez Osuna y saqué mi plaza en 2022. Quiero agradecer a la academia por el gran apoyo que me dió durante la preparación de las oposiciones de Magisterio. Gracias a su organización, el material tan completo y el acompañamiento constante, he conseguido aprobar a la primera. Destaco especialmente la cercanía y profesionalidad del equipo (Juande, Álvaro y Fran) siempre dispuestos a resolver dudas y a motivarnos en los momentos más difíciles. Sin duda, ha sido una experiencia muy positiva y recomiendo esta academia a cualquiera que quiera preparar las oposiciones de Educación Física con garantías.',
    },
    {
      name: 'Laura Piedra Baena',
      initials: 'LP',
      rating: 5,
      timeAgo: 'Hace 2 meses',
      text: 'Soy Laura y me saqué la plaza en 2024. Desde el primer momento confié en ellos para ese proceso. Temarios completos y actualizados, normativa vigente, material extra para que puedas ampliar conocimiento y contenidos, resolución de supuestos prácticos semanales, programación individualizada y preparación y exposición del oral semanalmente. Hacen un gran trabajo para atender las necesidades de cada uno/a: correcciones de supuestos, revisión de programaciones, explicaciones... mostrando siempre profesionalidad, cercanía y disponibilidad en cualquier momento del día, posibilitando que llegues a la oposición lo mejor preparado/a posible, con confianza y seguridad.',
    },
    {
      name: 'Antonio José Hidalgo',
      initials: 'AJ',
      rating: 5,
      timeAgo: 'Hace 13 horas',
      text: 'Como preparación de las oposiciones acabe encantado con la labor de Moises y Juan De Dios. Atención personalizada y cercana, consiguiendo que la relación vaya más allá del ámbito profesional. Siempre aportando consejos claros y directos para alcanzar el objetivo de la plaza en la preparación de las oposiciones de EF de Secundaria. El estudio y esfuerzo diario acompañado de personas con experiencia en este ámbito ha sido clave para alcanzar los objetivos. Muy recomendable.',
    },
  ];

  readonly activeReviewIndex = signal(0);
  readonly isReviewExpanded = signal(false);
  readonly isAutoplayPaused = signal(false);
  private readonly autoplayIntervalMs = 7000;
  private touchStartX = 0;

  readonly averageRating =
    this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length;

  nextReview(): void {
    this.activeReviewIndex.update((i) => (i + 1) % this.reviews.length);
    this.isReviewExpanded.set(false);
  }

  prevReview(): void {
    this.activeReviewIndex.update((i) => (i - 1 + this.reviews.length) % this.reviews.length);
    this.isReviewExpanded.set(false);
  }

  goToReview(index: number): void {
    this.activeReviewIndex.set(index);
    this.isReviewExpanded.set(false);
  }

  toggleReviewExpanded(): void {
    this.isReviewExpanded.update((expanded) => !expanded);
  }

  pauseAutoplay(): void {
    this.isAutoplayPaused.set(true);
  }

  resumeAutoplay(): void {
    this.isAutoplayPaused.set(false);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.pauseAutoplay();
  }

  onTouchEnd(event: TouchEvent): void {
    const swipeThreshold = 50;
    const deltaX = event.changedTouches[0].clientX - this.touchStartX;
    if (deltaX > swipeThreshold) {
      this.prevReview();
    } else if (deltaX < -swipeThreshold) {
      this.nextReview();
    }
  }
}
