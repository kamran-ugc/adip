// checkbox.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, FormControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';

export type CheckboxType = 'circle' | 'square';

@Component({
    selector: 'app-checkbox',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() checked: boolean = false;
    @Input() disabled: boolean = false;
    @Input() label: string = '';
    @Input() id: string = 'checkbox-' + Math.random().toString(36).substring(2, 9);
    @Input() required: boolean = false;
    @Input() name: string = '';
    @Input() ariaLabel: string = '';
    @Input() type: CheckboxType = 'circle';
    @Input() errorMessage: string = '';
    @Input() formControl: FormControl = new FormControl();

    @Output() change = new EventEmitter<boolean>();

    // For ControlValueAccessor
    private onChange: any = () => { };
    private onTouched: any = () => { };

    /**
     * Toggles the checkbox state
     */
    toggleCheck(): void {
        if (this.disabled) return;

        this.checked = !this.checked;
        this.onChange(this.checked);
        this.onTouched();
        this.change.emit(this.checked);
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value: any): void {
        if (value !== undefined) {
            this.checked = !!value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
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
        if (errors['requiredTrue']) return 'This field must be checked';

        return 'Invalid input';
    }

    get checkboxClasses(): string {
        const classes = ['checkbox-wrapper'];

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