// step-progress-bar.component.ts
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.template.html',
  styleUrls: ['./progress-bar.styles.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepProgressBarComponent {
  @Input() stepNumber = 2;
  @Input() stepTitle = 'Application';
  @Input() progress = 0; // 0 to 100
  @Input() variant: 'pill' | 'circle' = 'pill';
  @Input() showPercentage = true;

  get progressBarClasses(): string[] {
    const classes = ['app-step-progress-bar'];

    // Add complete class for 100% progress
    if (this.progress === 100) {
      classes.push('app-step-progress-bar--100');
    }

    return classes;
  }

  get circleClasses(): string[] {
    const classes = ['app-step-progress-bar__circle'];

    if (this.progress === 0) {
      classes.push('app-step-progress-bar__circle--empty');
    } else if (this.progress === 100) {
      classes.push('app-step-progress-bar__circle--complete');
    } else if (this.progress > 0) {
      classes.push('app-step-progress-bar__circle--in-progress');
    }

    return classes;
  }
}