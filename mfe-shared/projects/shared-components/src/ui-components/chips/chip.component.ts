import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() label: string = 'Text Label';
  @Input() variant: 'outlined' | 'filled' | 'selected' = 'outlined';
  @Input() themeClass: string = '';

  // Add this to apply the theme class to the host element
  @HostBinding('class') get hostClasses(): string {
    return this.themeClass;
  }

  get chipClasses(): string {
    return `chip-${this.variant}`;
  }
}
