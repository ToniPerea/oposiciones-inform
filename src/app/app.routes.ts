import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
  },
  {
    path: 'planes',
    loadComponent: () => import('./pages/plans/plans').then(m => m.Plans),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./pages/legal/aviso-legal/aviso-legal').then(m => m.AvisoLegal),
  },
  {
    path: 'politica-privacidad',
    loadComponent: () => import('./pages/legal/politica-privacidad/politica-privacidad').then(m => m.PoliticaPrivacidad),
  },
  {
    path: 'clausula-informativa',
    loadComponent: () => import('./pages/legal/clausula-informativa/clausula-informativa').then(m => m.ClausulaInformativa),
  },
  {
    path: 'politica-cookies',
    loadComponent: () => import('./pages/legal/politica-cookies/politica-cookies').then(m => m.PoliticaCookies),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
