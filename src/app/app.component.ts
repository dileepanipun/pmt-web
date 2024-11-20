import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface TechIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class AppComponent {
  techIcons: TechIcon[] = [
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
      alt: 'Angular'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      alt: 'TypeScript'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      alt: 'SCSS'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      alt: 'Node.js'
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg',
      alt: 'GitHub'
    }
  ];
}
