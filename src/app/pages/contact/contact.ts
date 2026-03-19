import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import emailjs from '@emailjs/browser';
import { Hero } from '../../shared/hero/hero';
import { SeoService } from '../../shared/seo/seo';
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
  constructor() {
    inject(SeoService).set({
      title: 'Contacto | Academia Oposiciones Educación Física Córdoba | EDUCOEF',
      description: 'Contacta con EDUCOEF, academia de oposiciones de EF en Córdoba. Preparación presencial y online para toda Andalucía. Respuesta en menos de 24h.',
      canonical: 'https://educoef.com/contacto',
    });
  }

  private readonly platformId = inject(PLATFORM_ID);
  private fb = inject(FormBuilder);

  submitted = signal(false);
  sending = signal(false);
  sendError = signal<string | null>(null);
  rateLimitSeconds = signal(0);
  private rateLimitTimer: ReturnType<typeof setInterval> | null = null;

  contactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^(\+34)?[6-9]\d{8}$/)]],
    curso: [''],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
    website: [''], // honeypot — campo trampa para bots, nunca lo rellena un humano
  });

  readonly plans: string[] = [
    'Plan Materiales',
    'Plan Plus',
    'Plan Premium',
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
      value: 'info@educoef.com',
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

  private checkRateLimit(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const lastSent = localStorage.getItem('lastContactSent');
    if (!lastSent) return false;
    const elapsed = (Date.now() - parseInt(lastSent, 10)) / 1000;
    if (elapsed < 60) {
      const remaining = Math.ceil(60 - elapsed);
      this.rateLimitSeconds.set(remaining);
      if (this.rateLimitTimer) clearInterval(this.rateLimitTimer);
      this.rateLimitTimer = setInterval(() => {
        this.rateLimitSeconds.update(v => {
          if (v <= 1) {
            clearInterval(this.rateLimitTimer!);
            return 0;
          }
          return v - 1;
        });
      }, 1000);
      return true;
    }
    return false;
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) return;

    // Honeypot: si este campo tiene valor, es un bot — silenciar sin avisar
    if (this.contactForm.get('website')?.value) {
      this.submitted.set(true);
      return;
    }

    // Rate limiting: máximo 1 mensaje por minuto
    if (this.checkRateLimit()) return;

    this.sending.set(true);
    this.sendError.set(null);

    const { nombre, email, telefono, curso, mensaje } = this.contactForm.value;

    const params = {
      from_name: nombre,
      from_email: email,
      phone: telefono || '—',
      plan: curso || '—',
      message: mensaje,
    };
    const config = { publicKey: environment.emailjs.publicKey };

    try {
      await Promise.all([
        // Confirmation auto-reply to the user
        emailjs.send(environment.emailjs.serviceId, environment.emailjs.confirmationTemplateId, params, config),
        // Internal notification to the academy
        emailjs.send(environment.emailjs.serviceId, environment.emailjs.notificationTemplateId, params, config),
      ]);
      this.submitted.set(true);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('lastContactSent', Date.now().toString());
      }
      this.contactForm.reset();
    } catch {
      this.sendError.set('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por teléfono.');
    } finally {
      this.sending.set(false);
    }
  }
}
