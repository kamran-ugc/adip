import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-login-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-login-button.component.html',
  styleUrls: ['./social-login-button.component.scss']
})
export class SocialLoginButtonComponent {
  @Input() iconUrl!: string; // URL or path to the icon
  @Input() buttonText: string = 'Sign in';
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
