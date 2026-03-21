import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
}

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'cookieConsent';

  readonly consentGiven = signal(false);
  readonly analyticsEnabled = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromStorage();
    }
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const prefs: CookiePreferences = JSON.parse(stored);
        this.consentGiven.set(true);
        this.analyticsEnabled.set(prefs.analytics ?? false);
        if (prefs.analytics) {
          this.loadGA4();
        }
      } catch {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }

  acceptAll(): void {
    this.savePreferences({ necessary: true, analytics: true });
  }

  rejectNonEssential(): void {
    this.savePreferences({ necessary: true, analytics: false });
  }

  savePreferences(prefs: CookiePreferences): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
    }
    this.consentGiven.set(true);
    this.analyticsEnabled.set(prefs.analytics);
    if (prefs.analytics) {
      this.loadGA4();
    }
  }

  loadGA4(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (document.getElementById('ga4-script')) return;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      (window as any).dataLayer.push(arguments);
    };
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', 'G-M341BPDKFR');

    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-M341BPDKFR';
    document.head.appendChild(script);
  }
}
