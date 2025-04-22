// file-upload.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Components/File Upload',
  component: FileUploadComponent,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'hover', 'success', 'error'],
      description: 'The state of the file upload component',
      defaultValue: 'default'
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Size of the component',
      defaultValue: 'large'
    },
    label: {
      control: 'text',
      description: 'Main label text',
      defaultValue: 'Upload Image'
    },
    supportingText: {
      control: 'text',
      description: 'Supporting text below the label',
      defaultValue: 'Supporting Text'
    },
    accept: {
      control: 'text',
      description: 'File types to accept (e.g., "image/*", ".pdf,.doc")',
      defaultValue: 'image/*'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
      defaultValue: false
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      defaultValue: false
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in MB',
      defaultValue: 10
    },
    fileSelected: {
      action: 'fileSelected',
      description: 'Event emitted when a file is selected'
    },
    fileRemoved: {
      action: 'fileRemoved',
      description: 'Event emitted when a file is removed'
    },
    error: {
      action: 'error',
      description: 'Event emitted when an error occurs'
    },
    customClick: {
      action: 'customClick',
      description: 'Event emitted when the component is clicked'
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  args: {
    state: 'default',
    size: 'large',
    label: 'Upload Image',
    supportingText: 'Supporting Text',
    disabled: false
  }
};

export const Small: Story = {
  args: {
    state: 'default',
    size: 'small',
    label: 'Upload Image',
    disabled: false
  }
};

export const WithError: Story = {
  args: {
    state: 'error',
    size: 'large',
    label: 'Upload Image',
    supportingText: 'Supporting Text',
    disabled: false
  }
};

export const Disabled: Story = {
  args: {
    state: 'default',
    size: 'large',
    label: 'Upload Image',
    supportingText: 'Supporting Text',
    disabled: true
  }
};


export const CustomIcon: Story = {
  args: {
    state: 'default',
    size: 'large',
    label: 'Upload Image',
    supportingText: 'Supporting Text',
    prefixIcon: 'draw',
    disabled: false
  }
};

export const CustomClickHandler: Story = {
  args: {
    state: 'default',
    size: 'large',
    label: 'Upload Image',
    supportingText: 'Supporting Text',
    prefixIcon: 'draw',
    disabled: false,
    customClick: () => alert('Custom click handler triggered!')
  }
};


export const FileUploadShowcase: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 24px; max-width: 800px;">
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Default State</h3>
          <app-file-upload 
            label="Upload Image" 
            supportingText="Supporting Text">
          </app-file-upload>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Hover State</h3>
          <app-file-upload 
            label="Upload Image" 
            supportingText="Supporting Text"
            state="hover">
          </app-file-upload>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Success State (with file)</h3>
          <app-file-upload 
            label="Upload Image" 
            supportingText="Supporting Text"
            state="success">
          </app-file-upload>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Error State</h3>
          <app-file-upload 
            label="Upload Image" 
            supportingText="Supporting Text"
            state="error">
          </app-file-upload>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Small Size</h3>
          <app-file-upload 
            label="Upload Image"
            size="small">
          </app-file-upload>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Disabled State</h3>
          <app-file-upload 
            label="Upload Image" 
            supportingText="Supporting Text"
            [disabled]="true">
          </app-file-upload>
        </div>
        
        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Custom Icon</h3>
          <app-file-upload
            label="Upload Image"
            supportingText="With custom icon"
            prefixIcon="draw">
          </app-file-upload>
        </div>

        <div>
          <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Custom Click Handler</h3>
          <app-file-upload
            label="Custom Click Handler"
            supportingText="Click to trigger custom action"
            prefixIcon="draw"
            (customClick)="alert('Custom click handler triggered!')">
          </app-file-upload>
        </div>
      </div>
    `
  })
};
