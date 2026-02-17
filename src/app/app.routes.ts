import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Inicio - EDUCOEF',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'Sobre Nosotros - EDUCOEF',
  },
  {
    path: 'planes',
    loadComponent: () => import('./pages/plans/plans').then(m => m.Plans),
    title: 'Planes - EDUCOEF',
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
    title: 'Contacto - EDUCOEF',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
