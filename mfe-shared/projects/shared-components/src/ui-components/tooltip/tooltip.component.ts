import { CommonModule } from '@angular/common';
import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() tooltipText: string = 'Tooltip Text';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  isVisible = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isVisible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isVisible = false;
  }
}
