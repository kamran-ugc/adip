import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { action } from '@storybook/addon-actions';

import { PhoneInputComponent as PhoneInputComponent } from './phone-input.component';
import { Required } from '../checkbox-circle/checkbox.stories';

const meta: Meta<PhoneInputComponent> = {
  title: 'Forms/PhoneInput',
  component: PhoneInputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple phone number input component with country code selection.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label displayed above the input field',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Phone Number' },
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the phone input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'e.g., 7XXXXXXX432' },
      }
    },
    phoneChange: {
      action: 'phoneChanged',
      description: 'Event emitted when the phone number changes',
      table: {
        type: { summary: 'EventEmitter<string>' },
      }
    },
    required: {
      control: 'boolean',
      description: 'Required or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    }
  },
  args: {
    label: 'Phone Number',
    placeholder: 'e.g., 7XXXXXXX432',
  },
};

export default meta;
type Story = StoryObj<PhoneInputComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default phone input with US (+1) country code.'
      }
    }
  }
};

export const WithEvent: Story = {
  render: (args) => ({
    props: {
      ...args,
      onPhoneChange: action('Phone number changed')
    },
    template: `
      <div style="width: 300px;">
        <app-phone-input
          [label]="label"
          [placeholder]="placeholder"
          (phoneChange)="onPhoneChange($event)">
        </app-phone-input>
        
        <div style="margin-top: 20px; font-family: sans-serif;">
          <p>Phone changes will appear in the Storybook actions panel.</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Phone input with event handling to track changes in the Actions panel.'
      }
    }
  }
};

export const OpenDropdown: Story = {
  render: (args) => ({
    props: {
      ...args,
      showDropdown: true
    },
    template: `
      <div style="width: 300px;">
        <app-phone-input
          [label]="label"
          [placeholder]="placeholder">
        </app-phone-input>
        
        <div style="margin-top: 20px; font-family: sans-serif;">
          <p>Click on the country code to toggle the dropdown.</p>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    // Find the country code element and click it
    const countryCodeElement = canvasElement.querySelector('.country-code');
    if (countryCodeElement) {
      (countryCodeElement as HTMLElement).click();
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Phone input with the country dropdown open.'
      }
    }
  }
};

export const WithValidation: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl(''),
      isValid: function () {
        return !this['formControl'].touched || this['formControl'].valid;
      },
      getErrorMessage: function () {
        return this['formControl'].errors?.invalidPhone || '';
      }
    },
    template: `
      <div style="width: 300px;">
        <app-phone-input
          [label]="label"
          [placeholder]="placeholder"
          [formControl]="formControl">
        </app-phone-input>
        
        <div style="margin-top: 20px; font-family: sans-serif;">
          <p>Enter a phone number shorter than 7 digits or leave it empty to see validation errors.</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Phone input with validation. Shows error messages for invalid inputs.'
      }
    }
  }
};

export const WithoutValidation: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl(''),
      isValid: function () {
        return !this['formControl'].touched || this['formControl'].valid;
      },
      getErrorMessage: function () {
        return this['formControl'].errors?.invalidPhone || '';
      }
    },
    template: `
      <div style="width: 300px;">
        <app-phone-input
          [label]="label"
          [placeholder]="placeholder"
          [required]="false"
          [formControl]="formControl">
        </app-phone-input>
        
        <div style="margin-top: 20px; font-family: sans-serif;">
          <p>Enter a phone number shorter than 7 digits or leave it empty to see validation errors.</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Phone input with validation. Shows error messages for invalid inputs.'
      }
    }
  }
};

export const WithFormIntegration: Story = {
  render: (args) => ({
    props: {
      ...args,
      formControl: new FormControl(''),
      onPhoneChange: action('Phone number changed'),
      setUSNumber: function () {
        this['formControl'].setValue('+1 5551234567');
      },
      setIndiaNumber: function () {
        this['formControl'].setValue('+91 9998887777');
      },
      clearValue: function () {
        this['formControl'].setValue('');
      }
    },
    template: `
      <div style="width: 300px;">
        <app-phone-input
          [label]="label"
          [placeholder]="placeholder"
          [formControl]="formControl"
          (phoneChange)="onPhoneChange($event)">
        </app-phone-input>
        
        <div style="margin-top: 20px; font-family: sans-serif;">
          <div style="margin-bottom: 10px;">
            <p><strong>Current Value:</strong> {{ formControl.value || 'No value' }}</p>
          </div>
          
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button 
              (click)="setUSNumber()"
              style="padding: 8px 12px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Set US Number
            </button>
            
            <button 
              (click)="setIndiaNumber()"
              style="padding: 8px 12px; background-color: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Set India Number
            </button>
            
            <button 
              (click)="clearValue()"
              style="padding: 8px 12px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Clear
            </button>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example showing integration with Angular Reactive Forms.'
      }
    }
  }
};

export const DifferentSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px;">
        <div style="width: 400px;">
          <p style="font-family: sans-serif; margin-bottom: 8px;">400px width:</p>
          <app-phone-input></app-phone-input>
        </div>
        
        <div style="width: 300px;">
          <p style="font-family: sans-serif; margin-bottom: 8px;">300px width:</p>
          <app-phone-input></app-phone-input>
        </div>
        
        <div style="width: 250px;">
          <p style="font-family: sans-serif; margin-bottom: 8px;">250px width:</p>
          <app-phone-input></app-phone-input>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Phone input component at different container widths.'
      }
    }
  }
};