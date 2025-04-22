import { Meta, StoryObj, applicationConfig, moduleMetadata } from "@storybook/angular";
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from "@angular/forms";
import { importProvidersFrom } from "@angular/core";
import { CustomInputComponent } from "./custom-input.component";
import { CommonModule } from "@angular/common";

const meta: Meta<CustomInputComponent> = {
  title: "Forms/Input/Form",
  component: CustomInputComponent,
  tags: ["autodocs"],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
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


//Basic required validation
export const RequiredValidation: Story = {
  render: (args) => {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      requiredField: ['', Validators.required],
    });

    return {
      props: {
        ...args,
        form,
        requiredFieldControl: form.get('requiredField'),
        onSubmit() {
          form.markAllAsTouched();
        }
      },
      template: `
        <div style="padding: 20px; max-width: 400px; font-family: 'Inter', sans-serif;">
          <form [formGroup]="form">
            <app-custom-input
              label="Required Field"
              placeholder="Enter text"
              [formControl]="requiredFieldControl"
              [required]="true"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>
            <button 
              type="button" 
              style="background-color: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; margin-top: 12px;"
              (click)="onSubmit()"
            >
              Submit
            </button>
          </form>
        </div>
      `,
    };
  },
};

// Email validation
export const EmailValidation: Story = {
  render: (args) => {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      emailField: ['', [Validators.required, Validators.email]],
    });

    return {
      props: {
        ...args,
        form,
        emailFieldControl: form.get('emailField'),
        onSubmit() {
          form.markAllAsTouched();
        }
      },
      template: `
        <div style="padding: 20px; max-width: 400px; font-family: 'Inter', sans-serif;">
          <form [formGroup]="form">
            <app-custom-input
              label="Email Field"
              placeholder="Enter email"
              type="email"
              [formControl]="emailFieldControl"
              [required]="true"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>
            <button 
              type="button" 
              style="background-color: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; margin-top: 12px;"
              (click)="onSubmit()"
            >
              Submit
            </button>
          </form>
        </div>
      `,
    };
  },
};

// Min/Max length validation
export const LengthValidation: Story = {
  render: (args) => {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      lengthField: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]],
    });

    return {
      props: {
        ...args,
        form,
        lengthFieldControl: form.get('lengthField'),
        onSubmit() {
          form.markAllAsTouched();
        }
      },
      template: `
        <div style="padding: 20px; max-width: 400px; font-family: 'Inter', sans-serif;">
          <form [formGroup]="form">
            <app-custom-input
              label="Length Field (3-10 chars)"
              placeholder="Enter text"
              [formControl]="lengthFieldControl"
              [required]="true"
              [minLength]="3"
              [maxLength]="10"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>
            <button 
              type="button" 
              style="background-color: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; margin-top: 12px;"
              (click)="onSubmit()"
            >
              Submit
            </button>
          </form>
        </div>
      `,
    };
  },
};

// Pattern validation
export const PatternValidation: Story = {
  render: (args) => {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      patternField: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]+$')
      ]],
    });

    return {
      props: {
        ...args,
        form,
        patternFieldControl: form.get('patternField'),
        onSubmit() {
          form.markAllAsTouched();
        }
      },
      template: `
        <div style="padding: 20px; max-width: 400px; font-family: 'Inter', sans-serif;">
          <form [formGroup]="form">
            <app-custom-input
              label="Alphanumeric Field"
              placeholder="Enter alphanumeric text"
              [formControl]="patternFieldControl"
              [required]="true"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>
            <button 
              type="button" 
              style="background-color: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; margin-top: 12px;"
              (click)="onSubmit()"
            >
              Submit
            </button>
          </form>
        </div>
      `,
    };
  },
};

// Multiple validations
export const MultipleValidations: Story = {
  render: (args) => {
    const formBuilder = new FormBuilder();
    const form = formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z0-9]+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]]
    });

    return {
      props: {
        ...args,
        form,
        usernameControl: form.get('username'),
        emailControl: form.get('email'),
        passwordControl: form.get('password'),
        onSubmit() {
          form.markAllAsTouched();
        }
      },
      template: `
        <div style="padding: 20px; max-width: 400px; font-family: 'Inter', sans-serif;">
          <form [formGroup]="form">
            <app-custom-input
              label="Username"
              placeholder="Enter username"
              [formControl]="usernameControl"
              [required]="true"
              [minLength]="3"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>

            <app-custom-input
              label="Email"
              placeholder="Enter email"
              type="email"
              [formControl]="emailControl"
              [required]="true"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>

            <app-custom-input
              label="Password"
              placeholder="Enter password"
              type="password"
              [formControl]="passwordControl"
              [required]="true"
              [minLength]="8"
              (inputChange)="inputChange?.($event)"
            ></app-custom-input>

            <button 
              type="button" 
              style="background-color: #4F46E5; color: white; padding: 8px 16px; border-radius: 4px; border: none; cursor: pointer; margin-top: 12px;"
              (click)="onSubmit()"
            >
              Submit
            </button>
          </form>
        </div>
      `,
    };
  },
}; 