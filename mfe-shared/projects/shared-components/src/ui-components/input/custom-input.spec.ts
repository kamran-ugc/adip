import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CustomInputComponent } from './custom-input.component';

describe('CustomInputComponent', () => {
  let component: CustomInputComponent;
  let fixture: ComponentFixture<CustomInputComponent>;
  let form: FormGroup;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInputComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    form = formBuilder.group({
      testInput: ['', [Validators.required]]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label correctly', () => {
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toContain('Test Label');
  });

  it('should handle disabled state', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.disabled).toBeTruthy();
    
    const containerElement = fixture.debugElement.query(By.css('.custom-input-container'));
    expect(containerElement.classes['disabled']).toBeTruthy();
  });

  it('should show supporting text when provided', () => {
    component.supportingText = 'Help text';
    fixture.detectChanges();
    
    const supportingTextElement = fixture.debugElement.query(By.css('.text-gray-500.text-xs'));
    expect(supportingTextElement.nativeElement.textContent).toContain('Help text');
  });

  it('should show error state', () => {
    component.hasError = true;
    component.errorMessage = 'This field is required';
    fixture.detectChanges();
    
    const errorElement = fixture.debugElement.query(By.css('.text-red-500.text-xs'));
    expect(errorElement.nativeElement.textContent).toContain('This field is required');
  });

  it('should emit input change event', () => {
    spyOn(component.inputChange, 'emit');
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    
    inputElement.value = 'Test Input';
    inputElement.dispatchEvent(new Event('input'));
    
    expect(component.inputChange.emit).toHaveBeenCalledWith('Test Input');
  });

  it('should toggle focus state on focus/blur', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    
    inputElement.dispatchEvent(new Event('focus'));
    expect(component.isFocused).toBeTruthy();
    
    inputElement.dispatchEvent(new Event('blur'));
    expect(component.isFocused).toBeFalsy();
  });

  it('should toggle hover state on mouseenter/mouseleave', () => {
    const containerElement = fixture.debugElement.query(By.css('.relative'));
    
    containerElement.triggerEventHandler('mouseenter', null);
    expect(component.isHovered).toBeTruthy();
    
    containerElement.triggerEventHandler('mouseleave', null);
    expect(component.isHovered).toBeFalsy();
  });

  it('should not toggle hover state when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    const containerElement = fixture.debugElement.query(By.css('.relative'));
    
    containerElement.triggerEventHandler('mouseenter', null);
    expect(component.isHovered).toBeFalsy();
  });

  it('should show checkmark when value exists and showCheckmark is true', () => {
    component.value = 'Test Value';
    component.showCheckmark = true;
    fixture.detectChanges();
    
    const checkmarkElement = fixture.debugElement.query(By.css('.text-green-500'));
    expect(checkmarkElement).toBeTruthy();
  });
});