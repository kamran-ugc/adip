// dropdown.component.ts (Standalone Component)
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IconComponent } from "../icon/icon.component";

@Component({
    selector: 'app-dropdown',
    standalone: true,
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    imports: [CommonModule, IconComponent],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class DropdownComponent implements ControlValueAccessor {
    @Input() label: string = '';
    @Input() options: string[] = [];
    @Input() supportingText?: string;
    @Input() disabled = false;
    @Input() placeholder: string = 'Select an option';
    @Input() required: boolean = false;
    @Input() errorMessage: string = '';
    @Input() validators?: ValidatorFn[];
    @Input() formControl: FormControl = new FormControl();
    @Input() customClass?: string;
    @Input() fullWidth = false;

    @Output() selectionChange = new EventEmitter<string>();
    @Output() dropdownFocus = new EventEmitter<FocusEvent>();
    @Output() dropdownBlur = new EventEmitter<FocusEvent>();

    isOpen = false;
    selectedValue: string = '';
    isFocused: boolean = false;
    isHovered: boolean = false;

    constructor(private eRef: ElementRef) { }

    onChange: any = () => { };
    onTouched: any = () => { };

    writeValue(value: string): void {
        this.selectedValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    toggleDropdown(): void {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }

    selectOption(option: string): void {
        this.selectedValue = option;
        this.isOpen = false;
        this.onChange(option);
        this.selectionChange.emit(option);
    }

    onFocus(event: FocusEvent): void {
        this.isFocused = true;
        this.dropdownFocus.emit(event);
    }

    onBlur(event: FocusEvent): void {
        this.isFocused = false;
        this.onTouched();
        this.dropdownBlur.emit(event);
    }

    onMouseEnter(): void {
        if (!this.disabled) {
            this.isHovered = true;
        }
    }

    onMouseLeave(): void {
        this.isHovered = false;
    }

    /** ✅ Detect clicks outside the dropdown and close it */
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        if (this.isOpen && !this.eRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
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
        if (errors['pattern']) return 'Invalid format';

        return 'Invalid input';
    }

    get dropdownClasses(): string {
        const classes = ['dropdown-container'];

        if (this.disabled) {
            classes.push('disabled');
        }

        if (this.showError) {
            classes.push('error');
        }

        if (this.isTouched) classes.push('ng-touched');
        if (this.isDirty) classes.push('ng-dirty');
        if (this.validationErrors) classes.push('ng-invalid');

        // Add full width class
        if (this.fullWidth) {
            classes.push('full-width');
        }

        // Add custom class if provided
        if (this.customClass) {
            classes.push(this.customClass);
        }

        return classes.join(' ');
    }

    get hasValue(): boolean {
        return this.selectedValue !== '';
    }
}
