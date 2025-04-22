// step-progress-bar.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { StepProgressBarComponent } from './progress-bar.component';

const meta: Meta<StepProgressBarComponent> = {
  title: 'Progress/Step Progress Bar',
  component: StepProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    stepNumber: {
      control: {
        type: 'number',
        min: 1,
        max: 10
      },
      description: 'The current step number',
      defaultValue: 2
    },
    stepTitle: {
      control: 'text',
      description: 'The title of the current step',
      defaultValue: 'Application'
    },
    progress: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1
      },
      description: 'The progress percentage (0-100)',
      defaultValue: 0
    },
    variant: {
      control: 'select',
      options: ['pill', 'circle'],
      description: 'The visual variant of the progress indicator',
      defaultValue: 'pill'
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to show the percentage in the pill variant',
      defaultValue: true
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<StepProgressBarComponent>;

export const Progress0: Story = {
  args: {
    stepNumber: 2,
    stepTitle: 'Application',
    progress: 0,
    variant: 'pill',
    showPercentage: true
  }
};

export const Progress25: Story = {
  args: {
    stepNumber: 2,
    stepTitle: 'Application',
    progress: 25,
    variant: 'pill',
    showPercentage: true
  }
};

export const Progress50: Story = {
  args: {
    stepNumber: 2,
    stepTitle: 'Application',
    progress: 50,
    variant: 'pill',
    showPercentage: true
  }
};

export const Progress75: Story = {
  args: {
    stepNumber: 2,
    stepTitle: 'Application',
    progress: 75,
    variant: 'pill',
    showPercentage: true
  }
};

export const Progress100: Story = {
  args: {
    stepNumber: 2,
    stepTitle: 'Application',
    progress: 100,
    variant: 'pill',
    showPercentage: true
  }
};

export const ProgressBarShowcase: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 400px;">
        <h3 style="font-size: 18px; font-weight: 500; margin-top: 0;">Progress Steps</h3>
        
        <app-step-progress-bar 
          [stepNumber]="2" 
          [stepTitle]="'Application'" 
          [progress]="0">
        </app-step-progress-bar>
        
        <app-step-progress-bar 
          [stepNumber]="2" 
          [stepTitle]="'Application'" 
          [progress]="25">
        </app-step-progress-bar>
        
        <app-step-progress-bar 
          [stepNumber]="2" 
          [stepTitle]="'Application'" 
          [progress]="50">
        </app-step-progress-bar>
        
        <app-step-progress-bar 
          [stepNumber]="2" 
          [stepTitle]="'Application'" 
          [progress]="75">
        </app-step-progress-bar>
        
        <app-step-progress-bar 
          [stepNumber]="2" 
          [stepTitle]="'Application'" 
          [progress]="100">
        </app-step-progress-bar>
      </div>
    `
  })
};

export const Circle: Story = {
  args: {
    stepNumber: 2,
    progress: 0,
    variant: 'circle',
    showPercentage: false
  }
};

export const CircleActive: Story = {
  args: {
    stepNumber: 2,
    progress: 100,
    variant: 'circle',
    showPercentage: false
  }
};