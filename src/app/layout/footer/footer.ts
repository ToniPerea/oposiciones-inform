import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

interface ContactItem {
  icon: string;
  text: string;
  href?: string;
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
  protected readonly googleReviewUrl = 'https://g.page/r/CZmNDjsV-Y6BEBM/review';

  protected readonly navLinks: NavLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Nosotros', path: '/nosotros' },
    { label: 'Planes', path: '/planes' },
    { label: 'Contacto', path: '/contacto' },
  ];

  protected readonly contactItems: ContactItem[] = [
    { icon: 'phone', text: '+34 652 249 669', href: 'tel:+34652249669' },
    { icon: 'email', text: 'info@educoef.com', href: 'mailto:info@educoef.com' },
    { icon: 'address', text: 'Calle Alonso El Sabio, 26, 14001 Córdoba, Andalucía' },
  ];

  protected readonly socialLinks: SocialLink[] = [
    { name: 'Instagram', url: 'https://www.instagram.com/educoef/' },
  ];
}
