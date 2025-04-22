import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
    title: 'Components/Icon',
    component: IconComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A reusable icon component that loads SVG icons from the assets folder. Supports predefined sizes (xs, sm, md, lg, xl) or custom dimensions.'
            }
        }
    },
    argTypes: {
        name: {
            control: 'select',
            options: ['arrow-down', 'arrow-up', 'info', 'check', 'warning', 'close'],
            description: 'The name of the icon to load from assets/icons/{name}.svg',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            }
        },
        size: {
            control: 'select',
            options: ['custom', 'xs', 'sm', 'md', 'lg', 'xl'],
            description: 'The predefined size of the icon, or "custom" to use width and height properties',
            table: {
                type: { summary: 'custom | xs | sm | md | lg | xl' },
                defaultValue: { summary: 'custom' },
            }
        },
        width: {
            control: { type: 'number', min: 8, max: 200 },
            description: 'Custom width in pixels (only used when size is "custom")',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '40' },
            }
        },
        height: {
            control: { type: 'number', min: 8, max: 200 },
            description: 'Custom height in pixels (only used when size is "custom")',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '40' },
            }
        },
        color: {
            control: 'text',
            description: 'The color of the icon (CSS color or predefined theme color)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'currentColor' },
            }
        },
        customClass: {
            control: 'text',
            description: 'Additional CSS classes to apply to the icon',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            }
        }
    },
    args: {
        name: 'arrow-down',
        size: 'custom',
        width: 40,
        height: 40,
        color: 'currentColor',
        customClass: '',
    },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Default: Story = {
    args: {
        name: 'arrow-down',
        color: "black"
    },
    parameters: {
        docs: {
            description: {
                story: 'Default icon with custom size of 40x40 pixels'
            }
        }
    }
};

export const CustomSized: Story = {
    args: {
        name: 'info',
        width: 64,
        height: 64,
        color: 'blue'
    },
    parameters: {
        docs: {
            description: {
                story: 'Custom sized icon of 64x64 pixels'
            }
        }
    }
};

export const NonSquareIcon: Story = {
    args: {
        name: 'arrow-down',
        width: 80,
        height: 40,
        color: 'purple'
    },
    parameters: {
        docs: {
            description: {
                story: 'Non-square icon with different width and height values'
            }
        }
    }
};

export const SmallIcon: Story = {
    args: {
        name: 'info',
        size: 'sm'
    }
};

export const LargeIcon: Story = {
    args: {
        name: 'info',
        size: 'xl'
    }
};

export const CustomColor: Story = {
    args: {
        name: 'warning',
        color: '#3b82f6',
        size: 'lg'
    }
};

export const WithCustomClass: Story = {
    args: {
        name: 'arrow-down',
        customClass: 'rotate-180'
    }
};

export const IconSizes: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 20px; align-items: center;">
        <div style="text-align: center">
          <app-icon name="info" size="xs"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">XS</p>
        </div>
        <div style="text-align: center">
          <app-icon name="info" size="sm"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">SM</p>
        </div>
        <div style="text-align: center">
          <app-icon name="info" size="md"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">MD</p>
        </div>
        <div style="text-align: center">
          <app-icon name="info" size="lg"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">LG</p>
        </div>
        <div style="text-align: center">
          <app-icon name="info" size="xl"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">XL</p>
        </div>
        <div style="text-align: center">
          <app-icon name="info" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">Custom (40x40)</p>
        </div>
      </div>
    `,
    })
};

export const CustomSizesShowcase: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <h3>Custom Sized Icons</h3>
        <div style="display: flex; gap: 20px; align-items: center;">
          <div style="text-align: center">
            <app-icon name="info" size="custom" width="24" height="24"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">24x24</p>
          </div>
          <div style="text-align: center">
            <app-icon name="info" size="custom" width="40" height="40"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">40x40 (Default)</p>
          </div>
          <div style="text-align: center">
            <app-icon name="info" size="custom" width="60" height="60"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">60x60</p>
          </div>
          <div style="text-align: center">
            <app-icon name="info" size="custom" width="80" height="80"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">80x80</p>
          </div>
        </div>
        
        <h3>Non-Square Icons</h3>
        <div style="display: flex; gap: 20px; align-items: center;">
          <div style="text-align: center">
            <app-icon name="arrow-down" size="custom" width="60" height="30"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">60x30</p>
          </div>
          <div style="text-align: center">
            <app-icon name="arrow-down" size="custom" width="30" height="60"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">30x60</p>
          </div>
          <div style="text-align: center">
            <app-icon name="warning" size="custom" width="80" height="40"></app-icon>
            <p style="margin-top: 8px; font-size: 12px">80x40</p>
          </div>
        </div>
      </div>
    `,
    })
};

export const IconGallery: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 400px;">
        <div style="text-align: center">
          <app-icon name="arrow-down" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">arrow-down</p>
        </div>
        <div style="text-align: center">
          <app-icon name="arrow-up" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">arrow-up</p>
        </div>
        <div style="text-align: center">
          <app-icon name="info" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">info</p>
        </div>
        <div style="text-align: center">
          <app-icon name="check" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">check</p>
        </div>
        <div style="text-align: center">
          <app-icon name="warning" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">warning</p>
        </div>
        <div style="text-align: center">
          <app-icon name="close" size="custom" width="40" height="40"></app-icon>
          <p style="margin-top: 8px; font-size: 12px">close</p>
        </div>
      </div>
    `,
    })
};