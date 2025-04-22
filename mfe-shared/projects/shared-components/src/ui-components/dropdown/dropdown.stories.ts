// dropdown.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownComponent } from './dropdown.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const meta: Meta<DropdownComponent> = {
    title: 'Forms/Dropdown',
    component: DropdownComponent,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Main label text',
            defaultValue: 'Select an Option'
        },
        options: {
            control: { type: 'object' },
            description: 'List of dropdown options',
            defaultValue: ['Option 1', 'Option 2', 'Option 3']
        },
        supportingText: {
            control: { type: 'text' },
            description: 'Supporting text below the dropdown',
            defaultValue: 'Choose one from the list'
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder Text',
            defaultValue: 'e.g., $25K to $100K'
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the dropdown is disabled',
            defaultValue: false
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the dropdown is required',
            defaultValue: false
        },
        fullWidth: {
            control: { type: 'boolean' },
            description: 'Whether the dropdown should take full width',
            defaultValue: false
        },
        customClass: {
            control: { type: 'text' },
            description: 'Custom CSS class to apply to the dropdown',
            defaultValue: undefined
        },
        selectionChange: {
            action: 'selectionChange',
            description: 'Event emitted when an option is selected'
        }
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Default: Story = {
    args: {
        label: 'Select an Option',
        options: ['Option 1', 'Option 2', 'Option 3'],
        placeholder: 'e.g., $25K to $100K',
        supportingText: 'Choose one from the list',
        disabled: false,
        required: false
    }
};

export const States: Story = {
    render: () => ({
        template: `
            <div style="padding: 24px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 800px;">
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Default</h3>
                    <app-dropdown 
                        label="Select an Option" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Choose one from the list">
                    </app-dropdown>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Disabled</h3>
                    <app-dropdown 
                        label="Select an Option" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Choose one from the list"
                        [disabled]="true">
                    </app-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Required</h3>
                    <app-dropdown 
                        label="Select an Option" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Choose one from the list"
                        [required]="true">
                    </app-dropdown>
                </div>

                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">With Error</h3>
                    <app-dropdown 
                        label="Select an Option" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Choose one from the list"
                        [required]="true"
                        class="error">
                    </app-dropdown>
                </div>
            </div>
        `,
        styles: [`
            .error {
                ::ng-deep {
                    .dropdown-box {
                        border-color: #FF0000;
                    }
                    .dropdown-label {
                        color: #FF0000;
                    }
                }
            }
        `]
    })
};

export const WidthExamples: Story = {
    render: () => ({
        template: `
            <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px; max-width: 800px; margin: 0 auto;">
                <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 16px;">Width Examples</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- Default width -->
                    <app-dropdown 
                        label="Default Width" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Takes natural width">
                    </app-dropdown>

                    <!-- Full width -->
                    <app-dropdown 
                        label="Full Width" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Takes full available width"
                        [fullWidth]="true">
                    </app-dropdown>

                    <!-- Custom width -->
                    <app-dropdown 
                        label="Custom Width (200px)" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Fixed width of 200px"
                        customClass="custom-width">
                    </app-dropdown>

                    <!-- Percentage width -->
                    <app-dropdown 
                        label="Percentage Width (50%)" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="50% of container width"
                        customClass="percentage-width">
                    </app-dropdown>
                </div>
            </div>
        `,
        styles: [`
            .custom-width {
                ::ng-deep {
                    .dropdown-box {
                        width: 200px;
                    }
                }
            }

            .percentage-width {
                ::ng-deep {
                    .dropdown-box {
                        width: 50%;
                    }
                }
            }
        `]
    })
};

export const CustomStyles: Story = {
    render: () => ({
        template: `
            <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px; max-width: 800px; margin: 0 auto;">
                <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 16px;">Custom Style Examples</h3>
                <div style="display: flex; flex-direction: row; gap: 16px;">
                    <!-- Rounded corners -->
                    <app-dropdown 
                        label="Rounded Corners" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Fully rounded corners"
                        customClass="rounded-corners">
                    </app-dropdown>

                    <!-- Custom colors -->
                    <app-dropdown 
                        label="Custom Colors" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Purple theme"
                        customClass="purple-theme">
                    </app-dropdown>

                    <!-- Custom hover effect -->
                    <app-dropdown 
                        label="Hover Effect" 
                        [options]="['Option 1', 'Option 2', 'Option 3']"
                        placeholder="e.g., $25K to $100K"
                        supportingText="Scale on hover"
                        customClass="hover-scale">
                    </app-dropdown>
                </div>
            </div>
        `,
        styles: [`
            .rounded-corners {
                ::ng-deep {
                    .dropdown-box {
                        border-radius: 9999px;
                    }
                }
            }

            .purple-theme {
                ::ng-deep {
                    .dropdown-box {
                        border-color: purple;
                        &:hover {
                            border-color: darkpurple;
                        }
                    }
                    .dropdown-label {
                        color: purple;
                    }
                }
            }

            .hover-scale {
                ::ng-deep {
                    .dropdown-box {
                        transition: transform 0.2s;
                        &:hover {
                            transform: scale(1.02);
                        }
                    }
                }
            }
        `]
    })
};

export const WithFormValidation: Story = {
    render: () => {
        const fb = new FormBuilder();
        const form = fb.group({
            dropdown: ['', Validators.required]
        });

        return {
            props: {
                form,
                onSubmit: () => {
                    if (form.valid) {
                        console.log('Form submitted:', form.value);
                    }
                },
                onSelectionChange: (value: string) => {
                    const control = form.get('dropdown');
                    if (control) {
                        control.setValue(value);
                        control.markAsTouched();
                    }
                }
            },
            template: `
                <form [formGroup]="form" (ngSubmit)="onSubmit()">
                    <div style="padding: 24px; max-width: 400px;">
                        <h3 style="margin-bottom: 16px; font-size: 18px; font-weight: 500;">Form with Validation</h3>
                        <app-dropdown 
                            label="Select an Option" 
                            [options]="['Option 1', 'Option 2', 'Option 3']"
                            placeholder="e.g., $25K to $100K"
                            supportingText="Choose one from the list"
                            [required]="true"
                            [formControl]="form.get('dropdown')"
                            (selectionChange)="onSelectionChange($event)">
                        </app-dropdown>
                        
                        <div style="margin-top: 24px;">
                            <button 
                                type="submit"
                                [disabled]="!form.valid"
                                (click)="onSubmit()"
                                style="
                                    background-color: #1976d2;
                                    color: white;
                                    border: none;
                                    padding: 8px 16px;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    font-size: 14px;
                                    transition: all 0.2s;
                                "
                                [style.backgroundColor]="!form.valid ? '#ccc' : '#1976d2'"
                                [style.cursor]="!form.valid ? 'not-allowed' : 'pointer'"
                                [style.boxShadow]="!form.valid ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'">
                                Submit
                            </button>
                        </div>

                        <div style="margin-top: 16px; font-size: 14px; color: #666;">
                            Form Status: {{ form.valid ? 'Valid' : 'Invalid' }}
                        </div>
                        <div style="margin-top: 8px; font-size: 14px; color: #666;">
                            Selected Value: {{ form.get('dropdown')?.value || 'None' }}
                        </div>
                    </div>
                </form>
            `
        };
    }
};