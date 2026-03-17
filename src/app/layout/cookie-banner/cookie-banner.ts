import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  templateUrl: './cookie-banner.html',
})
export class CookieBanner {
  visible = signal(!localStorage.getItem('cookieConsent'));

  accept(): void {
    localStorage.setItem('cookieConsent', 'true');
    this.visible.set(false);
  }
}
