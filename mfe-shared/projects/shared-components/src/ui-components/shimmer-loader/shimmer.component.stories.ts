import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import { ShimmerLoaderComponent } from './shimmer-loader.component';

const meta: Meta<ShimmerLoaderComponent> = {
    title: 'Progress/Shimmer',
    component: ShimmerLoaderComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable shimmer loading placeholder component with configurable dimensions and border radius.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: 'text',
            description: 'Width of the shimmer (CSS value)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '100%' },
            }
        },
        height: {
            control: 'text',
            description: 'Height of the shimmer (CSS value)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '16px' },
            }
        },
        borderRadius: {
            control: 'text',
            description: 'Border radius of the shimmer (CSS value)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '4px' },
            }
        },
    },
};

export default meta;
type Story = StoryObj<ShimmerLoaderComponent>;

// Base story with common properties
export const Default: Story = {
    args: {
        width: '200px',
        height: '16px',
        borderRadius: '4px',
    },
};

export const RectangleShape: Story = {
    args: {
        width: '250px',
        height: '24px',
        borderRadius: '0',
    },
    parameters: {
        docs: {
            description: {
                story: 'A rectangular shimmer with no rounded corners',
            },
        },
    },
};

export const RoundedShape: Story = {
    args: {
        width: '250px',
        height: '24px',
        borderRadius: '12px',
    },
    parameters: {
        docs: {
            description: {
                story: 'A pill-shaped shimmer with fully rounded corners',
            },
        },
    },
};

export const CircleShape: Story = {
    args: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
    },
    parameters: {
        docs: {
            description: {
                story: 'A circular shimmer, perfect for avatar placeholders',
            },
        },
    },
};

export const ThinLine: Story = {
    args: {
        width: '100%',
        height: '8px',
        borderRadius: '2px',
    },
    parameters: {
        docs: {
            description: {
                story: 'A thin line shimmer, suitable for text line placeholders',
            },
        },
    },
};

export const ThickBlock: Story = {
    args: {
        width: '100%',
        height: '120px',
        borderRadius: '8px',
    },
    parameters: {
        docs: {
            description: {
                story: 'A larger block shimmer, suitable for image or card placeholders',
            },
        },
    },
};

// A story showcasing a common loading card layout with multiple shimmers
export const CardLayout: Story = {
    render: () => ({
        template: `
      <div style="width: 300px; padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <!-- Avatar and name area -->
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <app-shimmer width="48px" height="48px" borderRadius="50%"></app-shimmer>
          <div style="margin-left: 12px; flex: 1;">
            <app-shimmer width="120px" height="16px" borderRadius="4px" style="display: block; margin-bottom: 8px;"></app-shimmer>
            <app-shimmer width="80px" height="12px" borderRadius="4px"></app-shimmer>
          </div>
        </div>
        
        <!-- Content area -->
        <app-shimmer width="100%" height="160px" borderRadius="6px" style="margin-bottom: 16px;"></app-shimmer>
        
        <!-- Text lines area -->
        <app-shimmer width="100%" height="14px" borderRadius="4px" style="margin-bottom: 8px;"></app-shimmer>
        <app-shimmer width="92%" height="14px" borderRadius="4px" style="margin-bottom: 8px;"></app-shimmer>
        <app-shimmer width="95%" height="14px" borderRadius="4px" style="margin-bottom: 8px;"></app-shimmer>
        <app-shimmer width="70%" height="14px" borderRadius="4px"></app-shimmer>
      </div>
    `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A composite example showing how multiple shimmer components can be used together to create a card loading state',
            },
        },
    },
};

// A story showcasing a skeleton table layout
export const TableLayout: Story = {
    render: () => ({
        template: `
      <div style="width: 500px; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
        <!-- Header row -->
        <div style="display: flex; padding: 12px; background-color: #f5f5f5; border-bottom: 1px solid #e0e0e0;">
          <app-shimmer width="80px" height="20px" borderRadius="4px" style="margin-right: 12px;"></app-shimmer>
          <app-shimmer width="120px" height="20px" borderRadius="4px" style="margin-right: 12px;"></app-shimmer>
          <app-shimmer width="150px" height="20px" borderRadius="4px"></app-shimmer>
        </div>
        
        <!-- Table rows -->
        <div *ngFor="let i of [1, 2, 3, 4]" style="display: flex; padding: 12px; border-bottom: 1px solid #e0e0e0;">
          <app-shimmer width="80px" height="16px" borderRadius="4px" style="margin-right: 12px;"></app-shimmer>
          <app-shimmer width="120px" height="16px" borderRadius="4px" style="margin-right: 12px;"></app-shimmer>
          <app-shimmer width="150px" height="16px" borderRadius="4px"></app-shimmer>
        </div>
      </div>
    `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'A table loading state using multiple shimmer components',
            },
        },
    },
};

// Different background tests
export const DarkBackground: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        backgrounds: { default: 'dark' },
        docs: {
            description: {
                story: 'Shows how the shimmer appears on dark backgrounds',
            },
        },
    },
};