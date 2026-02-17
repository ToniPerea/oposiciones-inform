import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';

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
  imports: [Hero],
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
        'Temario, casos prácticos, programación didáctica y defensa oral.',
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
      role: 'Profesor Digital',
      description:
        'Doctor y Graduado en CAFYD. Profesor Universitario en Educación Física.',
    },
    {
      name: 'Laura Sánchez',
      initials: 'LS',
      role: 'Preparadora de Casos Prácticos',
      description:
        'Licenciada en CAFYD y Maestra en Educación Física. Especialista en supuestos prácticos y programación didáctica.',
    },
    {
      name: 'Miguel Torres',
      initials: 'MT',
      role: 'Preparador de Temario',
      description:
        'Catedrático de Educación Física. Autor de varios libros de referencia para la preparación de oposiciones.',
    },
  ];
}
