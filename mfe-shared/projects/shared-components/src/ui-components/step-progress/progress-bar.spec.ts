// step-progress-bar.component.ts
import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Pill variant with bottom-starting progress -->
    <div *ngIf="variant === 'pill'" class="step-progress-bar" [ngClass]="{'complete': progress === 100}">
      <div class="step-progress-bar__content">
        <div class="step-progress-bar__row">
          <div>
            <span class="step-progress-bar__number">{{ stepNumber }}.</span>
            <span class="step-progress-bar__title">{{ stepTitle }}</span>
          </div>
          
          <div class="step-progress-bar__percentage-container">
            <span class="step-progress-bar__dot"></span>
            <span *ngIf="showPercentage" class="step-progress-bar__percentage">{{ progress }}%</span>
          </div>
        </div>
      </div>
      
      <!-- Border progress overlay -->
      <div class="progress-border-container">
        <div [class]="'progress-border progress-border--' + progress" *ngIf="progress === 0 || progress === 25 || progress === 50 || progress === 75 || progress === 100"></div>
        <div class="progress-border progress-border--custom" *ngIf="progress !== 0 && progress !== 25 && progress !== 50 && progress !== 75 && progress !== 100" [style.clip-path]="getClipPath()"></div>
      </div>
    </div>

    <!-- Circle variant -->
    <div *ngIf="variant === 'circle'" 
         class="step-progress-circle"
         [ngClass]="{'empty': progress === 0, 'in-progress': progress > 0 && progress < 100, 'complete': progress === 100}">
      {{ stepNumber }}
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin: 8px 0;
    }
    
    .step-progress-bar {
      position: relative;
      border-radius: 36px;
      background-color: #FFFFFF;
      border: 2px solid #E6F4E6;
      padding: 12px 24px;
      width: 100%;
      max-width: 280px;
      box-sizing: border-box;
      overflow: visible;
    }
    
    .step-progress-bar.complete {
      border-color: #008A00;
    }
    
    .step-progress-bar__content {
      position: relative;
      z-index: 2;
    }
    
    .step-progress-bar__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .step-progress-bar__number {
      font-size: 22px;
      font-weight: 500;
      color: #111827;
      margin-right: 4px;
    }
    
    .step-progress-bar__title {
      font-size: 22px;
      font-weight: 500;
      color: #111827;
    }
    
    .step-progress-bar__percentage-container {
      display: flex;
      align-items: center;
    }
    
    .step-progress-bar__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #CCCCCC;
      margin-right: 8px;
    }
    
    .step-progress-bar__percentage {
      font-size: 22px;
      font-weight: 600;
      color: #008A00;
    }
    
    /* Progress border container */
    .progress-border-container {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      pointer-events: none;
      border-radius: 36px;
      overflow: hidden;
    }
    
    /* Base border for progress */
    .progress-border {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #008A00;
      border-radius: 36px;
      box-sizing: border-box;
    }
    
    /* Progress states */
    .progress-border--0 {
      border-color: transparent;
    }
    
    .progress-border--25 {
      clip-path: polygon(0 100%, 0 75%, 25% 0, 0 0, 0 100%);
    }
    
    .progress-border--50 {
      clip-path: polygon(0 100%, 0 0, 50% 0, 0 100%);
    }
    
    .progress-border--75 {
      clip-path: polygon(0 100%, 0 0, 75% 0, 75% 100%, 0 100%);
    }
    
    .progress-border--100 {
      border-color: #008A00;
    }
    
    .progress-border--custom {
      border-color: #008A00;
    }
    
    /* Circle variant */
    .step-progress-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 8px auto;
      font-weight: 500;
      font-size: 16px;
      background-color: #FFFFFF;
      border: 2px solid #CCCCCC;
      color: #666666;
    }
    
    .step-progress-circle.in-progress {
      border-color: #008A00;
      color: #008A00;
    }
    
    .step-progress-circle.complete {
      background-color: #008A00;
      border-color: #008A00;
      color: #FFFFFF;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class StepProgressBarComponent implements OnChanges {
  @Input() stepNumber = 2;
  @Input() stepTitle = 'Application';
  @Input() progress = 0; // 0 to 100
  @Input() variant: 'pill' | 'circle' = 'pill';
  @Input() showPercentage = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['progress']) {
      // Ensure progress is between 0 and 100
      this.progress = Math.max(0, Math.min(100, this.progress));
    }
  }

  // Generate clip-path for custom progress percentages
  getClipPath(): string {
    if (this.progress <= 25) {
      // First quarter - left side bottom to top
      const heightPercentage = this.progress * 4; // 0-25% maps to 0-100% height
      return `polygon(0 100%, 0 ${100 - heightPercentage}%, ${this.progress}% 0, 0 0, 0 100%)`;
    } else if (this.progress <= 50) {
      // Second quarter - top left to right
      const widthPercentage = this.progress - 25; // 25-50% maps to 0-25% width
      return `polygon(0 100%, 0 0, ${this.progress}% 0, 0 100%)`;
    } else if (this.progress <= 75) {
      // Third quarter - top right to bottom
      const heightPercentage = (this.progress - 50) * 4; // 50-75% maps to 0-100% height
      return `polygon(0 100%, 0 0, ${this.progress}% 0, ${this.progress}% ${heightPercentage}%, 0 100%)`;
    } else {
      // Fourth quarter - bottom right to left
      const widthPercentage = this.progress - 75; // 75-100% maps to 0-25% width
      return `polygon(0 100%, 0 0, 100% 0, 100% 100%, ${100 - widthPercentage}% 100%, 0 100%)`;
    }
  }
}