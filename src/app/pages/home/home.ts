import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

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
import { Chatbot } from '../chatbot/chatbot';

@Component({
  selector: 'app-home',

  imports: [
    Chatbot,
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
export class Home implements AfterViewInit, OnDestroy {

  menuOpen = false;

  darkMode = false;

  activeSection = 'home';

  mouseX = -300;
  mouseY= -300;

  private scrollHandler?: () => void;

  private animationObserver?: IntersectionObserver;


  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}


  /* ========================================
     MOBILE MENU
  ======================================== */

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }


  closeMenu(): void {
    this.menuOpen = false;
  }


  /* ========================================
     DARK MODE
  ======================================== */

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
  }


  /* ========================================
     SMOOTH SCROLL
  ======================================== */

  scrollToSection(
    sectionId: string,
    event?: Event
  ): void {

    if (event) {
      event.preventDefault();
    }

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }


    /*
      Immediately update active navigation
      when user clicks a navigation link.
    */
    this.activeSection = sectionId;


    /*
      Close mobile menu
    */
    this.closeMenu();


    /*
      Sticky header height
    */
    const header = document.querySelector('header');

    const headerHeight =
      header instanceof HTMLElement
        ? header.offsetHeight
        : 80;


    /*
      Position of section
    */
    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY;


    /*
      Scroll with header offset
    */
    const scrollPosition =
      sectionTop - headerHeight - 10;


    window.scrollTo({
      top: Math.max(scrollPosition, 0),
      behavior: 'smooth'
    });
  }


  /* ========================================
     AFTER VIEW INIT
  ======================================== */

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }


    /*
      Wait until Angular finishes rendering
    */
    requestAnimationFrame(() => {

      this.setupScrollAnimations();

      this.setupActiveSection();

    });

  }


  /* ========================================
     SCROLL ANIMATIONS
  ======================================== */

  private setupScrollAnimations(): void {

  const host =
    this.elementRef.nativeElement as HTMLElement;

  /*
    IMPORTANT:
    Ang animations-ready ay ilalagay sa
    pinaka-root element ng home component.
  */

  const root =
    host.firstElementChild as HTMLElement | null;

  if (!root) {
    return;
  }


  /*
    Enable scroll animations
  */

  root.classList.add('animations-ready');


  /*
    Get all animated elements
  */

  const elements =
    Array.from(
      root.querySelectorAll<HTMLElement>(
        '.scroll-animate, .scroll-left, .scroll-right, .scroll-scale, .scroll-stagger'
      )
    );


  if (!elements.length) {
    return;
  }


  /*
    Function that checks
    which elements are visible.
  */

  const revealElements = (): void => {

    const viewportHeight =
      window.innerHeight;


    elements.forEach((element) => {

      /*
        Already animated?
        No need to calculate again.
      */

      if (element.classList.contains('show')) {
        return;
      }


      const rect =
        element.getBoundingClientRect();


      /*
        Element becomes visible
        when it reaches around 85%
        of the viewport.
      */

      const triggerPoint =
        viewportHeight * 0.85;


      if (
        rect.top <= triggerPoint &&
        rect.bottom >= 0
      ) {

        element.classList.add('show');

      }

    });

  };


  /*
    Run once immediately
    for elements already visible.
  */

  requestAnimationFrame(() => {

    revealElements();

  });


  /*
    Scroll listener
  */

  this.scrollHandler = (): void => {

    requestAnimationFrame(() => {

      revealElements();

    });

  };


  window.addEventListener(
    'scroll',
    this.scrollHandler,
    {
      passive: true
    }
  );

}


  /* ========================================
     ACTIVE SECTION
  ======================================== */

  private setupActiveSection(): void {

    /*
      Get all portfolio sections
    */

    const sections =
      Array.from(
        document.querySelectorAll<HTMLElement>(
          '#home, #about, #skills, #projects, #services, #contact'
        )
      );


    if (!sections.length) {
      return;
    }


    /*
      Check immediately
    */

    this.updateActiveSection(sections);


    /*
      Listen to browser scrolling
    */

    this.scrollHandler = () => {

      this.updateActiveSection(
        sections
      );

    };


    window.addEventListener(
      'scroll',
      this.scrollHandler,
      {
        passive: true
      }
    );

  }


  /* ========================================
     DETERMINE ACTIVE SECTION
  ======================================== */

  private updateActiveSection(
    sections: HTMLElement[]
  ): void {

    /*
      Header height
    */

    const header =
      document.querySelector('header');

    const headerHeight =
      header instanceof HTMLElement
        ? header.offsetHeight
        : 80;


    /*
      Position where we consider
      a section "active"
    */

    const scrollPosition =
      window.scrollY +
      headerHeight +
      120;


    let currentSection =
      sections[0].id;


    /*
      Find the latest section
      that has already reached
      the active position.
    */

    for (const section of sections) {

      const sectionTop =
        section.offsetTop;


      if (
        scrollPosition >= sectionTop
      ) {

        currentSection =
          section.id;

      }

    }


    /*
      Update active nav
    */

    this.activeSection =
      currentSection;

  }


  /* ========================================
     CLEANUP
  ======================================== */

  ngOnDestroy(): void {

    if (
      this.scrollHandler &&
      isPlatformBrowser(this.platformId)
    ) {

      window.removeEventListener(
        'scroll',
        this.scrollHandler
      );

    }


    this.animationObserver?.disconnect();

  }

  onHeroMouseMove(event: MouseEvent): void {

  const hero =
    event.currentTarget as HTMLElement;

  const rect =
    hero.getBoundingClientRect();

  this.mouseX =
    event.clientX - rect.left;

  this.mouseY =
    event.clientY - rect.top;

}

}