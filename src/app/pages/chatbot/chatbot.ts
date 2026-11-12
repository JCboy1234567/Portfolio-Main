import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import {
  LucideMessageCircle,
  LucideX,
  LucideSend,
  LucideSparkles,
  LucideBot
} from '@lucide/angular';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  imports: [
    FormsModule,
    LucideMessageCircle,
    LucideX,
    LucideSend,
    LucideSparkles,
    LucideBot
  ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot {

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @ViewChild('messageList') private messageList?: ElementRef<HTMLDivElement>;

  isOpen = false;

  isReplyPending = false;

  userMessage = '';

  messages: ChatMessage[] = [
    {
      sender: 'bot',
      text: "Hi! I'm Jessie's portfolio assistant. 👋 I can tell you about Jessie, his skills, projects, services, and web development experience."
    }
  ];

  suggestedQuestions = [
    'Tell me about Jessie',
    'What are his skills?',
    'What projects has he built?',
    'What services does he offer?'
  ];

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  closeChat(): void {
    this.isOpen = false;
  }

  askQuestion(question: string): void {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || this.isReplyPending) return;

    this.messages.push({
      sender: 'user',
      text: trimmedQuestion
    });

    this.userMessage = '';
    this.isReplyPending = true;
    this.cdr.detectChanges();
    this.scrollMessagesToBottom();

    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: this.generateResponse(trimmedQuestion)
      });
      this.isReplyPending = false;
      this.cdr.detectChanges();
      this.scrollMessagesToBottom();
    }, 400);
  }

  sendMessage(): void {
    this.askQuestion(this.userMessage);
  }

  private scrollMessagesToBottom(): void {
    requestAnimationFrame(() => {
      const list = this.messageList?.nativeElement;
      list?.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
    });
  }

  private generateResponse(question: string): string {
    const q = question.toLowerCase().replace(/[^a-z0-9+# ]/g, ' ').replace(/\s+/g, ' ').trim();
    const has = (...terms: string[]) => terms.some((term) => q.includes(term));

    if (has('attendance', 'attendance management')) {
      return "The Attendance Management System is a web app for organizing scholars, batches, programs, and attendance. Its listed stack is Angular, Laravel, and MySQL. Open its project case study for the highlights.";
    }

    if (has('library', 'book management')) {
      return "The Library Management System includes student records, book create/read/update/delete features, search, and database integration. The listed tools are PHP, MySQL, and AJAX.";
    }

    if (has('sakaytantiya')) {
      return "Sakaytantiya is a web application project focused on transport management and commuting services. Its listed stack is Angular, Laravel, and MySQL.";
    }

    if (has('portfolio')) {
      return "Jessie's portfolio brings together his web development work, visual design, projects, services, and contact information. It was built with Angular, Tailwind CSS, and daisyUI.";
    }

    if (has('certificate', 'certification', 'tesda', 'nc iii', 'national certificate')) {
      return "Jessie has National Certificate III credentials in Web Development and Visual Graphic Design. You can view them in the Certifications section.";
    }

    if (has('where is jessie', 'where is he', 'location', 'based in')) {
      return "Jessie is based in Tagum City, Philippines.";
    }

    if (has('contact', 'hire', 'email', 'reach', 'availability', 'phone')) {
      return "You can use the Contact form or email Jessie at jessiegamulo1023@gmail.com. Share what you want to build, your goals, and any timeline you have in mind.";
    }

    if (has('price', 'pricing', 'cost', 'budget', 'rate', 'quote')) {
      return "There isn't a set price list in the portfolio. Send Jessie a short project brief through the Contact form and he can discuss the scope with you.";
    }

    if (has('service', 'services', 'offer', 'what can you do')) {
      return "Jessie offers web development, UI and visual design, and backend/database work. Use a service card's ‘Discuss this service’ link to start a message about what you need.";
    }

    if (has('project', 'projects', 'built')) {
      return "The portfolio features an Attendance Management System, a Library Management System, a Personal Portfolio, and Sakaytantiya. Each project card opens a case study with its overview, highlights, and tools.";
    }

    if (has('frontend', 'front end', 'angular', 'react', 'html', 'css', 'javascript')) {
      return "Jessie's frontend toolkit includes HTML, CSS, JavaScript, Angular, React, Tailwind CSS, and daisyUI. He uses these to build responsive and interactive interfaces.";
    }

    if (has('backend', 'back end', 'laravel', 'php', 'mysql', 'database', 'api')) {
      return "Jessie's backend toolkit includes PHP, Laravel, MySQL, and API-based applications. The portfolio projects show examples of database-driven features.";
    }

    if (has('design', 'graphic', 'visual', 'ui')) {
      return "Jessie works with UI, graphic, and visual design, with a focus on clear layouts, visual hierarchy, and responsive interfaces. He also holds a National Certificate III in Visual Graphic Design.";
    }

    if (has('skill', 'skills', 'technology', 'technologies', 'stack')) {
      return "Jessie's toolkit includes HTML, CSS, JavaScript, Angular, React, PHP, Laravel, MySQL, Tailwind CSS, daisyUI, Git, and GitHub, along with UI and visual design skills.";
    }

    if (has('experience', 'work experience', 'background', 'about jessie', 'who is jessie', 'tell me about jessie')) {
      return "Jessie is a web developer and visual graphic designer based in Tagum City, Philippines. His portfolio highlights hands-on web projects and National Certificate III credentials in Web Development and Visual Graphic Design.";
    }

    if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(q)) {
      return "Hi! 👋 Ask me about Jessie's projects, skills, certificates, services, or how to start a project inquiry.";
    }

    if (has('thank', 'thanks')) {
      return "You're welcome! 😊 If you're interested in working together, I can help you find the Contact section.";
    }

    return "I can answer questions using details from Jessie's portfolio. Try asking about a project by name, his skills or certificates, available services, pricing, or how to contact him.";
  }
}
