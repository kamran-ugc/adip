import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
    title: 'Components/Notification/Toast',
    component: ToastComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A dismissable toast notification component with different sentiment variations.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title text of the toast',
        },
        message: {
            control: 'text',
            description: 'Body message of the toast',
        },
        sentiment: {
            control: 'select',
            options: ['regular', 'warning', 'success', 'error'],
            description: 'Visual sentiment of the toast that affects colors',
        },
        iconSrc: {
            control: 'text',
            description: 'Custom icon source URL (optional)',
        },
        dismissed: {
            action: 'dismissed',
            description: 'Event emitted when the toast is dismissed',
        },
    },
};

export default meta;
type Story = StoryObj<ToastComponent>;

// Base story with common properties
export const Regular: Story = {
    args: {
        title: 'The title goes here',
        message: 'Discover top stocks investors are buying and track market trends.',
        sentiment: 'regular',
        iconSrc: '',
        dismissed: action('toast dismissed'),
    },
};

export const Warning: Story = {
    args: {
        ...Regular.args,
        title: 'The title goes here',
        sentiment: 'warning',
        iconSrc: '',
    },
};

export const Success: Story = {
    args: {
        ...Regular.args,
        title: 'The title goes here',
        sentiment: 'success',
        iconSrc: '',
    },
};

export const Error: Story = {
    args: {
        ...Regular.args,
        title: 'The title goes here',
        sentiment: 'error',
        iconSrc: '',
    },
};

export const LongTitle: Story = {
    args: {
        ...Regular.args,
        title: 'This is a very long title that might wrap to multiple lines in some cases',
    },
};

export const LongMessage: Story = {
    args: {
        ...Regular.args,
        message: 'This is a much longer message that contains more detailed information. It might wrap to multiple lines depending on the container width. The toast should handle this gracefully and maintain its design integrity.',
    },
};

export const CustomIcon: Story = {
    args: {
        ...Regular.args,
        title: 'Custom Icon Toast',
        iconSrc: '',
    },
};

// A story showcasing all toast variations together
export const AllVariations: Story = {
    render: (args) => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 420px;">
        <app-toast 
          [title]="'Regular Toast'"
          [message]="message"
          [sentiment]="'regular'"
          (dismissed)="onDismiss('regular')">
        </app-toast>
        
        <app-toast 
          [title]="'Warning Toast'"
          [message]="message"
          [sentiment]="'warning'"
          (dismissed)="onDismiss('warning')">
        </app-toast>
        
        <app-toast 
          [title]="'Success Toast'"
          [message]="message"
          [sentiment]="'success'"
          (dismissed)="onDismiss('success')">
        </app-toast>
        
        <app-toast 
          [title]="'Error Toast'"
          [message]="message"
          [sentiment]="'error'"
          (dismissed)="onDismiss('error')">
        </app-toast>
      </div>
    `,
        props: {
            message: args.message,
            onDismiss: (type: string) => action(`${type} toast dismissed`)(),
        },
    }),
    parameters: {
        docs: {
            description: {
                story: 'All toast sentiment variations displayed together',
            },
        },
    },
};

// Mobile viewport story
export const MobileView: Story = {
    args: {
        ...Regular.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Toast displayed in a mobile viewport',
            },
        },
    },
};