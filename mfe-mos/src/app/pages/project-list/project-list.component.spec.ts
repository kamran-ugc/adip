import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectListComponent,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.selectedProjectStatus).toBe('active');
    expect(component.selectedWorkflow).toBe('all');
    expect(component.itemsPerPage).toBe(15);
    expect(component.headingText).toBe('My Active Projects');
  });

  it('should have correct display columns', () => {
    const expectedColumns = [
      'select',
      'mosId',
      'locId',
      'facilityName',
      'aciesNo',
      'category',
      'acChapter',
      'sponsor',
      'state',
      'lastModified',
      'status',
      'reviewDate',
      'workflow',
      'actions'
    ];
    expect(component.displayedColumns).toEqual(expectedColumns);
  });

  it('should return correct badge class for status', () => {
    expect(component.getStatusBadgeClass('In Progress')).toBe('badge bg-info');
    expect(component.getStatusBadgeClass('Completed')).toBe('badge bg-success');
    expect(component.getStatusBadgeClass('Draft')).toBe('badge bg-secondary');
  });

  it('should return correct badge class for workflow', () => {
    expect(component.getWorkflowBadgeClass('Region Approval')).toBe('badge bg-primary');
    expect(component.getWorkflowBadgeClass('ADO Approval')).toBe('badge bg-success');
    expect(component.getWorkflowBadgeClass('ADO Pre Approval')).toBe('badge bg-warning');
    expect(component.getWorkflowBadgeClass('Draft')).toBe('badge bg-secondary');
  });

  it('should update heading text when project status changes', () => {
    component.onProjectStatusChange('completed');
    expect(component.headingText).toBe('Completed MOS Projects');
    
    component.onProjectStatusChange('all');
    expect(component.headingText).toBe('All MOS Projects');
  });

  it('should handle checkbox selection correctly', () => {
    expect(component.isAllSelected()).toBeFalsy();
    
    // Select all rows
    component.toggleAllRows();
    expect(component.selection.selected.length).toBe(component.dataSource.data.length);
    expect(component.isAllSelected()).toBeTruthy();
    
    // Deselect all rows
    component.toggleAllRows();
    expect(component.selection.selected.length).toBe(0);
    expect(component.isAllSelected()).toBeFalsy();
  });
});