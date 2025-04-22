import { Component, Input, Output, EventEmitter, forwardRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

interface Country {
    name: string;
    nativeName?: string;
    code: string;
    dialCode: string;
    flag: string;
}

@Component({
    selector: 'app-phone-input',
    standalone: true,
    imports: [CommonModule, FormsModule, IconComponent],
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PhoneInputComponent),
            multi: true
        }
    ]
})
export class PhoneInputComponent implements ControlValueAccessor, Validator {
    @Input() label: string = 'Phone Number';
    @Input() placeholder: string = 'e.g., 7XXXXXXX432';
    @Input() required: boolean = true;
    @Output() phoneChange = new EventEmitter<string>();
    @Output() inputFocus = new EventEmitter<FocusEvent>();
    @Output() inputBlur = new EventEmitter<FocusEvent>();

    @Input() type: string = 'text';
    @Input() disabled: boolean = false;
    @Input() maxLength?: number;
    @Input() minLength?: number;

    @ViewChild('phoneInput') phoneInput!: ElementRef;
    @ViewChild('dropdown') dropdown!: ElementRef;

    phoneNumber: string = '';
    showCountryDropdown: boolean = false;

    countries: Country[] = [
        { name: 'United States', code: 'us', dialCode: '+1', flag: 'flag-us' },
        { name: 'United Kingdom', code: 'gb', dialCode: '+44', flag: 'flag-gb' },
        { name: 'India', code: 'in', dialCode: '+91', flag: 'flag-in' },
        { name: 'Pakistan', code: 'pk', dialCode: '+92', flag: 'flag-pk' },
    ];

    selectedCountry: Country = this.countries[0];

    // For validation
    touched = false;
    isValid = true;
    errorMessage = '';

    // ControlValueAccessor implementation
    onChange: any = () => { };
    onTouched: any = () => { };

    @HostListener('document:click', ['$event'])
    clickOutside(event: Event) {
        const clickedElement = event.target as HTMLElement;
        const isClickInside = this.dropdown?.nativeElement?.contains(clickedElement) ||
            clickedElement.closest('.country-code');

        if (!isClickInside && this.showCountryDropdown) {
            this.showCountryDropdown = false;
        }
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.showCountryDropdown = !this.showCountryDropdown;
    }

    selectCountry(country: Country, event: Event): void {
        event.stopPropagation();
        this.selectedCountry = country;
        this.showCountryDropdown = false;
        this.emitChange();
    }

    onPhoneNumberChange(): void {
        // Format phone number (strip non-digits)
        this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, '');
        this.validatePhone();
        this.emitChange();
    }

    /**
     * Allows only numeric input
     * @param event Keyboard event
     * @returns Boolean indicating if key press is allowed
     */
    onKeyPress(event: KeyboardEvent): boolean {
        // Allow only numeric keys (0-9)
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    /**
     * Handle paste events to ensure only numbers are pasted
     * @param event Paste event
     */
    onPaste(event: ClipboardEvent): void {
        event.preventDefault();
        const clipboardData = event.clipboardData;
        if (clipboardData) {
            const pastedText = clipboardData.getData('text');
            const numericText = pastedText.replace(/[^\d]/g, '');

            // Insert at cursor position or append to end
            const input = event.target as HTMLInputElement;
            const startPos = input.selectionStart || 0;
            const endPos = input.selectionEnd || 0;

            this.phoneNumber = this.phoneNumber.substring(0, startPos) +
                numericText +
                this.phoneNumber.substring(endPos);

            // Update validation after paste
            this.validatePhone();
            this.emitChange();
        }
    }

    private validatePhone(): void {
        if (!this.required) return;

        if (!this.phoneNumber) {
            this.isValid = false;
            this.errorMessage = 'Phone number is required';
            return;
        }

        // Basic validation - check if it's a reasonable length
        if (this.phoneNumber.length < 7) {
            this.isValid = false;
            this.errorMessage = 'Phone number is not valid';
            return;
        }

        if (this.phoneNumber.length > 15) {
            this.isValid = false;
            this.errorMessage = 'Phone number is not valid';
            return;
        }

        this.isValid = true;
        this.errorMessage = '';
    }

    private emitChange(): void {
        const fullNumber = this.selectedCountry.code + ' ' + this.phoneNumber;
        this.onChange(fullNumber);
        this.phoneChange.emit(fullNumber);
    }

    // ControlValueAccessor methods
    writeValue(value: string): void {
        if (value) {
            // Extract the country code and phone number
            const match = value.match(/^\+(\d+)\s*(.*)$/);
            if (match) {
                const code = '+' + match[1];
                const number = match[2];

                // Find the country by code
                const country = this.countries.find(c => c.code === code);
                if (country) {
                    this.selectedCountry = country;
                }

                this.phoneNumber = number;
            } else {
                this.phoneNumber = value;
            }
        } else {
            this.phoneNumber = '';
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Implement if needed
    }

    // Validator methods
    validate(control: FormControl) {
        this.validatePhone();
        return this.isValid ? null : { invalidPhone: this.errorMessage };
    }

    onFocus(event: FocusEvent): void {
        this.inputFocus.emit(event);
    }

    onBlur(event: FocusEvent): void {
        this.touched = true;
        this.onTouched();
        this.inputBlur.emit(event);
    }
}