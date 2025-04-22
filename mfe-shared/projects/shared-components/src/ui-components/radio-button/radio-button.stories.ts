// radio-button.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RadioButtonComponent } from './radio-button.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

const meta: Meta<RadioButtonComponent> = {
    title: 'Forms/Radio Button',
    component: RadioButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'Value of the radio button',
        },
        checked: {
            control: 'boolean',
            description: 'Whether the radio button is checked',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the radio button is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Whether the radio button is required',
        },
        label: {
            control: 'text',
            description: 'Label text for the radio button',
        },
        errorMessage: {
            control: 'text',
            description: 'Custom error message to display',
        },
        change: {
            action: 'changed',
            description: 'Event emitted when the radio button state changes',
        },
    },
    args: {
        value: 'option1',
        checked: false,
        disabled: false,
        required: false,
        label: 'Radio Button Label',
    },
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

// Basic Examples
export const Default: Story = {
    args: {
        label: 'Default Radio Button',
        value: 'default',
    },
};

export const Checked: Story = {
    args: {
        label: 'Checked Radio Button',
        value: 'checked',
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Radio Button',
        value: 'disabled',
        disabled: true,
    },
};

export const Required: Story = {
    args: {
        label: 'Required Radio Button',
        value: 'required',
        required: true,
    },
};

// Error State Examples
export const WithError: Story = {
    args: {
        label: 'Radio Button with Error',
        value: 'error',
        errorMessage: 'This field is required',
        formControl: new FormControl('', [Validators.required]),
    },
};

// Reactive Form Examples
export const ReactiveFormExample: Story = {
    render: (args) => {
        const fb = new FormBuilder();
        const form: FormGroup = fb.group({
            gender: ['', [Validators.required]]
        });

        return {
            props: {
                ...args,
                form,
                genderControl: form.get('gender'),
            },
            template: `
                <form [formGroup]="form">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <h3 style="font-weight: bold; margin-bottom: 8px;">Reactive Form Example</h3>
                        
                        <app-radio-button
                            [formControl]="genderControl"
                            value="male"
                            label="Male"
                            [errorMessage]="'Please select a gender'">
                        </app-radio-button>
                        
                        <app-radio-button
                            [formControl]="genderControl"
                            value="female"
                            label="Female">
                        </app-radio-button>

                        <div style="margin-top: 16px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                            <p style="margin: 0;">Form Value:</p>
                            <pre>{{ form.value | json }}</pre>
                            <p style="margin: 8px 0 0 0;">Form Valid:</p>
                            <pre>{{ form.valid }}</pre>
                        </div>
                    </div>
                </form>
            `
        };
    }
};

export const ReactiveFormWithValidation: Story = {
    render: (args) => {
        const fb = new FormBuilder();
        const form: FormGroup = fb.group({
            subscription: ['', [Validators.required]]
        });

        return {
            props: {
                ...args,
                form,
                subscriptionControl: form.get('subscription'),
            },
            template: `
                <form [formGroup]="form">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <h3 style="font-weight: bold; margin-bottom: 8px;">Reactive Form with Validation</h3>
                        
                        <app-radio-button
                            [formControl]="subscriptionControl"
                            value="monthly"
                            label="Monthly Subscription"
                            required>
                        </app-radio-button>

                        <app-radio-button
                            [formControl]="subscriptionControl"
                            value="yearly"
                            label="Yearly Subscription">
                        </app-radio-button>

                        <div style="margin-top: 16px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                            <p style="margin: 0;">Form Value:</p>
                            <pre>{{ form.value | json }}</pre>
                            <p style="margin: 8px 0 0 0;">Form Valid:</p>
                            <pre>{{ form.valid }}</pre>
                            <p style="margin: 8px 0 0 0;">Form Errors:</p>
                            <pre>{{ form.get('subscription')?.errors | json }}</pre>
                        </div>
                    </div>
                </form>
            `
        };
    }
};

// All Variations Example
export const AllVariations: Story = {
    render: (args) => {
        const fb = new FormBuilder();
        const form: FormGroup = fb.group({
            option: ['', [Validators.required]]
        });

        return {
            props: {
                ...args,
                form,
                optionControl: form.get('option'),
            },
            template: `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-weight: bold; margin-bottom: 8px;">All Variations</h3>
                    
                    <app-radio-button
                        label="Default Radio Button"
                        value="default">
                    </app-radio-button>

                    <app-radio-button
                        label="Checked Radio Button"
                        value="checked"
                        [checked]="true">
                    </app-radio-button>

                    <app-radio-button
                        label="Disabled Radio Button"
                        value="disabled"
                        [disabled]="true">
                    </app-radio-button>

                    <app-radio-button
                        label="Required Radio Button"
                        value="required"
                        [required]="true">
                    </app-radio-button>
                </div>
            `
        };
    }
};