import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  host: {
    class: 'block sticky top-0 z-50',
  },
})
export class Navbar {
  protected readonly mobileMenuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Nosotros', path: '/nosotros' },
    { label: 'Cursos', path: '/cursos' },
    { label: 'Contacto', path: '/contacto' },
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.scrolled.set(window.scrollY > 10);
      });
    }
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
