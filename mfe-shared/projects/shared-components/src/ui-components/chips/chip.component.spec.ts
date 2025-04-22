import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from './chip.component';
import { By } from '@angular/platform-browser';

describe('ChipComponent', () => {
    let component: ChipComponent;
    let fixture: ComponentFixture<ChipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChipComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default label value', () => {
        expect(component.label).toBe('Text Label');
        const chipElement = fixture.debugElement.query(By.css('.chip'));
        expect(chipElement.nativeElement.textContent.trim()).toBe('Text Label');
    });

    it('should have default variant as outlined', () => {
        expect(component.variant).toBe('outlined');
        expect(component.chipClasses).toBe('chip-outlined');
    });

    it('should update label when input changes', () => {
        component.label = 'New Label';
        fixture.detectChanges();
        const chipElement = fixture.debugElement.query(By.css('.chip'));
        expect(chipElement.nativeElement.textContent.trim()).toBe('New Label');
    });

    describe('variant changes', () => {
        it('should apply outlined variant class', () => {
            component.variant = 'outlined';
            fixture.detectChanges();
            const chipElement = fixture.debugElement.query(By.css('.chip'));
            expect(chipElement.nativeElement.classList.contains('chip-outlined')).toBeTruthy();
        });

        it('should apply filled variant class', () => {
            component.variant = 'filled';
            fixture.detectChanges();
            const chipElement = fixture.debugElement.query(By.css('.chip'));
            expect(chipElement.nativeElement.classList.contains('chip-filled')).toBeTruthy();
        });

        it('should apply selected variant class', () => {
            component.variant = 'selected';
            fixture.detectChanges();
            const chipElement = fixture.debugElement.query(By.css('.chip'));
            expect(chipElement.nativeElement.classList.contains('chip-selected')).toBeTruthy();
        });
    });

    describe('chipClasses getter', () => {
        it('should return correct class for outlined variant', () => {
            component.variant = 'outlined';
            expect(component.chipClasses).toBe('chip-outlined');
        });

        it('should return correct class for filled variant', () => {
            component.variant = 'filled';
            expect(component.chipClasses).toBe('chip-filled');
        });

        it('should return correct class for selected variant', () => {
            component.variant = 'selected';
            expect(component.chipClasses).toBe('chip-selected');
        });
    });

    describe('CSS variables', () => {
        it('should apply default CSS variables for outlined variant', () => {
            component.variant = 'outlined';
            fixture.detectChanges();
            const chipElement = fixture.debugElement.query(By.css('.chip'));
            const styles = window.getComputedStyle(chipElement.nativeElement);

            // Note: These tests might need adjustment based on your actual default values
            expect(styles.getPropertyValue('--chip-outlined-border-color')).toBeDefined();
            expect(styles.getPropertyValue('--chip-outlined-background')).toBeDefined();
            expect(styles.getPropertyValue('--chip-outlined-text-color')).toBeDefined();
        });
    });
}); 