// file-upload.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default state', () => {
    const containerEl = fixture.debugElement.query(By.css('.app-file-upload')).nativeElement;
    expect(containerEl.classList.contains('app-file-upload--default')).toBeTruthy();
  });

  it('should render label and supporting text', () => {
    component.label = 'Test Upload';
    component.supportingText = 'Test Supporting Text';
    fixture.detectChanges();
    
    const labelEl = fixture.debugElement.query(By.css('.app-file-upload__label')).nativeElement;
    const supportingTextEl = fixture.debugElement.query(By.css('.app-file-upload__supporting-text')).nativeElement;
    
    expect(labelEl.textContent).toContain('Test Upload');
    expect(supportingTextEl.textContent).toContain('Test Supporting Text');
  });

  it('should not show supporting text in small size', () => {
    component.size = 'small';
    component.supportingText = 'Test Supporting Text';
    fixture.detectChanges();
    
    const supportingTextEl = fixture.debugElement.query(By.css('.app-file-upload__supporting-text'));
    expect(supportingTextEl).toBeNull();
  });

  it('should have large size by default', () => {
    const containerEl = fixture.debugElement.query(By.css('.app-file-upload')).nativeElement;
    expect(containerEl.classList.contains('app-file-upload--large')).toBeTruthy();
  });

  it('should render small size when specified', () => {
    component.size = 'small';
    fixture.detectChanges();
    
    const containerEl = fixture.debugElement.query(By.css('.app-file-upload')).nativeElement;
    expect(containerEl.classList.contains('app-file-upload--small')).toBeTruthy();
  });

  it('should show plus icon when no file is uploaded', () => {
    const addIconEl = fixture.debugElement.query(By.css('.app-file-upload__add-icon'));
    expect(addIconEl).toBeTruthy();
  });

  it('should emit fileSelected event when a file is selected', () => {
    spyOn(component.fileSelected, 'emit');
    
    // Mock file input change
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = fixture.debugElement.query(By.css('input[type="file"]')).nativeElement;
    
    // Create a mock FileList
    Object.defineProperty(fileInput, 'files', {
      value: [file],
      writable: false
    });
    
    // Trigger file input change
    fileInput.dispatchEvent(new Event('change'));
    
    expect(component.fileSelected.emit).toHaveBeenCalled();
    expect(component.state).toBe('success');
  });

  it('should show file name and size when a file is uploaded', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadedFile = {
      name: 'test.jpg',
      size: 1024, // 1KB
      file: file
    };
    
    component.uploadedFiles = [uploadedFile];
    fixture.detectChanges();
    
    const fileNameEl = fixture.debugElement.query(By.css('.app-file-upload__file-name')).nativeElement;
    const fileSizeEl = fixture.debugElement.query(By.css('.app-file-upload__file-size')).nativeElement;
    
    expect(fileNameEl.textContent).toContain('test.jpg');
    expect(fileSizeEl.textContent).toContain('MB'); // Will show size in MB
  });

  it('should show remove button when a file is uploaded', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadedFile = {
      name: 'test.jpg',
      size: 1024,
      file: file
    };
    
    component.uploadedFiles = [uploadedFile];
    fixture.detectChanges();
    
    const removeButtonEl = fixture.debugElement.query(By.css('.app-file-upload__remove-button'));
    expect(removeButtonEl).toBeTruthy();
  });

  it('should emit fileRemoved event when remove button is clicked', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const uploadedFile = {
      name: 'test.jpg',
      size: 1024,
      file: file
    };
    
    component.uploadedFiles = [uploadedFile];
    fixture.detectChanges();
    
    spyOn(component.fileRemoved, 'emit');
    
    const removeButtonEl = fixture.debugElement.query(By.css('.app-file-upload__remove-button'));
    removeButtonEl.nativeElement.click();
    
    expect(component.fileRemoved.emit).toHaveBeenCalled();
    expect(component.uploadedFiles.length).toBe(0);
  });

  it('should apply disabled state