import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

import { NotificationBannerComponent } from './notification-banner.component';
import { IconComponent } from '../icon/icon.component';

const meta: Meta<NotificationBannerComponent> = {
    title: 'Components/Notification/NotificationBanner',
    component: NotificationBannerComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, IconComponent],
        }),
    ],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A notification banner component with different types, sizes, optional dismiss button, and custom styling options.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        message: {
            control: 'text',
            description: 'Message text to display in the notification',
        },
        type: {
            control: 'select',
            options: ['info', 'warning', 'success', 'note', 'custom'],
            description: 'Type of notification that affects styling and icon',
        },
        dismissible: {
            control: 'boolean',
            description: 'Whether the notification can be dismissed',
        },
        customIcon: {
            control: 'text',
            description: 'Custom icon name to use instead of the default icon for the notification type',
        },
        iconSize: {
            control: 'number',
            description: 'Size of the icon in pixels',
            defaultValue: 20,
        },
        customClass: {
            control: 'text',
            description: 'Custom CSS class to apply to the notification banner',
        },
        bannerClass: {
            control: 'text',
            description: 'Additional CSS class for the banner container',
        },
        iconClass: {
            control: 'text',
            description: 'Additional CSS class for the icon',
        },
        messageClass: {
            control: 'text',
            description: 'Additional CSS class for the message text',
        },
        dismissClass: {
            control: 'text',
            description: 'Additional CSS class for the dismiss button',
        },
        backgroundColor: {
            control: 'color',
            description: 'Custom background color (used with type="custom")',
        },
        textColor: {
            control: 'color',
            description: 'Custom text color (used with type="custom")',
        },
        dismissed: {
            action: 'dismissed',
            description: 'Event emitted when the notification is dismissed',
        },
    },
};

export default meta;
type Story = StoryObj<NotificationBannerComponent>;

// Base story with common properties
export const Default: Story = {
    args: {
        message: 'By confirming, the changes will reflect on your risk profile.',
        type: 'info',
        dismissible: false,
        iconSize: 20,
        dismissed: action('banner dismissed'),
    },
};

// Info notification variations
export const InfoRegular: Story = {
    args: {
        ...Default.args,
        type: 'info',
    },
    parameters: {
        docs: {
            description: {
                story: 'Info notification in regular size. Used for general information.',
            },
        },
    },
};

// Custom icon example
export const CustomIcon: Story = {
    args: {
        ...Default.args,
        type: 'info',
        customIcon: 'arrow-right',
        iconSize: 24,
    },
    parameters: {
        docs: {
            description: {
                story: 'Notification with a custom icon instead of the default icon for the type.',
            },
        },
    },
};

// Custom styling example with transparent background
export const CustomStyling: Story = {
    args: {
        ...Default.args,
        message: 'This banner has custom styling applied to it.',
        type: 'info',
        customIcon: 'notifications',
        dismissible: true,
        customClass: 'custom-notification',
        iconSize: 24,
    },
    render: (args) => ({
        props: args,
        template: `
            <div style="
                --info-bg-color: rgba(0, 149, 255, 0.08); 
                --info-text-color: #0066cc;
                --notification-border-left: 3px solid #0095ff;
                --notification-border-radius: 8px;
                --notification-padding: 12px 16px;
            ">
                <app-notification-banner 
                    [message]="message"
                    [type]="type"
                    [dismissible]="dismissible"
                    [customIcon]="customIcon"
                    [iconSize]="iconSize"
                    [customClass]="customClass"
                    style="box-shadow: 0 2px 8px rgba(0, 102, 204, 0.1);"
                    (dismissed)="dismissed($event)">
                </app-notification-banner>
            </div>
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Notification with semi-transparent background, custom icon, and modern subtle styling.',
            },
        },
    },
};

// More elaborate custom styling
export const FancyNotification: Story = {
    render: () => ({
        template: `
            <style>
                .fancy-notification {
                    border-radius: 12px;
                    border-left: 6px solid #9c27b0;
                    box-shadow: 0 4px 12px rgba(156, 39, 176, 0.2);
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .fancy-notification:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 16px rgba(156, 39, 176, 0.3);
                }
                .fancy-message {
                    font-weight: 500;
                    letter-spacing: 0.2px;
                }
                .fancy-icon {
                    color: #9c27b0;
                }
                .fancy-dismiss {
                    background-color: rgba(156, 39, 176, 0.1);
                }
                .fancy-dismiss:hover {
                    background-color: rgba(156, 39, 176, 0.2);
                }
            </style>
            <div style="
                --info-bg-color: rgba(156, 39, 176, 0.05); 
                --info-text-color: #6a1b9a;
                --notification-padding: 16px 20px;
                --notification-font-size: 15px;
                --notification-line-height: 1.5;
            ">
                <app-notification-banner 
                    message="This is a fancy notification with custom styling and animations!"
                    type="info"
                    [dismissible]="true"
                    customIcon="draw"
                    [iconSize]="24"
                    customClass="fancy-notification"
                    messageClass="fancy-message"
                    iconClass="fancy-icon"
                    dismissClass="fancy-dismiss">
                </app-notification-banner>
            </div>
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'An elaborate example with custom styling, transitions, and CSS variables.',
            },
        },
    },
};

// All variations example
export const AllVariations: Story = {
    render: () => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 800px;">
        <h3>Regular Types</h3>
        <app-notification-banner 
          [type]="'info'" 
          [message]="'Information notification with default styling.'"
        ></app-notification-banner>
        
        <app-notification-banner 
          [type]="'warning'" 
          [message]="'Warning notification with default styling.'"
        ></app-notification-banner>
        
        <app-notification-banner 
          [type]="'success'" 
          [message]="'Success notification with default styling.'"
        ></app-notification-banner>
        
        <app-notification-banner 
          [type]="'note'" 
          [message]="'Note notification with default styling.'"
        ></app-notification-banner>

        <h3>With Custom Icons</h3>
        <app-notification-banner 
          [type]="'info'" 
          [message]="'Info notification with custom bell icon.'"
          [customIcon]="'error'"
        ></app-notification-banner>
        
        <app-notification-banner 
          [type]="'warning'" 
          [message]="'Warning notification with custom alert icon.'"
          [customIcon]="'success'"
        ></app-notification-banner>
        
        <app-notification-banner 
          [type]="'success'" 
          [message]="'Success notification with custom thumbs-up icon.'"
          [customIcon]="'arrow-up'"
        ></app-notification-banner>
        
        <app-notification-banner 
          [type]="'note'" 
          [message]="'Note notification with custom bookmark icon.'"
          [customIcon]="'check'"
        ></app-notification-banner>

        <h3>With Custom Styling</h3>
        <div style="--success-bg-color: #e8f5e9; --success-text-color: #2e7d32;">
            <app-notification-banner 
              [type]="'success'" 
              [message]="'Success with custom green shade.'"
            ></app-notification-banner>
        </div>
        
        <div style="--warning-bg-color: #fff8e1; --warning-text-color: #ff6f00;">
            <app-notification-banner 
              [type]="'warning'" 
              [message]="'Warning with custom amber shade.'"
            ></app-notification-banner>
        </div>
        
        <div style="--info-bg-color: #e3f2fd; --info-text-color: #0d47a1;">
            <app-notification-banner 
              [type]="'info'" 
              [message]="'Info with custom blue shade.'"
            ></app-notification-banner>
        </div>
      </div>
    `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'All notification variations including types, custom icons, and custom styling.',
            },
        },
    },
};

// Mobile viewport story
export const MobileView: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Notification banner displayed in a mobile viewport.',
            },
        },
    },
};

// Custom color example using the custom type
export const RedBackground: Story = {
    args: {
        ...Default.args,
        message: 'This notification has a red background color using the custom type.',
        type: 'custom',
        dismissible: true,
        backgroundColor: '#FF0000',
        textColor: '#FFFFFF',
    },
    parameters: {
        docs: {
            description: {
                story: 'Notification with a red background color using the custom type and custom colors.',
            },
        },
    },
};

// Custom background color example
export const CustomBackground: Story = {
    args: {
        ...Default.args,
        message: 'This notification has a custom background color using classes.',
        type: 'info',
        dismissible: true,
        customClass: 'custom-bg-color',
    },
    render: (args) => ({
        props: args,
        template: `
            <style>
                .custom-bg-color {
                    background-color: #e6f7ff;
                }
            </style>
            <app-notification-banner 
                [message]="message"
                [type]="type"
                [dismissible]="dismissible"
                [customClass]="customClass"
                (dismissed)="dismissed($event)">
            </app-notification-banner>
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: 'Notification with custom background color using the customClass property.',
            },
        },
    },
};

// Custom notification with purple background
export const PurpleNotification: Story = {
    args: {
        message: 'This is a custom notification with purple styling.',
        type: 'custom',
        dismissible: true,
        customIcon: 'draw',
        iconSize: 24,
        backgroundColor: '#9c27b0',
        textColor: '#ffffff',
    },
    parameters: {
        docs: {
            description: {
                story: 'A custom notification with purple background and white text using the custom type.',
            },
        },
    },
};