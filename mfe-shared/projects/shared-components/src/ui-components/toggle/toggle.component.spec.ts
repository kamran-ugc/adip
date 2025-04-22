import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
    let component: ToggleComponent;
    let fixture: ComponentFixture<ToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ToggleComponent, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render with default unchecked state', () => {
        const toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['checked']).toBeFalsy();
        expect(toggleElement.attributes['aria-checked']).toBe('false');
    });

    it('should reflect checked state when set via input', () => {
        component.checked = true;
        fixture.detectChanges();

        const toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['checked']).toBeTruthy();
        expect(toggleElement.attributes['aria-checked']).toBe('true');
    });

    it('should toggle state when clicked', () => {
        const toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));

        // Initial state
        expect(component.checked).toBeFalsy();

        // Click to toggle
        toggleElement.nativeElement.click();
        fixture.detectChanges();

        // Should be checked now
        expect(component.checked).toBeTruthy();
        expect(toggleElement.classes['checked']).toBeTruthy();

        // Click again to toggle back
        toggleElement.nativeElement.click();
        fixture.detectChanges();

        // Should be unchecked again
        expect(component.checked).toBeFalsy();
        expect(toggleElement.classes['checked']).toBeFalsy();
    });

    it('should emit change event when toggled', () => {
        spyOn(component.checkedChange, 'emit');

        const toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        toggleElement.nativeElement.click();

        expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should not toggle when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();

        const toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        toggleElement.nativeElement.click();

        expect(component.checked).toBeFalsy();
    });

    it('should apply correct size class', () => {
        // Check small size
        component.size = 'small';
        fixture.detectChanges();

        let toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['small']).toBeTruthy();

        // Check medium size
        component.size = 'medium';
        fixture.detectChanges();

        toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['medium']).toBeTruthy();

        // Check large size
        component.size = 'large';
        fixture.detectChanges();

        toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['large']).toBeTruthy();
    });

    it('should apply correct color class', () => {
        component.checked = true;

        // Check primary color
        component.color = 'primary';
        fixture.detectChanges();

        let toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['primary']).toBeTruthy();

        // Check success color
        component.color = 'success';
        fixture.detectChanges();

        toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));
        expect(toggleElement.classes['success']).toBeTruthy();
    });

    it('should render label when provided', () => {
        component.label = 'Test Label';
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(By.css('.toggle-label'));
        expect(labelElement.nativeElement.textContent).toContain('Test Label');
    });

    it('should toggle with keyboard interaction', () => {
        const toggleElement = fixture.debugElement.query(By.css('.toggle-switch'));

        // Create a keyboard event (space key)
        const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });

        // Dispatch the event
        toggleElement.nativeElement.dispatchEvent(spaceEvent);
        fixture.detectChanges();

        // Should be toggled
        expect(component.checked).toBeTruthy();

        // Create an enter key event
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

        // Dispatch the event
        toggleElement.nativeElement.dispatchEvent(enterEvent);
        fixture.detectChanges();

        // Should be toggled back
        expect(component.checked).toBeFalsy();
    });

    it('should implement ControlValueAccessor correctly', () => {
        // Test writeValue
        component.writeValue(true);
        expect(component.checked).toBeTruthy();

        // Test registerOnChange
        const mockFn = jasmine.createSpy('mockChangeFunction');
        component.registerOnChange(mockFn);

        component.toggle();
        expect(mockFn).toHaveBeenCalledWith(false);

        // Test registerOnTouched
        const mockTouchedFn = jasmine.createSpy('mockTouchedFunction');
        component.registerOnTouched(mockTouchedFn);

        component.toggle();
        expect(mockTouchedFn).toHaveBeenCalled();

        // Test setDisabledState
        component.setDisabledState(true);
        expect(component.disabled).toBeTruthy();
    });
});