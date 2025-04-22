// file-upload.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from "../shared-components.module";
import { IconComponent } from "../icon/icon.component";

export type FileUploadState = 'default' | 'hover' | 'success' | 'error';
export type FileUploadSize = 'large' | 'small';

export interface UploadedFile {
  name: string;
  size: number;
  file: File;
  url?: string;
}

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule, IconComponent],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent {
  @Input() label = 'Upload Image';
  @Input() supportingText = 'Supporting Text';
  @Input() state: FileUploadState = 'default';
  @Input() size: FileUploadSize = 'large';
  @Input() prefixIcon = 'arrow-up-file-upload';
  @Input() accept = 'image/*';
  @Input() multiple = false;
  @Input() maxFileSize = 10; // in MB
  @Input() required = false;
  @Input() disabled = false;
  @Input() id = `file-upload-${Math.random().toString(36).substring(2, 9)}`;

  @Output() fileSelected = new EventEmitter<UploadedFile | UploadedFile[]>();
  @Output() fileRemoved = new EventEmitter<UploadedFile | null>();
  @Output() error = new EventEmitter<string>();
  @Output() customClick = new EventEmitter<void>();


  uploadedFiles: UploadedFile[] = [];
  isDragging = false;

  constructor(private cdr: ChangeDetectorRef) { }

  onCustomClick(): void {
    if (!this.disabled) {
      this.customClick.emit();
    }
  }

  get computedClasses(): string {
    const classes = ['app-file-upload'];

    // Add state classes
    classes.push(`app-file-upload--${this.state}`);

    // Add size class
    classes.push(`app-file-upload--${this.size}`);

    // Add dragging class
    if (this.isDragging) {
      classes.push('app-file-upload--dragging');
    }

    // Add disabled class
    if (this.disabled) {
      classes.push('app-file-upload--disabled');
    }

    return classes.join(' ');
  }

  get hasFiles(): boolean {
    return this.uploadedFiles.length > 0;
  }

  get displayFileName(): string {
    if (this.uploadedFiles.length === 0) return '';
    return this.uploadedFiles[0].name;
  }

  get displayFileSize(): string {
    if (this.uploadedFiles.length === 0) return '';
    const sizeInMB = this.uploadedFiles[0].size / (1024 * 1024);
    return `${sizeInMB.toFixed(1)} MB`;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      this.isDragging = true;
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.isDragging = false;

    if (this.disabled) return;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files = event.dataTransfer.files;
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.handleFiles(input.files);
    }
  }

  removeFile(file: UploadedFile, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.disabled) return;

    const index = this.uploadedFiles.findIndex(f => f.name === file.name);
    if (index !== -1) {
      const removedFile = this.uploadedFiles[index];
      this.uploadedFiles.splice(index, 1);
      this.fileRemoved.emit(removedFile);
      this.state = 'default';
      this.cdr.detectChanges();
    }
  }

  clearFiles(): void {
    if (this.disabled) return;

    this.uploadedFiles = [];
    this.fileRemoved.emit(null);
    this.state = 'default';
  }

  private handleFiles(fileList: FileList): void {
    if (this.disabled) return;

    const files: UploadedFile[] = [];
    let hasError = false;

    // Convert FileList to array and validate files
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const fileSizeInMB = file.size / (1024 * 1024);

      if (fileSizeInMB > this.maxFileSize) {
        this.error.emit(`File ${file.name} exceeds the maximum size of ${this.maxFileSize}MB`);
        this.state = 'error';
        hasError = true;
        continue;
      }

      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        file: file,
        url: URL.createObjectURL(file)
      };

      files.push(uploadedFile);
    }

    if (files.length > 0) {
      // Handle multiple or single file upload
      if (this.multiple) {
        this.uploadedFiles = [...this.uploadedFiles, ...files];
        this.fileSelected.emit(this.uploadedFiles);
      } else {
        this.uploadedFiles = [files[0]];
        this.fileSelected.emit(files[0]);
      }

      if (!hasError) {
        this.state = 'success';
      }
    }
  }
}
