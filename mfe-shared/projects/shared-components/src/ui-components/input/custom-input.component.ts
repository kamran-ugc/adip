import { Component, Input, Output, EventEmitter, forwardRef, Optional, Self, ViewEncapsulation, inject } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    styleUrls: ['./custom-input.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, IconComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomInputComponent),
            multi: true
        }
    ],
    // Use ViewEncapsulation.None to prevent Angular from scoping the styles
    encapsulation: ViewEncapsulation.None
})
export class CustomInputComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() supportingText: string = '';
    @Input() type: string = 'text';
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() maxLength?: number;
    @Input() minLength?: number;
    @Input() showCheckmark: boolean = true;
    @Input() errorMessage: string = '';
    @Input() iconName: string = '';
    @Input() validators?: ValidatorFn[];
    @Input() formControl: FormControl = new FormControl();

    @Output() inputChange = new EventEmitter<string>();
    @Output() inputFocus = new EventEmitter<FocusEvent>();
    @Output() inputBlur = new EventEmitter<FocusEvent>();

    value: string = '';
    isFocused: boolean = false;
    hasError: boolean = false;
    isHovered: boolean = false;

    onChange: (value: string) => void = () => { };
    onTouched: () => void = () => { };

    onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
        this.inputChange.emit(value);
    }

    onFocus(event: FocusEvent): void {
        this.isFocused = true;
        this.inputFocus.emit(event);
    }

    onBlur(event: FocusEvent): void {
        this.isFocused = false;
        this.onTouched();
        this.inputBlur.emit(event);
    }

    onMouseEnter(): void {
        if (!this.disabled) {
            this.isHovered = true;
        }
    }

    onMouseLeave(): void {
        this.isHovered = false;
    }

    // ControlValueAccessor interface methods
    writeValue(value: string): void {
        if (!this.disabled) {
            this.value = value || '';
        }
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

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
        if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}`;
        if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}`;
        if (errors['pattern']) return 'Invalid format';
        if (errors['email']) return 'Please enter a valid email';

        return 'Invalid input';
    }

    get inputClasses(): string {
        const classes = ['custom-input'];

        if (this.disabled) {
            classes.push('disabled');
        }

        if (this.showError) {
            classes.push('error');
        }

        if (this.showCheckmark && (this.hasValue || this.isFocused)) {
            classes.push('with-check');
        }

        if (this.isTouched) classes.push('ng-touched');
        if (this.isDirty) classes.push('ng-dirty');
        if (this.validationErrors) classes.push('ng-invalid');

        return classes.join(' ');
    }

    get hasSupportingText(): boolean {
        return this.supportingText !== '';
    }

    get hasValue(): boolean {
        return this.value !== '';
    }
}