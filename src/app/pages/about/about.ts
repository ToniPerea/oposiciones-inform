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
      description: 'Buscamos la maxima calidad en todo lo que hacemos.',
    },
    {
      title: 'Compromiso',
      description: 'Nos comprometemos con el exito de cada alumno.',
    },
    {
      title: 'Innovacion',
      description: 'Actualizamos constantemente nuestra metodologia.',
    },
  ];

  readonly steps: Step[] = [
    {
      number: 1,
      title: 'Diagnostico Inicial',
      description:
        'Evaluamos tu nivel de partida para personalizar tu plan de estudio.',
    },
    {
      number: 2,
      title: 'Plan Personalizado',
      description:
        'Disenamos un itinerario adaptado a tu disponibilidad y objetivos.',
    },
    {
      number: 3,
      title: 'Preparacion Integral',
      description:
        'Temario, casos practicos, programacion didactica y defensa oral.',
    },
    {
      number: 4,
      title: 'Simulacros y Seguimiento',
      description:
        'Examenes tipo y feedback continuo hasta el dia de la oposicion.',
    },
  ];

  readonly teamMembers: TeamMember[] = [
    {
      name: 'Javier Murillo Moraño',
      photo: 'assets/team/javier-murillo.jpeg',
      role: 'Profesor Digital',
      description:
        'Doctor y Graduado en CAFYD. Profesor Universitario en Eduación Física.',
    },
    {
      name: 'Laura Sanchez',
      initials: 'LS',
      role: 'Preparadora de Casos Practicos',
      description:
        'Licenciada en CAFYD y Maestra en Educacion Fisica. Especialista en supuestos practicos y programacion didactica.',
    },
    {
      name: 'Miguel Torres',
      initials: 'MT',
      role: 'Preparador de Temario',
      description:
        'Catedratico de Educacion Fisica. Autor de varios libros de referencia para la preparacion de oposiciones.',
    },
  ];
}
