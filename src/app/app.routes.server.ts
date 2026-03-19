import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'nosotros', renderMode: RenderMode.Prerender },
  { path: 'planes', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  // Páginas legales: client-side (no aportan valor de ranking)
  { path: '**', renderMode: RenderMode.Client },
];
