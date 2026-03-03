import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import emailjs from '@emailjs/browser';
import { Hero } from '../../shared/hero/hero';
import { environment } from '../../../environments/environment';

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
  sending = signal(false);
  sendError = signal<string | null>(null);

  contactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^(\+34)?[6-9]\d{8}$/)]],
    curso: [''],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly plans: string[] = [
    'Plan Base',
    'Plan Total',
    'Otro',
  ];

  readonly contactInfo: ContactInfo[] = [
    {
      icon: 'phone',
      label: 'Teléfono',
      value: '+34 957 476 921',
    },
    {
      icon: 'email',
      label: 'Correo electrónico',
      value: 'info@educocenter.com',
    },
    {
      icon: 'address',
      label: 'Dirección',
      value: 'Calle Alonso El Sabio, 26, 14001 Córdoba',
    },
    {
      icon: 'schedule',
      label: 'Horario',
      value: 'Lunes a Viernes: 9:00 - 20:00 / Sábados: 10:00 - 14:00',
    },
  ];

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) return;

    this.sending.set(true);
    this.sendError.set(null);

    const { nombre, email, telefono, curso, mensaje } = this.contactForm.value;

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: nombre,
          from_email: email,
          phone: telefono || '—',
          plan: curso || '—',
          message: mensaje,
        },
        { publicKey: environment.emailjs.publicKey },
      );
      this.submitted.set(true);
      this.contactForm.reset();
    } catch {
      this.sendError.set('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por teléfono.');
    } finally {
      this.sending.set(false);
    }
  }
}
