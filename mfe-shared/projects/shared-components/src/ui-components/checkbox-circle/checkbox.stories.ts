// checkbox.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

const meta: Meta<CheckboxComponent> = {
    title: 'Forms/Checkbox',
    component: CheckboxComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled',
        },
        required: {
            control: 'boolean',
            description: 'Whether the checkbox is required',
        },
        label: {
            control: 'text',
            description: 'Label text for the checkbox',
        },
        type: {
            control: 'select',
            options: ['circle', 'square'],
            description: 'Visual style of the checkbox',
        },
        errorMessage: {
            control: 'text',
            description: 'Custom error message to display',
        },
        change: {
            action: 'changed',
            description: 'Event emitted when the checkbox state changes',
        },
    },
    args: {
        checked: false,
        disabled: false,
        required: false,
        label: 'Checkbox Label',
        type: 'circle',
    },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// Basic Examples
export const Circle: Story = {
    args: {
        label: 'Circle Checkbox',
        type: 'circle',
    },
};

export const Square: Story = {
    args: {
        label: 'Square Checkbox',
        type: 'square',
    },
};

export const CircleChecked: Story = {
    args: {
        label: 'Checked Circle Checkbox',
        checked: true,
        type: 'circle',
    },
};

export const SquareChecked: Story = {
    args: {
        label: 'Checked Square Checkbox',
        checked: true,
        type: 'square',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Checkbox',
        disabled: true,
    },
};

export const Required: Story = {
    args: {
        label: 'Required Checkbox',
        required: true,
    },
};

// Error State Examples
export const WithError: Story = {
    args: {
        label: 'Checkbox with Error',
        errorMessage: 'This field is required',
        formControl: new FormControl(false, [Validators.requiredTrue]),
    },
};

// Reactive Form Examples
export const ReactiveFormExample: Story = {
    render: (args) => {
        const fb = new FormBuilder();
        const form: FormGroup = fb.group({
            terms: [false, [Validators.requiredTrue]],
            newsletter: [true],
            notifications: [false]
        });

        return {
            props: {
                ...args,
                form,
                termsControl: form.get('terms'),
                newsletterControl: form.get('newsletter'),
                notificationsControl: form.get('notifications'),
            },
            template: `
                <form [formGroup]="form">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <h3 style="font-weight: bold; margin-bottom: 8px;">Reactive Form Example</h3>
                        
                        <app-checkbox
                            [formControl]="termsControl"
                            label="I agree to the terms and conditions"
                            type="circle"
                            [errorMessage]="'You must agree to the terms'">
                        </app-checkbox>
                        
                        <app-checkbox
                            [formControl]="newsletterControl"
                            label="Subscribe to newsletter"
                            type="circle">
                        </app-checkbox>
                        
                        <app-checkbox
                            [formControl]="notificationsControl"
                            label="Enable notifications"
                            type="circle">
                        </app-checkbox>

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
            terms: [false, [Validators.requiredTrue]]
        });

        return {
            props: {
                ...args,
                form,
                termsControl: form.get('terms'),
            },
            template: `
                <form [formGroup]="form">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <h3 style="font-weight: bold; margin-bottom: 8px;">Reactive Form with Validation</h3>
                        
                        <app-checkbox
                            [formControl]="termsControl"
                            label="I agree to the terms and conditions"
                            type="circle"
                            required>
                        </app-checkbox>

                        <div style="margin-top: 16px; padding: 8px; background: #f5f5f5; border-radius: 4px;">
                            <p style="margin: 0;">Form Value:</p>
                            <pre>{{ form.value | json }}</pre>
                            <p style="margin: 8px 0 0 0;">Form Valid:</p>
                            <pre>{{ form.valid }}</pre>
                            <p style="margin: 8px 0 0 0;">Form Errors:</p>
                            <pre>{{ form.get('terms')?.errors | json }}</pre>
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
            terms: [false, [Validators.requiredTrue]],
        });

        return {
            props: {
                ...args,
                form,
                termsControl: form.get('terms'),
            },
            template: `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-weight: bold; margin-bottom: 8px;">Circle Style</h3>
                    <app-checkbox label="Default Circle" type="circle"></app-checkbox>
                    <app-checkbox label="Checked Circle" type="circle" [checked]="true"></app-checkbox>
                    <app-checkbox label="Disabled Circle" type="circle" [disabled]="true"></app-checkbox>
                    <app-checkbox label="Checked & Disabled Circle" type="circle" [checked]="true" [disabled]="true"></app-checkbox>
                    <app-checkbox label="Required Circle" type="circle" [required]="true"></app-checkbox>
                
                    
                    <h3 style="font-weight: bold; margin-top: 16px; margin-bottom: 8px;">Square Style</h3>
                    <app-checkbox label="Default Square" type="square"></app-checkbox>
                    <app-checkbox label="Checked Square" type="square" [checked]="true"></app-checkbox>
                    <app-checkbox label="Disabled Square" type="square" [disabled]="true"></app-checkbox>
                    <app-checkbox label="Checked & Disabled Square" type="square" [checked]="true" [disabled]="true"></app-checkbox>
                    <app-checkbox label="Required Square" type="square" [required]="true"></app-checkbox>
                </div>
            `
        };
    }
};