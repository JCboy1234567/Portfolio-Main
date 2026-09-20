import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  LucideMail,
  LucideCode2,
  LucideUserRound,
  LucideArrowRight,
  LucideDownload,
  LucideMenu,
  LucideX,
  LucideMoon,
  LucideSun,
  LucideMapPin,
  LucidePhone,
  LucideSend,
  LucideBriefcaseBusiness,
  LucideGraduationCap,
  LucidePalette,
  LucideDatabase,
  LucideGlobe,
  LucideSmartphone,
  LucideExternalLink
} from '@lucide/angular';

@Component({
  selector: 'app-home',

  imports: [
    RouterLink,
    RouterLinkActive,

    LucideMail,
    LucideCode2,
    LucideUserRound,
    LucideArrowRight,
    LucideDownload,
    LucideMenu,
    LucideX,
    LucideMoon,
    LucideSun,
    LucideMapPin,
    LucidePhone,
    LucideSend,
    LucideBriefcaseBusiness,
    LucideGraduationCap,
    LucidePalette,
    LucideDatabase,
    LucideGlobe,
    LucideSmartphone,
    LucideExternalLink
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {

  menuOpen = false;
  darkMode = false;

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
  }

  ngAfterViewInit(): void {
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  requestAnimationFrame(() => {
    const host = this.elementRef.nativeElement as HTMLElement;

    // Kunin ang pinaka-unang div sa loob ng component
    const root = host.firstElementChild as HTMLElement | null;

    if (!root) {
      return;
    }

    // IMPORTANT:
    // Ilagay ang animations-ready sa ROOT DIV,
    // hindi sa <app-home>
    root.classList.add('animations-ready');

    const elements = root.querySelectorAll(
      '.scroll-animate, .scroll-left, .scroll-right, .scroll-scale, .scroll-stagger'
    );

    const revealElements = () => {
      const viewportHeight = window.innerHeight;

      elements.forEach((element: Element) => {
        const rect = element.getBoundingClientRect();

        if (
          rect.top <= viewportHeight * 0.85 &&
          rect.bottom >= 0
        ) {
          element.classList.add('show');
        }
      });
    };

    // Initial animation para sa Hero
    revealElements();

    // Animation habang nag-scroll
    window.addEventListener('scroll', revealElements, {
      passive: true
    });
  });
}
}