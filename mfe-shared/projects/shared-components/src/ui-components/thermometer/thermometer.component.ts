import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ThermometerOption {
  id: string;
  title: string;
  description: string;
  value: number;
}

@Component({
  selector: 'app-thermometer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThermometerComponent {
  /**
   * List of options to display in the thermometer
   */
  @Input() options: ThermometerOption[] = [];
  
  /**
   * Currently selected option ID
   */
  @Input() selectedOptionId: string = '';
  
  /**
   * Event emitted when selected option changes
   */
  @Output() selectionChange = new EventEmitter<string>();
  
  /**
   * Handles selection of a new option
   */
  selectOption(optionId: string): void {
    if (this.selectedOptionId !== optionId) {
      this.selectedOptionId = optionId;
      this.selectionChange.emit(optionId);
    }
  }
  
  /**
   * Increments the selected option to the next one in the list
   */
  incrementOption(): void {
    const currentIndex = this.getCurrentOptionIndex();
    if (currentIndex < this.options.length - 1) {
      this.selectOption(this.options[currentIndex + 1].id);
    }
  }
  
  /**
   * Decrements the selected option to the previous one in the list
   */
  decrementOption(): void {
    const currentIndex = this.getCurrentOptionIndex();
    if (currentIndex > 0) {
      this.selectOption(this.options[currentIndex - 1].id);
    }
  }
  
  /**
   * Gets the index of the currently selected option
   */
  getCurrentOptionIndex(): number {
    return this.options.findIndex(option => option.id === this.selectedOptionId);
  }
  
  /**
   * Gets the selected option
   */
  getSelectedOption(): ThermometerOption | undefined {
    return this.options.find(option => option.id === this.selectedOptionId);
  }
  
  /**
   * Calculates position of the knob based on selected option's value
   */
  getKnobPosition(): number {
    const selectedOption = this.getSelectedOption();
    if (!selectedOption) return 0;
    
    // Value should be between 0 and 100
    return selectedOption.value;
  }
}
