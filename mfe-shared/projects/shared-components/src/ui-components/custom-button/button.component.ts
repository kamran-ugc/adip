// button.component.ts
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'underlined' | 'icon';
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled' | 'error';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() state: ButtonState = 'default';
  @Input() disabled = false;
  @Input() error = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Input() iconOnly = false;
  @Input() prefixIcon?: string;
  @Input() postfixIcon?: string;
  @Input() fullWidth = false;
  @Input() iconSize = 20;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get computedClasses(): string {
    const classes = ['app-button'];

    // Add variant class
    classes.push(`app-button--${this.variant}`);

    // Add state class
    if (this.disabled) {
      classes.push('app-button--disabled');
    } else if (this.error) {
      classes.push('app-button--error');
    } else if (this.state !== 'default') {
      classes.push(`app-button--${this.state}`);
    }

    // Add icon-only class
    if (this.iconOnly) {
      classes.push('app-button--icon-only');
    }

    // Add full-width class
    if (this.fullWidth) {
      classes.push('app-button--full-width');
    }

    // Add icon presence classes
    if (this.prefixIcon) {
      classes.push('app-button--has-prefix');
    }
    if (this.postfixIcon) {
      classes.push('app-button--has-postfix');
    }

    return classes.join(' ');
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}