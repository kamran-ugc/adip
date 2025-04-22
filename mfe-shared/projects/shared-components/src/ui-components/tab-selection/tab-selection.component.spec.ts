import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabSelectionComponent, TabOption } from './tab-selection.component';
import { By } from '@angular/platform-browser';

describe('TabSelectionComponent', () => {
    let component: TabSelectionComponent;
    let fixture: ComponentFixture<TabSelectionComponent>;

    const mockOptions: TabOption[] = [
        { id: '1', label: 'Option 1', icon: 'play_arrow' },
        { id: '2', label: 'Option 2', icon: 'play_arrow' },
        { id: '3', label: 'Option 3', letter: 'A' }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabSelectionComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TabSelectionComponent);
        component = fixture.componentInstance;
        component.options = mockOptions;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render all options', () => {
        const optionElements = fixture.debugElement.queryAll(By.css('.tab-option'));
        expect(optionElements.length).toBe(3);
    });

    it('should display icon when provided', () => {
        const iconElement = fixture.debugElement.query(By.css('.material-icons'));
        expect(iconElement).toBeTruthy();
        expect(iconElement.nativeElement.textContent).toContain('play_arrow');
    });

    it('should display letter when provided and no icon', () => {
        const letterElements = fixture.debugElement.queryAll(By.css('.text-lg.font-medium'));
        expect(letterElements.length).toBe(1);
        expect(letterElements[0].nativeElement.textContent).toContain('A');
    });

    it('should select a single option in single-select mode', () => {
        component.multiSelect = false;
        fixture.detectChanges();

        // Click the first option
        const firstOption = fixture.debugElement.queryAll(By.css('.tab-option'))[0];
        firstOption.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(component.selectedIds).toEqual(['1']);

        // Click the second option
        const secondOption = fixture.debugElement.queryAll(By.css('.tab-option'))[1];
        secondOption.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Only the second option should be selected now
        expect(component.selectedIds).toEqual(['2']);
    });

    it('should select multiple options in multi-select mode', () => {
        component.multiSelect = true;
        fixture.detectChanges();

        // Click the first option
        const firstOption = fixture.debugElement.queryAll(By.css('.tab-option'))[0];
        firstOption.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(component.selectedIds).toEqual(['1']);

        // Click the second option
        const secondOption = fixture.debugElement.queryAll(By.css('.tab-option'))[1];
        secondOption.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Both options should be selected
        expect(component.selectedIds).toEqual(['1', '2']);

        // Click the first option again to deselect
        firstOption.triggerEventHandler('click', null);
        fixture.detectChanges();

        // Only the second option should remain selected
        expect(component.selectedIds).toEqual(['2']);
    });

    it('should emit selectionChange event when selection changes', () => {
        spyOn(component.selectionChange, 'emit');

        const firstOption = fixture.debugElement.queryAll(By.css('.tab-option'))[0];
        firstOption.triggerEventHandler('click', null);

        expect(component.selectionChange.emit).toHaveBeenCalledWith([mockOptions[0]]);
    });

    it('should initialize with provided selected options', () => {
        component.initialSelected = ['2'];
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.selectedIds).toEqual(['2']);

        // Update view
        fixture.detectChanges();

        // Check that the second option has the selected class
        const optionElements = fixture.debugElement.queryAll(By.css('.tab-option'));
        expect(optionElements[1].classes['tab-option--selected']).toBeTruthy();
    });
});