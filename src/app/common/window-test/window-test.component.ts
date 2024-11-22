import { Component, Input } from '@angular/core';
import { LucideAngularModule, X, Copy, Lock, Unlock, Settings } from 'lucide-angular';

@Component({
  selector: 'app-window-test',
  templateUrl: './window-test.component.html',
  styleUrls: ['./window-test.component.scss'],
  standalone: true,
  imports: [LucideAngularModule],
})
export class WindowTestComponent {
  @Input() symbol: string = '';

  CloseIcon = X;
  CopyIcon = Copy;
  LockIcon = Lock;
  UnlockIcon = Unlock;
  SettingsIcon = Settings;

  isLocked = false;

  readonly windowControlIconSize = 12;

  onDuplicate() {
    // Implement duplicate functionality
  }

  toggleLock() {
    this.isLocked = !this.isLocked;
    // Implement lock/unlock functionality
  }

  onSettings() {
    // Implement settings functionality
  }

  onClose(): void {
    // Close logic
  }
}
