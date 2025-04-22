import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

import { ActionModalComponent } from './action-modal.component';

const meta: Meta<ActionModalComponent> = {
    title: 'Components/ActionModal',
    component: ActionModalComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile action modal component that can be used for notifications, confirmations, or promotional content.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title of the modal',
        },
        description: {
            control: 'text',
            description: 'Description text of the modal',
        },
        iconSrc: {
            control: 'text',
            description: 'URL for the icon (optional)',
        },
        buttons: {
            control: 'object',
            description: 'Array of action buttons',
        },
        variant: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Layout variant of the modal',
        },
        buttonClick: {
            action: 'buttonClicked',
            description: 'Event emitted when a button is clicked',
        },
        customClass: {
            control: 'text',
            description: 'Custom class for the modal',
        },
        modalClass: {
            control: 'text',
            description: 'Custom class for the modal content',
        },
        contentClass: {
            control: 'text',
            description: 'Custom class for the modal content',
        },
        titleClass: {
            control: 'text',
            description: 'Custom class for the modal title',
        },
        descriptionClass: {
            control: 'text',
            description: 'Custom class for the modal description',
        },
        buttonClass: {
            control: 'text',
            description: 'Custom class for the modal buttons',
        },
        iconClass: {
            control: 'text',
            description: 'Custom class for the modal icon',
        },
    },
};

export default meta;
type Story = StoryObj<ActionModalComponent>;


// Base story
export const Default: Story = {
    args: {
        title: 'The title goes here',
        description: 'Discover top stocks investors are buying and track market trends.',
        iconSrc: 'assets/icons/play.svg',
        buttons: [
            { label: 'Field Text', color: 'danger', action: 'field1' },
            { label: 'Field Text', color: 'success', action: 'field2' },
        ],
        variant: 'vertical',
        buttonClick: action('Button clicked'),
    },
};

// Vertical layout with icon
export const VerticalWithIcon: Story = {
    args: {
        ...Default.args,
        variant: 'vertical',
    },
    parameters: {
        docs: {
            description: {
                story: 'Vertical layout with centered content and icon on top.',
            },
        },
    },
};

// Horizontal layout with icon
export const HorizontalWithIcon: Story = {
    args: {
        ...Default.args,
        variant: 'horizontal',
    },
    parameters: {
        docs: {
            description: {
                story: 'Horizontal layout with left-aligned content and icon to the left.',
            },
        },
    },
};

// No icon
export const NoIcon: Story = {
    args: {
        ...Default.args,
        iconSrc: null,
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal without an icon.',
            },
        },
    },
};

// Multiple buttons
export const MultipleButtons: Story = {
    args: {
        ...Default.args,
        buttons: [
            { label: 'Cancel', color: 'secondary', action: 'cancel' },
            { label: 'Delete', color: 'danger', action: 'delete' },
            { label: 'Save', color: 'primary', action: 'save' },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal with multiple action buttons.',
            },
        },
    },
};

// Single button
export const SingleButton: Story = {
    args: {
        ...Default.args,
        buttons: [
            { label: 'Got it', color: 'primary', action: 'acknowledge' },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal with a single action button.',
            },
        },
    },
};

// Confirmation dialog example
export const ConfirmationDialog: Story = {
    args: {
        title: 'Delete this item?',
        description: 'This action cannot be undone. The item will be permanently removed from your account.',
        iconSrc: 'assets/icons/warning.svg',
        buttons: [
            { label: 'Cancel', color: 'secondary', action: 'cancel' },
            { label: 'Delete', color: 'danger', action: 'delete' },
        ],
        variant: 'vertical',
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of using the action modal as a confirmation dialog.',
            },
        },
    },
};

// Success notification example
export const SuccessNotification: Story = {
    args: {
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully. You will receive a confirmation email shortly.',
        iconSrc: 'assets/icons/check.svg',
        buttons: [
            { label: 'View Receipt', color: 'secondary', action: 'receipt' },
            { label: 'Continue', color: 'success', action: 'continue' },
        ],
        variant: 'vertical',
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of using the action modal as a success notification.',
            },
        },
    },
};

// Feature promotion example
export const FeaturePromotion: Story = {
    args: {
        title: 'New Feature Available',
        description: 'Try our new portfolio analysis tool to get insights on your investments and optimize your returns.',
        iconSrc: 'assets/icons/star.svg',
        buttons: [
            { label: 'Not Now', color: 'secondary', action: 'dismiss' },
            { label: 'Try it', color: 'primary', action: 'try' },
        ],
        variant: 'horizontal',
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of using the action modal to promote a new feature.',
            },
        },
    },
};

// Long content
export const LongContent: Story = {
    args: {
        title: 'Terms and Conditions Update',
        description: 'We have updated our terms and conditions. Please review the changes and accept the new terms to continue using our services. The main changes include updates to our privacy policy and data handling procedures. These changes will take effect on January 1, 2023.',
        iconSrc: 'assets/icons/document.svg',
        buttons: [
            { label: 'Decline', color: 'secondary', action: 'decline' },
            { label: 'Accept', color: 'primary', action: 'accept' },
        ],
        variant: 'vertical',
    },
    parameters: {
        docs: {
            description: {
                story: 'Modal with longer content to demonstrate text wrapping behavior.',
            },
        },
    },
};

// Mobile view
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
                story: 'Action modal in a mobile viewport.',
            },
        },
    },
};

// Custom styling example
export const CustomStyling: Story = {
    args: {
        title: 'Custom Styled Modal',
        description: 'This modal demonstrates various custom styling options available.',
        iconSrc: 'assets/icons/star.svg',
        buttons: [
            { label: 'Cancel', color: 'secondary', action: 'cancel' },
            { label: 'Confirm', color: 'primary', action: 'confirm' },
        ],
        variant: 'vertical',
        customClass: 'custom-modal',
        modalClass: 'glass-effect',
        contentClass: 'custom-content',
        titleClass: 'custom-title',
        descriptionClass: 'custom-description',
        buttonClass: 'custom-button',
        iconClass: 'custom-icon'
    },
    parameters: {
        docs: {
            description: {
                story: `
# Action Modal Custom Styling Guide

## Basic Usage
The action modal component can be styled using various custom classes:

\`\`\`typescript
<app-action-modal
  [title]="title"
  [description]="description"
  [buttons]="buttons"
  customClass="custom-modal"
  modalClass="glass-effect"
  contentClass="custom-content"
  titleClass="custom-title"
  descriptionClass="custom-description"
  buttonClass="custom-button"
  iconClass="custom-icon">
</app-action-modal>
\`\`\`

## CSS Variables
The component supports the following CSS variables for styling:

\`\`\`css
:root {
  --modal-bg: #ffffff;
  --modal-border-radius: 12px;
  --modal-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --modal-padding: 32px 24px 24px 24px;
  
  --title-color: #0D121C;
  --title-size: 16px;
  --title-weight: 500;
  
  --description-color: #4B5565;
  --description-size: 14px;
  
  --button-padding: 14px 16px;
  --button-border-radius: 6px;
  --button-hover-opacity: 0.9;
  
  --icon-bg: #F5F9FF;
  --icon-color: #0F6AF3;
  --icon-size: 48px;
}
\`\`\`

## Custom Styling Examples

### 1. Glass Effect Modal
\`\`\`css
.glass-effect {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
\`\`\`

### 2. Custom Button Styles
\`\`\`css
.custom-button {
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
\`\`\`

### 3. Custom Icon Container
\`\`\`css
.custom-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(118, 75, 162, 0.2);
}
\`\`\`

## Best Practices
1. Use CSS variables for consistent theming
2. Keep custom classes focused and specific
3. Consider mobile responsiveness in your styles
4. Maintain proper contrast for accessibility
5. Use transitions for interactive elements
`
            }
        }
    },
    decorators: [
        (story) => ({
            ...story(),
            template: `
                <div class="custom-styling-container">
                    <style>
                        .custom-styling-container {
                            --modal-bg: #ffffff;
                            --modal-border-radius: 12px;
                            --modal-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                            --modal-padding: 32px 24px 24px 24px;
                            
                            --title-color: #0D121C;
                            --title-size: 16px;
                            --title-weight: 500;
                            
                            --description-color: #4B5565;
                            --description-size: 14px;
                            
                            --button-padding: 14px 16px;
                            --button-border-radius: 6px;
                            --button-hover-opacity: 0.9;
                            
                            --icon-bg: #F5F9FF;
                            --icon-color: #0F6AF3;
                            --icon-size: 48px;
                        }

                        .glass-effect {
                            background: rgba(255, 255, 255, 0.8);
                            backdrop-filter: blur(10px);
                            border: 1px solid rgba(255, 255, 255, 0.2);
                        }

                        .custom-content {
                            padding: 20px;
                        }

                        .custom-title {
                            font-size: 20px;
                            font-weight: 600;
                            color: #1a1a1a;
                        }

                        .custom-description {
                            font-size: 15px;
                            line-height: 1.6;
                            color: #666;
                        }

                        .custom-button {
                            border-radius: 20px;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                            transition: all 0.3s ease;
                        }

                        .custom-button:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }

                        .custom-icon {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            box-shadow: 0 4px 12px rgba(118, 75, 162, 0.2);
                        }
                    </style>
                    ${story().template}
                </div>
            `
        })
    ]
};

// Funky customization example
export const FunkyCustomization: Story = {
    args: {
        title: 'Funky Styled Modal',
        description: 'This modal demonstrates all possible customizations with vibrant colors!',
        iconSrc: 'assets/icons/star.svg',
        buttons: [
            { label: 'Cancel', color: 'secondary', action: 'cancel' },
            { label: 'Confirm', color: 'primary', action: 'confirm' },
        ],
        variant: 'vertical',
        customClass: 'funky-modal',
        modalClass: 'neon-effect',
        contentClass: 'funky-content',
        titleClass: 'funky-title',
        descriptionClass: 'funky-description',
        buttonClass: 'funky-button',
        iconClass: 'funky-icon'
    },
    parameters: {
        docs: {
            description: {
                story: `
# Funky Customization Example

This example demonstrates all possible customizations with vibrant colors and effects.

\`\`\`typescript
<app-action-modal
  title="Funky Styled Modal"
  description="This modal demonstrates all possible customizations with vibrant colors!"
  [buttons]="buttons"
  variant="vertical"
  customClass="funky-modal"
  modalClass="neon-effect"
  contentClass="funky-content"
  titleClass="funky-title"
  descriptionClass="funky-description"
  buttonClass="funky-button"
  iconClass="funky-icon">
</app-action-modal>
\`\`\`
`
            }
        }
    },
    decorators: [
        (story) => ({
            ...story(),
            template: `
                <div class="funky-styling-container">
                    <style>
                        .funky-styling-container {
                            --modal-bg: #1a1a1a;
                            --modal-border-radius: 20px;
                            --modal-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
                            --modal-padding: 32px 24px 24px 24px;
                            
                            --title-color: #ff00ff;
                            --title-size: 24px;
                            --title-weight: 700;
                            
                            --description-color: #00ffff;
                            --description-size: 16px;
                            
                            --button-padding: 16px 24px;
                            --button-border-radius: 30px;
                            --button-hover-opacity: 0.8;
                            
                            --icon-bg: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
                            --icon-color: #ffffff;
                            --icon-size: 60px;
                        }

                        .neon-effect {
                            background: rgba(26, 26, 26, 0.9);
                            backdrop-filter: blur(10px);
                            border: 2px solid rgba(255, 0, 255, 0.3);
                            box-shadow: 0 0 20px rgba(255, 0, 255, 0.3),
                                        0 0 40px rgba(0, 255, 255, 0.2);
                        }

                        .funky-content {
                            padding: 24px;
                            background: rgba(255, 255, 255, 0.05);
                            border-radius: 16px;
                        }

                        .funky-title {
                            font-size: 24px;
                            font-weight: 700;
                            color: #ff00ff;
                            text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
                            margin-bottom: 16px;
                        }

                        .funky-description {
                            font-size: 16px;
                            line-height: 1.6;
                            color: #00ffff;
                            text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
                            margin-bottom: 24px;
                        }

                        .funky-button {
                            border-radius: 30px;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            font-weight: 600;
                            transition: all 0.3s ease;
                            border: 2px solid transparent;
                            background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
                            color: white;
                            text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                        }

                        .funky-button:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
                            border-color: #ffffff;
                        }

                        .funky-icon {
                            width: 60px;
                            height: 60px;
                            background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
                            box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
                            border: 2px solid #ffffff;
                            animation: pulse 2s infinite;
                        }

                        @keyframes pulse {
                            0% {
                                box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
                            }
                            50% {
                                box-shadow: 0 0 30px rgba(255, 0, 255, 0.6),
                                           0 0 40px rgba(0, 255, 255, 0.4);
                            }
                            100% {
                                box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
                            }
                        }

                        .primary-button {
                            background: linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);
                        }

                        .secondary-button {
                            background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%);
                        }
                    </style>
                    ${story().template}
                </div>
            `
        })
    ]
};