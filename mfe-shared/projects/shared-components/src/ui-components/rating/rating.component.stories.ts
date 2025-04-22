import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

import { RatingComponent } from './rating.component';

const meta: Meta<RatingComponent> = {
    title: 'Progress/Rating',
    component: RatingComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable star rating component allowing users to view and select ratings.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        rating: {
            control: { type: 'number', min: 0, max: 10, step: 1 },
            description: 'Current rating value (number of filled stars)',
        },
        maxStars: {
            control: { type: 'number', min: 1, max: 10, step: 1 },
            description: 'Maximum number of stars to display',
        },
        size: {
            control: { type: 'number', min: 12, max: 64, step: 1 },
            description: 'Size of stars in pixels',
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Visual theme of the rating component',
        },
        setRating: {
            action: 'ratingChanged',
            description: 'Event emitted when rating is changed',
        },
    },
};

export default meta;
type Story = StoryObj<RatingComponent>;

// Base story with common properties
export const Default: Story = {
    args: {
        rating: 3,
        maxStars: 5,
        size: 24,
        theme: 'light',
    },
};

export const ZeroRating: Story = {
    args: {
        ...Default.args,
        rating: 0,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the rating component with no stars selected',
            },
        },
    },
};

export const FullRating: Story = {
    args: {
        ...Default.args,
        rating: 5,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the rating component with all stars selected',
            },
        },
    },
};

export const DarkTheme: Story = {
    args: {
        ...Default.args,
        theme: 'dark',
    },
    parameters: {
        backgrounds: { default: 'dark' },
        docs: {
            description: {
                story: 'Displays the rating component with dark theme styling',
            },
        },
    },
};

export const LargeStars: Story = {
    args: {
        ...Default.args,
        size: 48,
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows larger stars for better visibility',
            },
        },
    },
};

export const SmallStars: Story = {
    args: {
        ...Default.args,
        size: 16,
    },
    parameters: {
        docs: {
            description: {
                story: 'Displays smaller stars for compact layouts',
            },
        },
    },
};

export const TenStars: Story = {
    args: {
        ...Default.args,
        maxStars: 10,
        rating: 7,
    },
    parameters: {
        docs: {
            description: {
                story: 'Uses a 10-star scale instead of the default 5 stars',
            },
        },
    },
};

export const Interactive: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        docs: {
            description: {
                story: 'Fully interactive rating component - click on stars to change rating',
            },
        },
    },
    play: async ({ canvasElement, args }) => {
        // The play function can include interaction tests using Storybook's play function
        // but we're just documenting it's interactive here
    },
};

// A story showcasing different variants side by side
export const Variants: Story = {
    render: (args) => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <p>Light Theme (Default):</p>
          <app-rating [rating]="3" [maxStars]="5" [size]="24" theme="light"></app-rating>
        </div>
        
        <div>
          <p>Dark Theme:</p>
          <app-rating [rating]="3" [maxStars]="5" [size]="24" theme="dark"></app-rating>
        </div>
        
        <div>
          <p>Different Sizes:</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <app-rating [rating]="3" [maxStars]="5" [size]="16" theme="light"></app-rating>
            <app-rating [rating]="3" [maxStars]="5" [size]="24" theme="light"></app-rating>
            <app-rating [rating]="3" [maxStars]="5" [size]="32" theme="light"></app-rating>
          </div>
        </div>
        
        <div>
          <p>Different Star Counts:</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <app-rating [rating]="3" [maxStars]="3" [size]="24" theme="light"></app-rating>
            <app-rating [rating]="4" [maxStars]="5" [size]="24" theme="light"></app-rating>
            <app-rating [rating]="7" [maxStars]="10" [size]="24" theme="light"></app-rating>
          </div>
        </div>
      </div>
    `,
        props: {
            ...args,
        },
    }),
    parameters: {
        docs: {
            description: {
                story: 'Overview of different component configurations',
            },
        },
    },
};

// Story with multiple backgrounds to test visibility
export const BackgroundVariations: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        backgrounds: {
            default: 'white',
            values: [
                { name: 'white', value: '#ffffff' },
                { name: 'gray', value: '#e0e0e0' },
                { name: 'dark', value: '#333333' },
            ],
        },
        docs: {
            description: {
                story: 'Test the component on different colored backgrounds',
            },
        },
    },
};