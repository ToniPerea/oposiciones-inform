import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieConsentService } from '../services/cookie-consent.service';

const STORAGE_KEY = 'educoef_instagram_popup_dismissed';
const SHOW_DELAY_MS = 1500;

@Component({
  selector: 'app-instagram-popup',
  imports: [],
  templateUrl: './instagram-popup.html',
})
export class InstagramPopup {
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly instagramUrl = 'https://www.instagram.com/educoef/';
  private readonly consent = inject(CookieConsentService);
  private readonly armed = signal(false);
  // No se muestra mientras el banner de cookies esté visible, para que no se solapen
  protected readonly visible = computed(() => this.armed() && this.consent.consentGiven());

  constructor() {
    if (!isPlatformBrowser(this.platformId) || sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }
    setTimeout(() => this.armed.set(true), SHOW_DELAY_MS);
  }

  dismiss(): void {
    this.armed.set(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }
}
