import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThermometerComponent } from './thermometer.component';

describe('ThermometerComponent', () => {
  let component: ThermometerComponent;
  let fixture: ComponentFixture<ThermometerComponent>;

  const mockOptions = [
    { id: 'income', title: 'Income Investor', description: 'Seeks steady growth with minimal risk.', value: 20 },
    { id: 'balanced', title: 'Balanced Investor', description: 'Balances risk and rewards for stable returns.', value: 50 },
    { id: 'growth', title: 'Growth Investor', description: 'Focuses on high returns with moderate risk.', value: 80 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThermometerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThermometerComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    component.selectedOptionId = 'balanced';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all options', () => {
    const optionCards = fixture.debugElement.queryAll(By.css('.option-card'));
    expect(optionCards.length).toBe(3);

    const titles = fixture.debugElement.queryAll(By.css('.option-title'));
    expect(titles[0].nativeElement.textContent).toContain('Income Investor');
    expect(titles[1].nativeElement.textContent).toContain('Balanced Investor');
    expect(titles[2].nativeElement.textContent).toContain('Growth Investor');
  });

  it('should highlight the selected option', () => {
    const selectedContainer = fixture.debugElement.queryAll(By.css('.option-container.selected'));
    expect(selectedContainer.length).toBe(1);

    const title = selectedContainer[0].query(By.css('.option-title'));
    expect(title.nativeElement.textContent).toContain('Balanced Investor');
  });

  it('should calculate the correct knob position', () => {
    expect(component.getKnobPosition()).toBe(50);

    component.selectedOptionId = 'income';
    expect(component.getKnobPosition()).toBe(20);

    component.selectedOptionId = 'growth';
    expect(component.getKnobPosition()).toBe(80);
  });

  it('should emit selection change event when option is selected', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectOption('growth');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('growth');
  });

  it('should not emit selection change event when the same option is selected', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectOption('balanced');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should increment the selected option', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedOptionId = 'balanced';
    component.incrementOption();
    expect(component.selectedOptionId).toBe('growth');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('growth');
  });

  it('should not increment if at the last option', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedOptionId = 'growth';
    component.incrementOption();
    expect(component.selectedOptionId).toBe('growth');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should decrement the selected option', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedOptionId = 'balanced';
    component.decrementOption();
    expect(component.selectedOptionId).toBe('income');
    expect(component.selectionChange.emit).toHaveBeenCalledWith('income');
  });

  it('should not decrement if at the first option', () => {
    spyOn(component.selectionChange, 'emit');
    component.selectedOptionId = 'income';
    component.decrementOption();
    expect(component.selectedOptionId).toBe('income');
    expect(component.selectionChange.emit).not.toHaveBeenCalled();
  });

  it('should disable increment button when at the last option', () => {
    component.selectedOptionId = 'growth';
    fixture.detectChanges();

    const incrementButton = fixture.debugElement.queryAll(By.css('.control-button.increment'))[2];
    expect(incrementButton.nativeElement.disabled).toBe(true);
  });

  it('should disable decrement button when at the first option', () => {
    component.selectedOptionId = 'income';
    fixture.detectChanges();

    const decrementButton = fixture.debugElement.queryAll(By.css('.control-button.decrement'))[0];
    expect(decrementButton.nativeElement.disabled).toBe(true);
  });
});
