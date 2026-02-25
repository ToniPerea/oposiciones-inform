import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { ScrollAnimate } from '../../shared/scroll-animate/scroll-animate';

interface Value {
  title: string;
  description: string;
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  initials?: string;
  photo?: string;
  role: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [Hero, ScrollAnimate],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly values: Value[] = [
    {
      title: 'Excelencia',
      description: 'Buscamos la máxima calidad en todo lo que hacemos.',
    },
    {
      title: 'Compromiso',
      description: 'Nos comprometemos con el éxito de cada alumno.',
    },
    {
      title: 'Innovación',
      description: 'Actualizamos constantemente nuestra metodología.',
    },
  ];

  readonly steps: Step[] = [
    {
      number: 1,
      title: 'Diagnóstico Inicial',
      description:
        'Evaluamos tu nivel de partida para personalizar tu plan de estudio.',
    },
    {
      number: 2,
      title: 'Plan Personalizado',
      description:
        'Diseñamos un itinerario adaptado a tu disponibilidad y objetivos.',
    },
    {
      number: 3,
      title: 'Preparación Integral',
      description:
        'Temario, supuestos prácticos, programación didáctica y defensa oral.',
    },
    {
      number: 4,
      title: 'Simulacros y Seguimiento',
      description:
        'Exámenes tipo y feedback continuo hasta el día de la oposición.',
    },
  ];

  readonly teamMembers: TeamMember[] = [
    {
      name: 'Javier Murillo Moraño',
      photo: 'assets/team/javier-murillo.jpeg',
      role: 'Profesor Universitario',
      description: 'Doctor y Graduado en CAFYD. Profesor Universitario en Educación Física.',
    },
    {
      name: 'Juan de Dios Benítez Sillero',
      initials: 'JB',
      role: 'Profesor Universitario',
      description: 'Antiguo Docente funcionario de la Junta de Andalucía con amplia trayectoria en la preparación de oposiciones.',
    },
    {
      name: 'Álvaro Morente Montero',
      initials: 'AM',
      role: 'Profesor Universitario',
      description: 'Profesor Universitario con más de 30 años en la docencia.',
    },
    {
      name: 'Fran Plata',
      initials: 'FP',
      role: 'Profesor funcionario en activo',
      description: 'Profesor funcionario en activo en Educación Primaria.',
    },
  ];
}
