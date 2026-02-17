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
    { icon: 'phone', text: '+34 612 345 678' },
    { icon: 'email', text: 'info@academiaef.es' },
    { icon: 'address', text: 'Calle de la Educacion 15, Madrid' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
  ];
}
