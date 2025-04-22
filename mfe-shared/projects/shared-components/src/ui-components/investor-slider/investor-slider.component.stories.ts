import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CommonModule } from '@angular/common';

import { InvestorSliderComponent } from './investor-slider.component';

const meta: Meta<InvestorSliderComponent> = {
    title: 'Progress/InvestorSlider',
    component: InvestorSliderComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A customizable slider component for investment allocation with increment and decrement controls.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title displayed above the slider',
            table: {
                type: { summary: 'string' },
            }
        },
        description: {
            control: 'text',
            description: 'Description text displayed below the title',
            table: {
                type: { summary: 'string' },
            }
        },
        value: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Current value of the slider (0-100)',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: "50" },
            }
        },
        valueChange: {
            action: 'valueChanged',
            description: 'Event emitted when the slider value changes',
            table: {
                type: { summary: 'EventEmitter<number>' },
            }
        },
        increment: {
            action: 'incremented',
            description: 'Method called when the increment button is clicked',
            table: {
                type: { summary: 'function' },
            }
        },
        decrement: {
            action: 'decremented',
            description: 'Method called when the decrement button is clicked',
            table: {
                type: { summary: 'function' },
            }
        },
    },
};

export default meta;
type Story = StoryObj<InvestorSliderComponent>;

// Base story with common properties
export const Default: Story = {
    args: {
        title: 'Risk Tolerance',
        description: 'Adjust your risk tolerance level',
        value: 50,
        valueChange: action('value changed'),
    },
};

export const LowValue: Story = {
    args: {
        ...Default.args,
        title: 'Conservative Allocation',
        description: 'Low-risk investment strategy',
        value: 20,
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider set to a low value, representing a conservative investment strategy.',
            },
        },
    },
};

export const HighValue: Story = {
    args: {
        ...Default.args,
        title: 'Aggressive Allocation',
        description: 'High-risk investment strategy',
        value: 80,
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider set to a high value, representing an aggressive investment strategy.',
            },
        },
    },
};

export const CustomStep: Story = {
    args: {
        ...Default.args,
        title: 'Fine Tuning',
        description: 'Precise control with smaller steps',
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider with a smaller step size for more granular control.',
            },
        },
    },
};

export const AssetAllocation: Story = {
    args: {
        ...Default.args,
        title: 'Stock Allocation',
        description: 'Percentage of portfolio allocated to stocks',
        value: 60,
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of using the slider for portfolio asset allocation.',
            },
        },
    },
};

export const RetirementPlanning: Story = {
    args: {
        ...Default.args,
        title: 'Retirement Age',
        description: 'Adjust your target retirement age',
        value: 65,
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider with custom range for retirement age planning.',
            },
        },
    },
};

export const ContributionPercentage: Story = {
    args: {
        ...Default.args,
        title: '401(k) Contribution',
        description: 'Percentage of salary to contribute',
        value: 10,
    },
    parameters: {
        docs: {
            description: {
                story: 'Slider for selecting contribution percentage with custom range.',
            },
        },
    },
};

// A story with long text to test overflow handling
export const LongText: Story = {
    args: {
        ...Default.args,
        title: 'This is a very long title that might wrap to multiple lines in the component',
        description: 'This is a much longer description that contains detailed information about what this slider controls. It should demonstrate how the component handles longer text content and maintains its design integrity.',
    },
    parameters: {
        docs: {
            description: {
                story: 'Testing how the component handles long title and description text.',
            },
        },
    },
};

// A story showcasing multiple sliders in context
export const InvestmentDashboard: Story = {
    render: (args) => ({
        template: `
      <div style="max-width: 800px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h2 style="margin-top: 0; margin-bottom: 20px;">Investment Preferences</h2>
        
        <div style="display: grid; gap: 24px;">
          <app-investor-slider 
            [title]="'Risk Tolerance'" 
            [description]="'Set your overall investment risk level'" 
            [value]="50"
            [step]="10"
            (valueChange)="onValueChange('risk', $event)">
          </app-investor-slider>
          
          <app-investor-slider 
            [title]="'Stock Allocation'" 
            [description]="'Percentage of portfolio in stocks'" 
            [value]="60"
            [step]="5"
            (valueChange)="onValueChange('stocks', $event)">
          </app-investor-slider>
          
          <app-investor-slider 
            [title]="'Bond Allocation'" 
            [description]="'Percentage of portfolio in bonds'" 
            [value]="30"
            [step]="5"
            (valueChange)="onValueChange('bonds', $event)">
          </app-investor-slider>
          
          <app-investor-slider 
            [title]="'Cash Reserve'" 
            [description]="'Percentage to keep as cash/liquid assets'" 
            [value]="10"
            [step]="5"
            (valueChange)="onValueChange('cash', $event)">
          </app-investor-slider>
        </div>
      </div>
    `,
        props: {
            onValueChange: (type: string, value: number) => action(`${type} value changed: ${value}`)(),
        },
    }),
    parameters: {
        docs: {
            description: {
                story: 'Multiple sliders combined in an investment dashboard layout.',
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
                story: 'Slider displayed in a mobile viewport to test responsive behavior.',
            },
        },
    },
};