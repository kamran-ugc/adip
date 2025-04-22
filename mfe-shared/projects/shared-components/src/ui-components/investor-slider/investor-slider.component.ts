import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'investor-slider',
  standalone: true,
  templateUrl: './investor-slider.component.html',
  styleUrls: ['./investor-slider.component.scss'],
})
export class InvestorSliderComponent {
  @Input() title: string = 'Investor Type';
  @Input() description: string = 'Description here';
  @Input() value: number = 25; // Default value
  @Output() valueChange = new EventEmitter<number>();

  // Adjust slider value
  increment() {
    if (this.value < 100) {
      this.value += 5;
      this.valueChange.emit(this.value);
    }
  }

  decrement() {
    if (this.value > 0) {
      this.value -= 5;
      this.valueChange.emit(this.value);
    }
  }
}
