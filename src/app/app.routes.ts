import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Inicio - Academia Oposiciones EF',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'Sobre Nosotros - Academia Oposiciones EF',
  },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/courses/courses').then(m => m.Courses),
    title: 'Cursos - Academia Oposiciones EF',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    title: 'Contacto - Academia Oposiciones EF',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
