import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

import { SocialLoginButtonComponent } from './social-login-button.component';

const meta: Meta<SocialLoginButtonComponent> = {
    title: 'Components/SocialButton',
    component: SocialLoginButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable social media button component with icon and text.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        buttonText: {
            control: 'text',
            description: 'Text to display on the button',
            table: {
                type: { summary: 'string' },
            }
        },
        iconUrl: {
            control: 'text',
            description: 'URL to the icon image',
            table: {
                type: { summary: 'string' },
            }
        },
        onClick: {
            action: 'clicked',
            description: 'Event emitted when the button is clicked',
            table: {
                type: { summary: 'function' },
            }
        },
    },
};

export default meta;
type Story = StoryObj<SocialLoginButtonComponent>;

// Common social media icons (for demo purposes)
const socialIcons = {
    facebook: 'https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png',
    twitter: 'https://cdn3.iconfinder.com/data/icons/picons-social/57/03-twitter-512.png',
    linkedin: 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-512.png',
    google: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-512.png',
    github: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png',
    apple: 'https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-512.png',
    // Using placeholder URLs for demo
    placeholder: 'https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Location-512.png',
};

// Base story with common properties
export const Default: Story = {
    args: {
        buttonText: 'Sign in with Social',
        iconUrl: socialIcons.placeholder,
        onClick: action('button clicked'),
    },
};

export const Facebook: Story = {
    args: {
        buttonText: 'Continue with Facebook',
        iconUrl: socialIcons.facebook || socialIcons.placeholder,
        onClick: action('Facebook login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Facebook login button',
            },
        },
    },
};

export const Twitter: Story = {
    args: {
        buttonText: 'Sign in with Twitter',
        iconUrl: socialIcons.twitter || socialIcons.placeholder,
        onClick: action('Twitter login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Twitter login button',
            },
        },
    },
};

export const LinkedIn: Story = {
    args: {
        buttonText: 'Sign in with LinkedIn',
        iconUrl: socialIcons.linkedin || socialIcons.placeholder,
        onClick: action('LinkedIn login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'LinkedIn login button',
            },
        },
    },
};

export const Google: Story = {
    args: {
        buttonText: 'Sign in with Google',
        iconUrl: socialIcons.google || socialIcons.placeholder,
        onClick: action('Google login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Google login button',
            },
        },
    },
};

export const GitHub: Story = {
    args: {
        buttonText: 'Continue with GitHub',
        iconUrl: socialIcons.github || socialIcons.placeholder,
        onClick: action('GitHub login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'GitHub login button',
            },
        },
    },
};

export const Apple: Story = {
    args: {
        buttonText: 'Sign in with Apple',
        iconUrl: socialIcons.apple || socialIcons.placeholder,
        onClick: action('Apple login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Apple login button',
            },
        },
    },
};

export const TextOnly: Story = {
    args: {
        buttonText: 'Continue with Email',
        iconUrl: undefined,
        onClick: action('Email login clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Button with text only, no icon',
            },
        },
    },
};

export const LongText: Story = {
    args: {
        buttonText: 'Sign in with your social media account to access all features',
        iconUrl: socialIcons.placeholder,
        onClick: action('button clicked'),
    },
    parameters: {
        docs: {
            description: {
                story: 'Button with longer text to test text wrapping behavior',
            },
        },
    },
};

// A story showcasing all social buttons in a layout
export const SocialButtonGroup: Story = {
    render: (args) => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
        <app-social-button 
          [buttonText]="'Continue with Facebook'" 
          [iconUrl]="facebookIcon" 
          (click)="onButtonClick('facebook')">
        </app-social-button>
        
        <app-social-button 
          [buttonText]="'Continue with Google'" 
          [iconUrl]="googleIcon" 
          (click)="onButtonClick('google')">
        </app-social-button>
        
        <app-social-button 
          [buttonText]="'Continue with Apple'" 
          [iconUrl]="appleIcon" 
          (click)="onButtonClick('apple')">
        </app-social-button>
        
        <app-social-button 
          [buttonText]="'Continue with Twitter'" 
          [iconUrl]="twitterIcon" 
          (click)="onButtonClick('twitter')">
        </app-social-button>
        
        <app-social-button 
          [buttonText]="'Continue with Email'" 
          (click)="onButtonClick('email')">
        </app-social-button>
      </div>
    `,
        props: {
            facebookIcon: socialIcons.facebook || socialIcons.placeholder,
            googleIcon: socialIcons.google || socialIcons.placeholder,
            appleIcon: socialIcons.apple || socialIcons.placeholder,
            twitterIcon: socialIcons.twitter || socialIcons.placeholder,
            onButtonClick: (provider: string) => action(`${provider} login clicked`)(),
        },
    }),
    parameters: {
        docs: {
            description: {
                story: 'A group of social login buttons displayed together as typically seen in login forms',
            },
        },
    },
};

// Mobile viewport test
export const MobileView: Story = {
    args: {
        ...Google.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
        docs: {
            description: {
                story: 'Button displayed in a mobile viewport',
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
                story: 'Shows how the button appears on dark backgrounds',
            },
        },
    },
};