import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

interface ContactItem {
  icon: string;
  text: string;
}

interface SocialLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly navLinks: NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Nosotros', path: '/nosotros' },
    { label: 'Planes', path: '/planes' },
    { label: 'Contacto', path: '/contacto' },
  ];

  protected readonly contactItems: ContactItem[] = [
    { icon: 'phone', text: '+34 957 476 921' },
    { icon: 'email', text: 'info@educoef.com' },
    { icon: 'address', text: 'Calle Alonso El Sabio, 26, Córdoba, Andalucía' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
  ];
}
