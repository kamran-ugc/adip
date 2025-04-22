import type { Meta, StoryObj } from '@storybook/angular';
import { RangeMeterComponent } from './range-meter.component';

const meta: Meta<RangeMeterComponent> = {
  title: 'Components/Range Meter',
  component: RangeMeterComponent,
  tags: ['autodocs'],
  argTypes: {
    customClass: {
      control: 'text',
      description: 'Custom CSS class to be applied to the component',
      defaultValue: ''
    },
    min: {
      control: 'number',
      description: 'Minimum value of the range',
      defaultValue: 0
    },
    max: {
      control: 'number',
      description: 'Maximum value of the range',
      defaultValue: 100
    },
    value: {
      control: 'number',
      description: 'Current value of the range meter (will be constrained between min and max)',
      defaultValue: 75
    },
    label: {
      control: 'text',
      description: 'Label text above the range meter',
      defaultValue: 'Progress'
    },
    supportingText: {
      control: 'text',
      description: 'Supporting text below the label',
      defaultValue: 'This shows the current progress'
    },
    isCurrency: {
      control: 'boolean',
      description: 'Whether to format the value as currency',
      defaultValue: true
    },
    decimalPlaces: {
      control: 'number',
      description: 'Number of decimal places to show',
      defaultValue: 2
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<RangeMeterComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 200px;">
        <app-range-meter
          [customClass]="customClass"
          [min]="min"
          [max]="max"
          [value]="value"
          [label]="label"
          [supportingText]="supportingText"
          [isCurrency]="isCurrency"
          [decimalPlaces]="decimalPlaces">
        </app-range-meter>
      </div>
    `
  }),
  args: {
    customClass: '',
    min: 0,
    max: 100,
    value: 75,
    label: 'Progress',
    supportingText: 'This shows the current progress',
    isCurrency: true,
    decimalPlaces: 2
  }
};

export const ConstrainedValues: Story = {
  render: () => ({
    template: `
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 32px; width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Value Constraints</h3>
          
          <div>
            <p style="margin-bottom: 8px; color: #666;">Value below min (will show min):</p>
            <app-range-meter 
              [min]="0" 
              [max]="100" 
              [value]="-25" 
              label="Below Minimum"
              supportingText="Value: -25 (will show 0)">
            </app-range-meter>
          </div>
          
          <div>
            <p style="margin-bottom: 8px; color: #666;">Value within range:</p>
            <app-range-meter 
              [min]="0" 
              [max]="100" 
              [value]="50" 
              label="Within Range"
              supportingText="Value: 50">
            </app-range-meter>
          </div>
          
          <div>
            <p style="margin-bottom: 8px; color: #666;">Value above max (will show max):</p>
            <app-range-meter 
              [min]="0" 
              [max]="100" 
              [value]="150" 
              label="Above Maximum"
              supportingText="Value: 150 (will show 100)">
            </app-range-meter>
          </div>
        </div>
      </div>
    `
  })
};

export const CustomRange: Story = {
  args: {
    min: 500,
    max: 1000,
    value: 750,
    label: 'Custom Range',
    supportingText: 'Range from 500 to 1000',
    isCurrency: true,
    decimalPlaces: 2
  }
};

export const WithoutCurrency: Story = {
  args: {
    ...Default.args,
    isCurrency: false,
    label: 'Score',
    supportingText: 'Current score out of maximum'
  }
};

export const DifferentRanges: Story = {
  render: () => ({
    template: `
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 32px; width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Different Value Ranges</h3>
          <app-range-meter 
            [min]="0" 
            [max]="100" 
            [value]="25" 
            label="Low Range"
            supportingText="Value: $25.00">
          </app-range-meter>
          
          <app-range-meter 
            [min]="0" 
            [max]="100" 
            [value]="50" 
            label="Mid Range"
            supportingText="Value: $50.00">
          </app-range-meter>
          
          <app-range-meter 
            [min]="0" 
            [max]="100" 
            [value]="75" 
            label="High Range"
            supportingText="Value: $75.00">
          </app-range-meter>
        </div>
      </div>
    `
  })
};

export const WithoutLabels: Story = {
  args: {
    min: 0,
    max: 100,
    value: 75,
    isCurrency: true,
    decimalPlaces: 2
  }
};

export const WithCustomClass: Story = {
  args: {
    ...Default.args,
    customClass: 'custom-range-meter',
    label: 'Custom Styled Range Meter',
    supportingText: 'This range meter has a custom class applied'
  }
}; 