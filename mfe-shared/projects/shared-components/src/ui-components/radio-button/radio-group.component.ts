// radio-group.component.ts
import { Component, ContentChildren, forwardRef, Input, Output, EventEmitter, QueryList, AfterContentInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button.component';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonComponent],
  template: `
    <div class="radio-group" [class.vertical]="vertical" [class.disabled]="disabled" [class]="customClass">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .radio-group {
      display: flex;
      flex-direction: row;
      gap: 16px;
      
      &.vertical {
        flex-direction: column;
        align-items: flex-start;
      }
      
      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  @Input() name: string = 'radio-group-' + Math.random().toString(36).substring(2, 9);
  @Input() vertical: boolean = false;
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';

  @Output() change = new EventEmitter<any>();

  @ContentChildren(RadioButtonComponent) radioButtons!: QueryList<RadioButtonComponent>;

  private _value: any = null;
  private onChange: any = () => { };
  private onTouched: any = () => { };

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.updateRadioButtons();
  }

  ngAfterContentInit() {
    // Set up subscriptions to each radio button
    this.radioButtons.forEach(radio => {
      // Apply name and disabled state
      radio.name = this.name;

      // Subscribe to change events
      radio.change.subscribe((value: any) => {
        this.value = value;
        this.change.emit(value);
      });
    });

    // Initial update
    this.updateRadioButtons();

    // Listen for changes to the radio buttons
    this.radioButtons.changes.subscribe(() => {
      this.updateRadioButtons();
    });
  }

  private updateRadioButtons() {
    if (this.radioButtons) {
      this.radioButtons.forEach(radio => {
        radio.writeValue(this._value);
        radio.setDisabledState(this.disabled);
      });
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this._value = value;
    this.updateRadioButtons();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.updateRadioButtons();
  }
}
