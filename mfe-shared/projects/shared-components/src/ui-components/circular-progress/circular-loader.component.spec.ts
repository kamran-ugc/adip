import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CircularLoaderComponent } from './circular-loader.component';

describe('CircularLoaderComponent', () => {
  let component: CircularLoaderComponent;
  let fixture: ComponentFixture<CircularLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CircularLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly calculate radius and circumference', () => {
    component.size = 100;
    component.strokeWidth = 10;

    expect(component.radius).toBe(45); // (100/2) - (10/2)
    expect(component.circumference).toBeCloseTo(282.74, 1); // 2 * PI * 45
  });

  it('should calculate correct stroke dash offset', () => {
    component.size = 100;
    component.strokeWidth = 10;
    component.progress = 50;

    const circumference = 2 * Math.PI * component.radius;
    const expectedOffset = circumference - (50 / 100) * circumference;

    expect(component.strokeDashOffset).toBeCloseTo(expectedOffset, 1);
  });

  it('should display the progress circle when in-progress state', () => {
    component.state = 'in-progress';
    component.progress = 50;
    fixture.detectChanges();

    const progressCircle = fixture.debugElement.query(By.css('.circle-progress'));
    expect(progressCircle).toBeTruthy();
  });

  it('should display the completed circle when completed state', () => {
    component.state = 'completed';
    fixture.detectChanges();

    const completedCircle = fixture.debugElement.query(By.css('.circle-completed'));
    expect(completedCircle).toBeTruthy();
  });

  it('should display label when provided', () => {
    component.label = 1;
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.loader-label'));
    expect(label.nativeElement.textContent.trim()).toBe('1');
  });

  it('should set the correct ARIA attributes', () => {
    component.state = 'in-progress';
    component.progress = 75;
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.circular-loader')).nativeElement;
    expect(loader.getAttribute('role')).toBe('progressbar');
    expect(loader.getAttribute('aria-valuenow')).toBe('75');
    expect(loader.getAttribute('aria-valuemin')).toBe('0');
    expect(loader.getAttribute('aria-valuemax')).toBe('100');
  });

  it('should set the correct size', () => {
    component.size = 80;
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.circular-loader')).nativeElement;
    expect(loader.style.width).toBe('80px');
    expect(loader.style.height).toBe('80px');
  });
});
