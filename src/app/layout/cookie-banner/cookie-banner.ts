import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  templateUrl: './cookie-banner.html',
})
export class CookieBanner {
  private readonly platformId = inject(PLATFORM_ID);
  visible = signal(
    isPlatformBrowser(this.platformId) ? !localStorage.getItem('cookieConsent') : false
  );

  accept(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'true');
    }
    this.visible.set(false);
  }
}
