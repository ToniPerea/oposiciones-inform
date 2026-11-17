import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'nosotros', renderMode: RenderMode.Prerender },
  { path: 'planes', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  // Páginas legales: prerenderizadas para que respondan 200 en acceso directo
  // (siguen con noindex y fuera del sitemap: no aportan valor de ranking)
  { path: 'aviso-legal', renderMode: RenderMode.Prerender },
  { path: 'politica-privacidad', renderMode: RenderMode.Prerender },
  { path: 'clausula-informativa', renderMode: RenderMode.Prerender },
  { path: 'politica-cookies', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
