import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-toggle',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleComponent),
            multi: true
        }
    ]
})
export class ToggleComponent implements ControlValueAccessor {
    @Input() checked = false;
    @Input() disabled = false;
    @Input() label = '';
    @Input() name = '';
    @Input() ariaLabel = '';
    @Input() color: 'primary' | 'success' = 'primary';
    @Input() size: 'small' | 'medium' | 'large' = 'medium';

    @Output() checkedChange = new EventEmitter<boolean>();

    private onChange: (value: boolean) => void = () => { };
    private onTouched: () => void = () => { };

    /**
     * Toggle the checked state
     */
    toggle(): void {
        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.onChange(this.checked);
        this.onTouched();
        this.checkedChange.emit(this.checked);
    }

    /**
     * Handle key events for accessibility
     */
    onKeyDown(event: KeyboardEvent): void {
        // Toggle on space or enter key
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            this.toggle();
        }
    }

    /**
     * ControlValueAccessor methods
     */
    writeValue(value: boolean): void {
        this.checked = value;
    }

    registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}