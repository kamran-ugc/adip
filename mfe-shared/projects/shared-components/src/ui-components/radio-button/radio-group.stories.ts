// radio-group.stories.ts
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupComponent } from './radio-group.component';
import { RadioButtonComponent } from './radio-button.component';

const meta: Meta<RadioGroupComponent> = {
  title: 'Forms/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ReactiveFormsModule, RadioButtonComponent, RadioGroupComponent]
    })
  ],
  argTypes: {
    vertical: { control: 'boolean' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    change: { action: 'changed' }
  }
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

// Template for horizontal radio group
const HorizontalTemplate = `
<div style="padding: 2rem;">
  <h3 style="margin-bottom: 1rem;">Horizontal Radio Group</h3>
  <app-radio-group 
    [name]="name" 
    [disabled]="disabled" 
    [vertical]="vertical"
    (change)="change($event)">
    <app-radio-button value="option1" label="Option 1" id="option1"></app-radio-button>
    <app-radio-button value="option2" label="Option 2" id="option2"></app-radio-button>
    <app-radio-button value="option3" label="Option 3" id="option3"></app-radio-button>
  </app-radio-group>
</div>
`;

// Template for horizontal radio group with many options
const TooManyHorizontalTemplate = `
<div style="padding: 2rem;">
  <h3 style="margin-bottom: 1rem;">Horizontal Radio Group with Wrapping</h3>
  <div style="max-width: 600px; border: 1px dashed #ccc; padding: 1rem;">
    <app-radio-group 
      [name]="name" 
      [disabled]="disabled" 
      [vertical]="vertical"
      [customClass]="customClass"
      (change)="change($event)">
        <app-radio-button value="option1" label="Option 1" id="option1"></app-radio-button>
        <app-radio-button value="option2" label="Option 2" id="option2"></app-radio-button>
        <app-radio-button value="option3" label="Option 3" id="option3"></app-radio-button>
        <app-radio-button value="option4" label="Option 4" id="option4"></app-radio-button>
        <app-radio-button value="option5" label="Option 5" id="option5"></app-radio-button>
        <app-radio-button value="option6" label="Option 6" id="option6"></app-radio-button>
        <app-radio-button value="option7" label="Option 7" id="option7"></app-radio-button>
        <app-radio-button value="option8" label="Option 8" id="option8"></app-radio-button>
        <app-radio-button value="option9" label="Option 9" id="option9"></app-radio-button>
        <app-radio-button value="option10" label="Option 10" id="option10"></app-radio-button>
    </app-radio-group>
  </div>
  <p style="margin-top: 1rem; color: #666;">Note: Container is limited to 600px width to demonstrate wrapping behavior</p>
</div>
`;

// Template for vertical radio group
const VerticalTemplate = `
<div style="padding: 2rem;">
  <h3 style="margin-bottom: 1rem;">Vertical Radio Group</h3>
  <app-radio-group 
    [name]="name" 
    [disabled]="disabled" 
    [vertical]="vertical"
    (change)="change($event)">
    <app-radio-button value="option1" label="Option 1" id="option1"></app-radio-button>
    <app-radio-button value="option2" label="Option 2" id="option2"></app-radio-button>
    <app-radio-button value="option3" label="Option 3" id="option3"></app-radio-button>
  </app-radio-group>
</div>
`;

export const Horizontal: Story = {
  render: (args) => ({
    props: args,
    template: HorizontalTemplate
  }),
  args: {
    name: 'horizontalGroup',
    disabled: false,
    vertical: false,
    change: action('Radio group changed')
  }
};

export const TooManyHorizontal: Story = {
  render: (args) => ({
    props: args,
    template: TooManyHorizontalTemplate,
    styles: [`
      :host ::ng-deep .flex-wrap {
        flex-wrap: wrap;
      }
    `]
  }),
  args: {
    name: 'horizontalGroup',
    disabled: false,
    vertical: false,
    customClass: 'flex-wrap',
    change: action('Radio group changed')
  }
};


export const Vertical: Story = {
  render: (args) => ({
    props: args,
    template: VerticalTemplate
  }),
  args: {
    name: 'verticalGroup',
    disabled: false,
    vertical: true,
    change: action('Radio group changed')
  }
};

export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: HorizontalTemplate
  }),
  args: {
    name: 'disabledGroup',
    disabled: true,
    vertical: false,
    change: action('Radio group changed')
  }
};

// Template showing a form with radio group
const FormTemplate = `
<div style="padding: 2rem;">
  <h3 style="margin-bottom: 1rem;">Form with Radio Group</h3>
  <form [formGroup]="form">
    <div style="margin-bottom: 1rem;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Select an option:</label>
      <app-radio-group 
        formControlName="option"
        [vertical]="vertical"
        (change)="onFormChange($event)">
        <app-radio-button value="option1" label="Option 1" id="form-option1"></app-radio-button>
        <app-radio-button value="option2" label="Option 2" id="form-option2"></app-radio-button>
        <app-radio-button value="option3" label="Option 3" id="form-option3"></app-radio-button>
      </app-radio-group>
    </div>
    
    <div style="margin-top: 1rem;">
      <button type="button" style="padding: 0.5rem 1rem; background: #0063B1; color: white; border: none; border-radius: 4px; cursor: pointer;"
        (click)="onSubmit()">
        Submit
      </button>
    </div>
    
    <pre style="margin-top: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 4px;">{{ formValue }}</pre>
  </form>
</div>
`;

// Story with form integration
export const WithReactiveForm: Story = {
  render: (args) => {
    // Create properties in the render function but outside the props object
    const form = new FormBuilder().group({
      option: ['option1']
    });
    let formValueStr = JSON.stringify({ option: 'option1' }, null, 2);

    return {
      props: {
        ...args,
        // Only include the component inputs in args
        form: form,
        formValue: formValueStr,
        onFormChange: (value: any) => {
          action('Form value changed')(value);
          formValueStr = JSON.stringify({ option: value }, null, 2);
          // Update the displayed form value
          return formValueStr;
        },
        onSubmit: () => {
          action('Form submitted')(form.value);
        }
      },
      template: FormTemplate
    };
  },
  args: {
    // Only include actual @Input properties from the component
    vertical: true
  }
};

// Need to add FormBuilder for the story
import { FormBuilder } from '@angular/forms';