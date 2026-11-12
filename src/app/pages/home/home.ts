import {
  AfterViewInit,
  ChangeDetectorRef,
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
  LucideExternalLink,
  LucideCheckCircle2
} from '@lucide/angular';
import { Chatbot } from '../chatbot/chatbot';

interface BlogPost {
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  body: string[];
  accent: string;
  image?: string;
  imageAlt?: string;
}

interface ProjectCaseStudy {
  title: string;
  overview: string;
  highlights: string[];
  stack: string[];
}

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
    LucideExternalLink,
    LucideCheckCircle2
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

  isSubmitting = false;
  showSuccessModal = false;

  readonly coreStack = [
    { name: 'Angular', icon: 'angular' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'PHP', icon: 'php' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'HTML', icon: 'html5' },
    { name: 'CSS', icon: 'css3' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'Java', icon: 'java' },
    { name: 'Postman', icon: 'postman' },
    { name: 'Figma', icon: 'figma' }
  ];

  selectedBlogPost: BlogPost | null = null;

  selectedProjectCaseStudy: ProjectCaseStudy | null = null;

  inquiryMessage = '';

  readonly projectCaseStudies: ProjectCaseStudy[] = [
    {
      title: 'Attendance Management System',
      overview: 'A web application for organizing scholars, batches, programs, and attendance records.',
      highlights: ['Scholar and batch organization', 'Program records', 'Attendance management'],
      stack: ['Angular', 'Laravel', 'MySQL']
    },
    {
      title: 'Library Management System',
      overview: 'A library tool for managing student records and books, with search and database integration.',
      highlights: ['Student records', 'Book create, read, update, and delete flows', 'Search'],
      stack: ['PHP', 'MySQL', 'AJAX']
    },
    {
      title: 'Personal Portfolio',
      overview: 'A responsive portfolio that brings together my development work, visual design, and projects.',
      highlights: ['Skills and project showcase', 'Responsive page sections', 'Contact and service information'],
      stack: ['Angular', 'Tailwind CSS', 'daisyUI']
    },
    {
      title: 'Sakaytantiya',
      overview: 'A web application concept for transport management and commuting services.',
      highlights: ['Transport management focus', 'Commuting service concept'],
      stack: ['Angular', 'Laravel', 'MySQL']
    }
  ];

  readonly blogPosts: BlogPost[] = [
    {
      category: 'Web Development',
      date: 'Learning notes',
      readTime: '4 min read',
      title: 'What I learned building with Angular',
      excerpt: 'A few lessons from turning a growing set of ideas into a component based portfolio.',
      body: [
        'Building a portfolio is a useful way to practice the full frontend workflow: planning a page, composing reusable sections, and making the result work across screen sizes.',
        'I am learning to keep each section focused, use clear names for UI state, and check how the page behaves on smaller screens as I build.',
        'This is an evolving learning note. I will add more detailed writeups as I document projects and the decisions behind them.'
      ],
      accent: 'blog-art-angular',
      image: '/images/blog1.png',
      imageAlt: 'Web development article cover'
    },
    {
      category: 'Project Journal',
      date: 'Learning milestone',
      readTime: '2 min read',
      title: 'A milestone in my learning journey: National Certificates',
      excerpt: 'Reflecting on earning NC III certificates in Web Development and Visual Graphic Design.',
      body: [
        'Earning my National Certificates in Web Development NC III and Visual Graphic Design NC III is an important milestone in my journey. They represent the time I have spent learning how to build for the web and communicate ideas through visual design.',
        'My Web Development training strengthened my understanding of creating web applications and working with web technologies. Visual Graphic Design helped me practice composition, digital design, and creating graphics for different projects.',
        'I’m proud of how far I’ve come, and I’m looking forward to applying these skills in more projects while continuing to learn.'
      ],
      accent: 'blog-art-planning',
      image: '/images/blog2.jpg',
      imageAlt: 'National Certificates project journal cover'
    },
    {
      category: 'Design',
      date: 'Design notes',
      readTime: '3 min read',
      title: 'Small details that make a page feel polished',
      excerpt: 'Spacing, contrast, and responsive checks can make a bigger difference than extra effects.',
      body: [
        'A page feels easier to use when its spacing is consistent and its headings make the content easy to scan. I try to establish a small set of sizes and colors before adding decoration.',
        'I also check contrast and tap targets, then resize the browser to see whether the layout still reads naturally on a phone.',
        'Polish comes from the way these small choices work together, not from adding motion everywhere.'
      ],
      accent: 'blog-art-design',
      image: '/images/blog3.png',
      imageAlt: 'Design article cover'
    }
  ];

  private animationScrollHandler?: () => void;
  private activeSectionScrollHandler?: () => void;

  private animationObserver?: IntersectionObserver;


  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
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

      } else {

        element.classList.remove('show');

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

  this.animationScrollHandler = (): void => {

    requestAnimationFrame(() => {

      revealElements();

    });

  };


  window.addEventListener(
    'scroll',
    this.animationScrollHandler,
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
          '#home, #about, #skills, #projects, #blog, #services, #contact'
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

    this.activeSectionScrollHandler = () => {

      this.updateActiveSection(
        sections
      );

    };


    window.addEventListener(
      'scroll',
      this.activeSectionScrollHandler,
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
        section.getBoundingClientRect().top + window.scrollY;


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

    if (isPlatformBrowser(this.platformId)) {
      if (this.animationScrollHandler) {
        window.removeEventListener('scroll', this.animationScrollHandler);
      }

      if (this.activeSectionScrollHandler) {
        window.removeEventListener('scroll', this.activeSectionScrollHandler);
      }
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

  hideBrokenTechIcon(event: Event): void {
    (event.currentTarget as HTMLImageElement).hidden = true;
  }

  /* ========================================
     CONTACT FORM SUBMISSION
  ======================================== */

  submitContactForm(event: Event): void {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Show success modal & reset immediately
    this.isSubmitting = false;
    this.showSuccessModal = true;
    this.cdr.detectChanges();

    // Fire email submission in background without blocking UI
    fetch('https://formsubmit.co/ajax/jessiegamulo1023@gmail.com', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    }).catch((err) => console.log('Email delivery background info:', err));

    form.reset();
    this.inquiryMessage = '';
    this.cdr.detectChanges();
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  openBlogPost(post: BlogPost): void {
    this.selectedBlogPost = post;
  }

  closeBlogPost(): void {
    this.selectedBlogPost = null;
  }

  openProjectCaseStudy(project: ProjectCaseStudy): void {
    this.selectedProjectCaseStudy = project;
  }

  closeProjectCaseStudy(): void {
    this.selectedProjectCaseStudy = null;
  }

  startProjectInquiry(projectName: string, event: Event): void {
    this.closeProjectCaseStudy();
    this.inquiryMessage = `Hi Jessie, I'd like to discuss ${projectName}. Here's what I have in mind: `;
    this.scrollToSection('contact', event);
  }

  startServiceInquiry(serviceName: string, event: Event): void {
    this.inquiryMessage = `Hi Jessie, I'm interested in your ${serviceName} service. Here's what I need: `;
    this.scrollToSection('contact', event);
  }

  updateInquiryMessage(event: Event): void {
    this.inquiryMessage = (event.target as HTMLTextAreaElement).value;
  }

}
