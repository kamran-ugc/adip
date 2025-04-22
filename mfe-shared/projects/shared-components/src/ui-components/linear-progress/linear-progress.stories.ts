import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './linear-progress.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Progress/Progress Bar',
  component: ProgressBarComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the progress bar is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const Default: Story = {
  args: {
    progress: 50,
    disabled: false,
  },
};

export const Empty: Story = {
  args: {
    progress: 0,
    disabled: false,
  },
};

export const Complete: Story = {
  args: {
    progress: 100,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    progress: 50,
    disabled: true,
  },
};

export const ProgressStages: Story = {
  render: () => ({
    props: {},
    template: `
      <div class="flex flex-col gap-4 w-80">
        <app-progress-bar [progress]="0"></app-progress-bar>
        <app-progress-bar [progress]="10"></app-progress-bar>
        <app-progress-bar [progress]="20"></app-progress-bar>
        <app-progress-bar [progress]="30"></app-progress-bar>
        <app-progress-bar [progress]="40"></app-progress-bar>
        <app-progress-bar [progress]="50"></app-progress-bar>
        <app-progress-bar [progress]="60"></app-progress-bar>
        <app-progress-bar [progress]="70"></app-progress-bar>
        <app-progress-bar [progress]="80"></app-progress-bar>
        <app-progress-bar [progress]="90"></app-progress-bar>
        <app-progress-bar [progress]="100"></app-progress-bar>
        <app-progress-bar [progress]="50" [disabled]="true"></app-progress-bar>
      </div>
    `,
  }),
};