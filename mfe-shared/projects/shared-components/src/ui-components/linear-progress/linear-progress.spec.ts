import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './linear-progress.component';
import { By } from '@angular/platform-browser';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct classes', () => {
    const progressBarElement = fixture.debugElement.query(By.css('.progress-bar-container')).nativeElement;
    expect(progressBarElement).toBeTruthy();

    const progressFillElement = fixture.debugElement.query(By.css('.progress-bar-fill')).nativeElement;
    expect(progressFillElement).toBeTruthy();
  });

  it('should display progress correctly', () => {
    component.progress = 50;
    fixture.detectChanges();

    const progressFill = fixture.debugElement.query(By.css('.progress-bar-fill')).nativeElement;
    expect(progressFill.style.width).toBe('50%');
  });

  it('should have proper ARIA attributes', () => {
    component.progress = 75;
    fixture.detectChanges();

    const progressBarElement = fixture.debugElement.query(By.css('.progress-bar-container')).nativeElement;
    expect(progressBarElement.getAttribute('role')).toBe('progressbar');
    expect(progressBarElement.getAttribute('aria-valuenow')).toBe('75');
    expect(progressBarElement.getAttribute('aria-valuemin')).toBe('0');
    expect(progressBarElement.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should apply disabled class when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const progressBarElement = fixture.debugElement.query(By.css('.progress-bar-container')).nativeElement;
    expect(progressBarElement.classList.contains('disabled')).toBeTruthy();
  });
});