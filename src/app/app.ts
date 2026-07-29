import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { CookieBanner } from './layout/cookie-banner/cookie-banner';
import { InstagramPopup } from './shared/instagram-popup/instagram-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CookieBanner, InstagramPopup],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
