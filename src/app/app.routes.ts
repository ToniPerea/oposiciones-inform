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
    path: 'aviso-legal',
    loadComponent: () => import('./pages/legal/aviso-legal/aviso-legal').then(m => m.AvisoLegal),
    title: 'Aviso Legal - EDUCOEF',
  },
  {
    path: 'politica-privacidad',
    loadComponent: () => import('./pages/legal/politica-privacidad/politica-privacidad').then(m => m.PoliticaPrivacidad),
    title: 'Política de Privacidad - EDUCOEF',
  },
  {
    path: 'clausula-informativa',
    loadComponent: () => import('./pages/legal/clausula-informativa/clausula-informativa').then(m => m.ClausulaInformativa),
    title: 'Cláusula Informativa - EDUCOEF',
  },
  {
    path: 'politica-cookies',
    loadComponent: () => import('./pages/legal/politica-cookies/politica-cookies').then(m => m.PoliticaCookies),
    title: 'Política de Cookies — EDUCOEF',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
