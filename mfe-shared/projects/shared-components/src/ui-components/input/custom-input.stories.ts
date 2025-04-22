import { Meta, StoryObj, applicationConfig } from "@storybook/angular";
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from "@angular/forms";
import { importProvidersFrom } from "@angular/core";
import { CustomInputComponent } from "./custom-input.component";

// Define the meta for the component
const meta: Meta<CustomInputComponent> = {
  title: "Forms/Input",
  component: CustomInputComponent,
  tags: ["autodocs"],
  // Since this is a standalone component, we don't need moduleMetadata with declarations
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(ReactiveFormsModule, FormsModule)],
    }),
  ],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    supportingText: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    showCheckmark: { control: "boolean" },
    errorMessage: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
    inputChange: { action: "inputChange" },
    inputFocus: { action: "inputFocus" },
    inputBlur: { action: "inputBlur" },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<CustomInputComponent>;

// Default story
export const Default: Story = {
  args: {
    label: "Title Label",
    placeholder: "Field Text",
    supportingText: "",
    disabled: false,
    required: false,
    type: "text",
    showCheckmark: true,
    errorMessage: "",
  },
};

// With supporting text
export const WithSupportingText: Story = {
  args: {
    ...Default.args,
    supportingText: "Supporting text",
  },
};

// With error state
export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: "This field has an error",
    hasError: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};


// With form validation (using render function)
// With form validation (using render function)
export const WithValidation: Story = {
  render: (args) => {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      input: ['', Validators.required],
    });

    // Create an object with explicit hasError property
    const componentProps = {
      ...args,
      form,
      hasError: false,
      validate() {
        form.markAllAsTouched();
        if (form.invalid) {
          this.hasError = true;
        } else {
          this.hasError = false;
        }
      },
      onInputChange(event: any) {
        if (form.controls['input'].value) {
          this.hasError = false;
        }
        if (args.inputChange) {
          args.inputChange(event);
        }
      }
    };

    return {
      props: componentProps,
      template: `
        <div style="padding: 20px; max-width: 400px; font-family: 'Inter', sans-serif;">
          <form [formGroup]="form">
            <app-custom-input
              [label]="label"
              [placeholder]="placeholder"
              [supportingText]="supportingText"
              [disabled]="disabled"
              [required]="required"
              [type]="type"
              [showCheckmark]="showCheckmark"
              [errorMessage]="errorMessage"
              [hasError]="hasError"
              formControlName="input"
              (inputChange)="onInputChange($event)"
              (inputFocus)="inputFocus?.($event)"
              (inputBlur)="inputBlur?.($event)"
            ></app-custom-input>
            <button 
              type="button" 
              style="background-color: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; margin-top: 12px;"
              (click)="validate()"
            >
              Validate
            </button>
          </form>
        </div>
      `,
    };
  },
  args: {
    ...Default.args,
    errorMessage: "This field is required",
  },
};

// Story showing all states side by side
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="max-width: 900px; padding: 20px; font-family: 'Inter', sans-serif;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Default</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              [showCheckmark]="true"
            ></app-custom-input>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Hover</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              [showCheckmark]="true"
              [isHovered]="true"
            ></app-custom-input>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Clicked/Inputting</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Enter Text"
              [showCheckmark]="true"
              [isFocused]="true"
            ></app-custom-input>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Default with Supporting</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              supportingText="Supporting text"
              [showCheckmark]="true"
            ></app-custom-input>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Hover with Supporting</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              supportingText="Supporting text"
              [showCheckmark]="true"
              [isHovered]="true"
            ></app-custom-input>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Clicked with Supporting</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Enter Text"
              supportingText="Supporting text"
              [showCheckmark]="true"
              [isFocused]="true"
            ></app-custom-input>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px;">
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Filled Text</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              [value]="'Field Text'"
              [showCheckmark]="true"
            ></app-custom-input>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Error</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              [value]="'Field Text'"
              errorMessage="Supporting text"
              [showCheckmark]="true"
              [hasError]="true"
            ></app-custom-input>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">Disabled</h3>
            <app-custom-input
              label="Title Label"
              placeholder="Field Text"
              [value]="'Field Text'"
              [showCheckmark]="true"
              [disabled]="true"
            ></app-custom-input>
          </div>
        </div>
      </div>
    `,
  }),
};