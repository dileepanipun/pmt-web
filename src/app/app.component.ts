import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, File, Home, Menu, UserCheck } from 'lucide-angular';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LucideAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pmt-web';

  readonly FileIcon = File;
  readonly HomeIcon = Home;
  readonly MenuIcon = Menu;
  readonly UserCheckIcon = UserCheck;
}
