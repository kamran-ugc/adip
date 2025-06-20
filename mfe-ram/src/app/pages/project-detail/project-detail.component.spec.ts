import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailComponent } from './project-detail.component';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { ramId: 'TEST-2024-OMP-123' }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract ramId from route params', () => {
    expect(component.ramId).toBe('TEST-2024-OMP-123');
  });
});