// button.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have primary variant by default', () => {
    expect(component.variant).toBe('primary');
    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--primary')).toBeTruthy();
  });

  it('should render secondary variant correctly', () => {
    component.variant = 'secondary';
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--secondary')).toBeTruthy();
  });

  it('should render text variant correctly', () => {
    component.variant = 'text';
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--text')).toBeTruthy();
  });

  it('should render underlined variant correctly', () => {
    component.variant = 'underlined';
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--underlined')).toBeTruthy();
  });

  it('should render icon variant correctly', () => {
    component.variant = 'icon';
    component.iconOnly = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--icon')).toBeTruthy();
    expect(buttonEl.classList.contains('app-button--icon-only')).toBeTruthy();

    const svgEl = fixture.debugElement.query(By.css('svg'));
    expect(svgEl).toBeTruthy();
  });

  it('should emit click event when not disabled', () => {
    spyOn(component.buttonClick, 'emit');

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should not emit click event when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    spyOn(component.buttonClick, 'emit');

    const buttonEl = fixture.debugElement.query(By.css('button'));
    buttonEl.nativeElement.click();

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should show error state correctly', () => {
    component.error = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--error')).toBeTruthy();
  });

  it('should apply full width style when fullWidth is true', () => {
    component.fullWidth = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--full-width')).toBeTruthy();
  });

  it('should display arrow icon when showArrow is true', () => {
    component.showArrow = true;
    component.iconOnly = false;
    fixture.detectChanges();

    const svgEl = fixture.debugElement.query(By.css('.app-button__arrow'));
    expect(svgEl).toBeTruthy();
  });

  it('should not display arrow icon when showArrow is false', () => {
    component.showArrow = false;
    component.iconOnly = false;
    fixture.detectChanges();

    const svgEl = fixture.debugElement.query(By.css('.app-button__arrow'));
    expect(svgEl).toBeFalsy();
  });

  it('should have correct classes for hover state', () => {
    component.state = 'hover';
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--hover')).toBeTruthy();
  });

  it('should have correct classes for active state', () => {
    component.state = 'active';
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--active')).toBeTruthy();
  });

  it('should have correct classes for disabled state', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.classList.contains('app-button--disabled')).toBeTruthy();
    expect(buttonEl.disabled).toBeTruthy();
  });

  it('should set aria-disabled attribute when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.getAttribute('aria-disabled')).toBe('true');
  });

  it('should set type attribute correctly', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.type).toBe('submit');
  });

  it('should set aria-label attribute correctly', () => {
    const testLabel = 'Test Button Label';
    component.ariaLabel = testLabel;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonEl.getAttribute('aria-label')).toBe(testLabel);
  });
});