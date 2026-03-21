import { Component, signal, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../shared/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  imports: [RouterLink],
  templateUrl: './cookie-banner.html',
})
export class CookieBanner {
  private readonly consent = inject(CookieConsentService);

  visible = computed(() => !this.consent.consentGiven());
  showCustomize = signal(false);
  analyticsToggle = signal(true);

  acceptAll(): void {
    this.consent.acceptAll();
  }

  rejectAll(): void {
    this.consent.rejectNonEssential();
  }

  openCustomize(): void {
    this.showCustomize.set(true);
  }

  saveCustom(): void {
    this.consent.savePreferences({ necessary: true, analytics: this.analyticsToggle() });
  }
}
