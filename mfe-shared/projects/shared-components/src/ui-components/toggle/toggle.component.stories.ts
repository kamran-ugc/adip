import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
    title: 'Forms/Toggle',
    component: ToggleComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable toggle switch component that can be used for boolean input.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Sets the toggle state (on/off)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: "false" },
            }
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the toggle component',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: "false" },
            }
        },
        label: {
            control: 'text',
            description: 'Optional label for the toggle',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            }
        },
        name: {
            control: 'text',
            description: 'Name attribute for the toggle',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            }
        },
        ariaLabel: {
            control: 'text',
            description: 'Aria label for accessibility',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            }
        },
        color: {
            control: 'select',
            options: ['primary', 'success'],
            description: 'Color theme of the toggle',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            }
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Size of the toggle component',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
            }
        },
        checkedChange: {
            action: 'checkedChange',
            description: 'Event emitted when toggle state changes',
            table: {
                type: { summary: 'EventEmitter<boolean>' },
            }
        },
    },
};

export default meta;
type Story = StoryObj<ToggleComponent>;

// Base story
export const Default: Story = {
    args: {
        checked: false,
        disabled: false,
        label: '',
        name: 'toggle',
        ariaLabel: 'Toggle switch',
        color: 'primary',
        size: 'medium',
    },
    render: (args) => ({
        props: {
            ...args,
            checkedChange: action('Toggle state changed'),
        },
    }),
};

// Toggle variations
export const Unchecked: Story = {
    args: {
        ...Default.args,
        checked: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle in its OFF state.',
            },
        },
    },
};

export const Checked: Story = {
    args: {
        ...Default.args,
        checked: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle in its ON state.',
            },
        },
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled toggle that cannot be interacted with.',
            },
        },
    },
};

export const DisabledChecked: Story = {
    args: {
        ...Default.args,
        checked: true,
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled toggle in the ON state.',
            },
        },
    },
};

// Size variations
export const Small: Story = {
    args: {
        ...Default.args,
        size: 'small',
    },
    parameters: {
        docs: {
            description: {
                story: 'Small-sized toggle.',
            },
        },
    },
};

export const Medium: Story = {
    args: {
        ...Default.args,
        size: 'medium',
    },
    parameters: {
        docs: {
            description: {
                story: 'Medium-sized toggle (default).',
            },
        },
    },
};

export const Large: Story = {
    args: {
        ...Default.args,
        size: 'large',
    },
    parameters: {
        docs: {
            description: {
                story: 'Large-sized toggle.',
            },
        },
    },
};

// Color variations
export const Primary: Story = {
    args: {
        ...Default.args,
        checked: true,
        color: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle with primary (blue) color when active.',
            },
        },
    },
};

export const Success: Story = {
    args: {
        ...Default.args,
        checked: true,
        color: 'success',
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle with success (green) color when active.',
            },
        },
    },
};

// With label
export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: 'Enable notifications',
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle with an associated label.',
            },
        },
    },
};

// Interactive demo
export const Interactive: Story = {
    render: () => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <div>
          <h3 style="margin-bottom: 8px; font-size: 16px;">Toggle state: {{ isToggled ? 'ON' : 'OFF' }}</h3>
          <app-toggle [(checked)]="isToggled" (checkedChange)="onToggle($event)" label="Toggle me"></app-toggle>
        </div>
        
        <div style="margin-top: 16px;">
          <h3 style="margin-bottom: 8px; font-size: 16px;">Settings</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="margin-right: 8px;">Primary</label>
              <app-toggle [(checked)]="isPrimary" [color]="'primary'" size="small"></app-toggle>
            </div>
            <div>
              <label style="margin-right: 8px;">Success</label>
              <app-toggle [(checked)]="isSuccess" [color]="'success'" size="small"></app-toggle>
            </div>
            <div>
              <label style="margin-right: 8px;">Disabled</label>
              <app-toggle [(checked)]="isDisabled" [color]="'primary'" size="small"></app-toggle>
            </div>
          </div>
        </div>
        
        <div style="margin-top: 24px;">
          <h3 style="margin-bottom: 8px; font-size: 16px;">Result</h3>
          <app-toggle 
            [checked]="isToggled"
            [disabled]="isDisabled"
            [color]="isPrimary ? 'primary' : 'success'"
            label="Feature toggle"
            (checkedChange)="onToggle($event)">
          </app-toggle>
        </div>
      </div>
    `,
        props: {
            isToggled: false,
            isPrimary: true,
            isSuccess: false,
            isDisabled: false,
            onToggle: (state: boolean) => {
                action('Toggle changed')(state);
            }
        },
    }),
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo showing toggle customization.',
            },
        },
    },
};

// All variations
export const AllVariations: Story = {
    render: () => ({
        template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        <div>
          <h4>Default</h4>
          <app-toggle></app-toggle>
        </div>
        <div>
          <h4>Checked</h4>
          <app-toggle [checked]="true"></app-toggle>
        </div>
        <div>
          <h4>Disabled</h4>
          <app-toggle [disabled]="true"></app-toggle>
        </div>
        <div>
          <h4>Disabled & Checked</h4>
          <app-toggle [disabled]="true" [checked]="true"></app-toggle>
        </div>
        <div>
          <h4>Primary</h4>
          <app-toggle [checked]="true" color="primary"></app-toggle>
        </div>
        <div>
          <h4>Success</h4>
          <app-toggle [checked]="true" color="success"></app-toggle>
        </div>
        <div>
          <h4>Small</h4>
          <app-toggle [checked]="true" size="small"></app-toggle>
        </div>
        <div>
          <h4>Medium</h4>
          <app-toggle [checked]="true" size="medium"></app-toggle>
        </div>
        <div>
          <h4>Large</h4>
          <app-toggle [checked]="true" size="large"></app-toggle>
        </div>
        <div>
          <h4>With Label</h4>
          <app-toggle label="Label"></app-toggle>
        </div>
      </div>
    `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Overview of all toggle variations.',
            },
        },
    },
};