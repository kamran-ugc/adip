import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './linear-progress.component.html',
  styleUrls: ['./linear-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  /**
   * The current progress value (0-100)
   */
  @Input() progress: number = 0;

  /**
   * Whether the progress bar is disabled
   */
  @Input() disabled: boolean = false;

  constructor() { }
}