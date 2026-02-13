import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Hero } from '../../shared/hero/hero';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-contact',
  imports: [Hero, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder);

  submitted = signal(false);

  contactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^(\+34)?[6-9]\d{8}$/)]],
    curso: [''],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly cursos: string[] = [
    'Curso Basico',
    'Curso Completo',
    'Curso Premium',
    'Otro',
  ];

  readonly contactInfo: ContactInfo[] = [
    {
      icon: 'phone',
      label: 'Telefono',
      value: '+34 612 345 678',
    },
    {
      icon: 'email',
      label: 'Correo electronico',
      value: 'info@academiaef.es',
    },
    {
      icon: 'address',
      label: 'Direccion',
      value: 'Calle de la Educacion 15, 28001 Madrid',
    },
    {
      icon: 'schedule',
      label: 'Horario',
      value: 'Lunes a Viernes: 9:00 - 20:00 / Sabados: 10:00 - 14:00',
    },
  ];

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      this.submitted.set(true);
      this.contactForm.reset();
    }
  }
}
