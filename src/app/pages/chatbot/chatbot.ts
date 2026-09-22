import { Component } from '@angular/core';

import {
  LucideMessageCircle,
  LucideX,
  LucideSend,
  LucideSparkles,
  LucideUserRound,
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
    LucideUserRound,
    LucideBot
  ],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot {

  isOpen = false;

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

    if (!trimmedQuestion) return;

    this.messages.push({
      sender: 'user',
      text: trimmedQuestion
    });

    this.userMessage = '';

    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: this.generateResponse(trimmedQuestion)
      });
    }, 400);
  }

  sendMessage(): void {
    this.askQuestion(this.userMessage);
  }

  private generateResponse(question: string): string {

    const q = question.toLowerCase();

    if (
      q.includes('about jessie') ||
      q.includes('who is jessie') ||
      q.includes('tell me about jessie') ||
      q.includes('your developer')
    ) {
      return "Jessie is a web developer focused on building modern, responsive, and user-friendly web applications. He works with technologies such as Angular, Laravel, PHP, MySQL, JavaScript, and Tailwind CSS.";
    }

    if (
      q.includes('skill') ||
      q.includes('technology') ||
      q.includes('technologies') ||
      q.includes('stack')
    ) {
      return "Jessie's current technology stack includes HTML, CSS, JavaScript, Angular, React, PHP, Laravel, MySQL, Tailwind CSS, daisyUI, Git, and GitHub. He also has skills in UI, graphic, and visual design.";
    }

    if (
      q.includes('project') ||
      q.includes('projects') ||
      q.includes('built')
    ) {
      return "Jessie has worked on web development projects involving Angular, Laravel, PHP, MySQL, responsive interfaces, dashboards, and management systems. You can explore the Projects section of this portfolio to see his work.";
    }

    if (
      q.includes('service') ||
      q.includes('services') ||
      q.includes('offer')
    ) {
      return "Jessie can work on responsive web development, frontend interfaces, backend development, database-driven applications, UI design, and graphic design.";
    }

    if (
      q.includes('frontend') ||
      q.includes('front end')
    ) {
      return "For frontend development, Jessie works with HTML, CSS, JavaScript, Angular, React, Tailwind CSS, and daisyUI to create responsive and interactive interfaces.";
    }

    if (
      q.includes('backend') ||
      q.includes('back end')
    ) {
      return "For backend development, Jessie works with PHP, Laravel, MySQL, and API-based applications.";
    }

    if (
      q.includes('design') ||
      q.includes('graphic') ||
      q.includes('ui')
    ) {
      return "Jessie also has experience in UI Design, Graphic Design, Visual Design, and creating clean layouts for digital interfaces.";
    }

    if (
      q.includes('contact') ||
      q.includes('hire') ||
      q.includes('email') ||
      q.includes('reach')
    ) {
      return "You can contact Jessie through the Contact section of this portfolio. Feel free to send a message about a project, collaboration, or freelance opportunity.";
    }

    if (
      q.includes('angular')
    ) {
      return "Angular is one of Jessie's current frontend technologies. He uses it to build structured, responsive, and interactive web applications.";
    }

    if (
      q.includes('laravel')
    ) {
      return "Laravel is part of Jessie's backend stack. He uses it together with PHP and MySQL when building database-driven web applications and APIs.";
    }

    if (
      q.includes('php')
    ) {
      return "Jessie uses PHP for backend development, particularly together with Laravel and MySQL.";
    }

    if (
      q.includes('mysql') ||
      q.includes('database')
    ) {
      return "Jessie uses MySQL for storing and managing application data in database-driven projects.";
    }

    if (
      q.includes('tailwind') ||
      q.includes('daisyui')
    ) {
      return "Jessie uses Tailwind CSS and daisyUI to create clean, responsive, and modern user interfaces while keeping the styling efficient and consistent.";
    }

    if (
      q.includes('hello') ||
      q.includes('hi') ||
      q.includes('hey')
    ) {
      return "Hello! 👋 Nice to meet you. I'm Jessie's portfolio assistant. You can ask me about his skills, projects, services, or experience.";
    }

    if (
      q.includes('thank')
    ) {
      return "You're welcome! 😊 If you'd like to know more about Jessie, feel free to ask another question.";
    }

    return "I can help you learn more about Jessie. Try asking about his skills, projects, services, frontend development, backend development, design experience, or how to contact him.";
  }
}