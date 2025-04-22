import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CircularLoaderState = 'in-progress' | 'completed' | 'inactive';

@Component({
  selector: 'app-circular-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circular-loader.component.html',
  styleUrls: ['./circular-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularLoaderComponent {
  /**
   * Progress value from 0 to 100
   */
  @Input() progress: number = 0;

  /**
   * The state of the loader
   * - 'in-progress' - Shows a partially filled circle based on progress
   * - 'completed' - Shows a fully filled green circle 
   * - 'inactive' - Shows an empty gray circle
   */
  @Input() state: CircularLoaderState = 'in-progress';

  /**
   * Text to display in the center of the loader
   */
  @Input() label: string | number = '';

  /**
   * Size of the loader in pixels
   */
  @Input() size: number = 60;

  /**
   * Stroke width of the circle
   */
  @Input() strokeWidth: number = 3;

  /**
   * Calculate the circle's radius
   */
  get radius(): number {
    return (this.size / 2) - (this.strokeWidth / 2);
  }

  /**
   * Calculate the circle's circumference
   */
  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  /**
   * Calculate the stroke dash offset based on progress
   */
  get strokeDashOffset(): number {
    return this.circumference - (this.progress / 100) * this.circumference;
  }
}
