import { Component } from '@angular/core';

interface TechIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-comming-soon-page',
  imports: [],
  templateUrl: './comming-soon-page.component.html',
  styleUrl: './comming-soon-page.component.scss'
})
export class CommingSoonPageComponent {
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
