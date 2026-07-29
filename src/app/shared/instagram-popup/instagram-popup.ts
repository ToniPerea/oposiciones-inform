import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

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
  protected readonly visible = signal(false);

  constructor() {
    if (!isPlatformBrowser(this.platformId) || sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }
    setTimeout(() => this.visible.set(true), SHOW_DELAY_MS);
  }

  dismiss(): void {
    this.visible.set(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }
}
