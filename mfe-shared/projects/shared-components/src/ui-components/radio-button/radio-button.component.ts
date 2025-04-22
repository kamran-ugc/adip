// radio-button.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, FormControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() value: any;
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() label: string = '';
  @Input() id: string = 'radio-' + Math.random().toString(36).substring(2, 9);
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @Input() formControl: FormControl = new FormControl();

  @Output() change = new EventEmitter<any>();

  // Control Value Accessor methods
  private onChange: any = () => { };
  private onTouched: any = () => { };

  /**
   * Handles the radio button click
   */
  onRadioChange(): void {
    if (this.disabled) return;

    this.checked = true;
    this.onChange(this.value);
    this.onTouched();
    this.change.emit(this.value);
  }

  /**
   * Sets the model value
   */
  writeValue(value: any): void {
    this.checked = this.value === value;
  }

  /**
   * Registers the onChange callback
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers the onTouched callback
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get control(): FormControl | null {
    return this.formControl ?? null;
  }

  get validationErrors(): ValidationErrors | null {
    return this.control?.errors ?? null;
  }

  get isTouched(): boolean {
    return this.control?.touched ?? false;
  }

  get isDirty(): boolean {
    return this.control?.dirty ?? false;
  }

  get showError(): boolean {
    return !!(this.control?.invalid && (this.control?.touched || this.control?.dirty));
  }

  getErrorMessage(): string {
    if (this.errorMessage) return this.errorMessage;

    const errors = this.validationErrors;
    if (!errors) return '';

    if (errors['required']) return 'This field is required';

    return 'Invalid input';
  }

  get radioClasses(): string {
    const classes = ['radio-wrapper'];

    if (this.disabled) {
      classes.push('disabled');
    }

    if (this.showError) {
      classes.push('error');
    }

    if (this.isTouched) classes.push('ng-touched');
    if (this.isDirty) classes.push('ng-dirty');
    if (this.validationErrors) classes.push('ng-invalid');

    return classes.join(' ');
  }
}