import { Meta, StoryObj } from '@storybook/angular';
import { CircularLoaderComponent } from './circular-loader.component';

const meta: Meta<CircularLoaderComponent> = {
  title: 'Progress/Circular Loader',
  component: CircularLoaderComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value from 0 to 100',
    },
    state: {
      control: 'select',
      options: ['in-progress', 'completed', 'inactive'],
      description: 'State of the loader',
    },
    label: {
      control: 'text',
      description: 'Text or number to display in the center',
    },
    size: {
      control: { type: 'range', min: 20, max: 200, step: 10 },
      description: 'Size of the loader in pixels',
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Width of the circle stroke',
    },
  },
};

export default meta;
type Story = StoryObj<CircularLoaderComponent>;

export const Default: Story = {
  args: {
    progress: 50,
    state: 'in-progress',
    label: '1',
    size: 60,
    strokeWidth: 3,
  },
};

export const Completed: Story = {
  args: {
    state: 'completed',
    label: '1',
    size: 60,
    strokeWidth: 3,
  },
};

export const Inactive: Story = {
  args: {
    state: 'inactive',
    label: '1',
    size: 60,
    strokeWidth: 3,
  },
};

export const NoLabel: Story = {
  args: {
    progress: 75,
    state: 'in-progress',
    label: '',
    size: 60,
    strokeWidth: 3,
  },
};

export const LargeSize: Story = {
  args: {
    progress: 60,
    state: 'in-progress',
    label: '1',
    size: 100,
    strokeWidth: 5,
  },
};

export const ProgressStages: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
        <app-circular-loader [progress]="25" state="in-progress" label="1" [size]="60"></app-circular-loader>
        <app-circular-loader [progress]="50" state="in-progress" label="1" [size]="60"></app-circular-loader>
        <app-circular-loader [progress]="75" state="in-progress" label="1" [size]="60"></app-circular-loader>
        <app-circular-loader state="completed" label="1" [size]="60"></app-circular-loader>
        <app-circular-loader state="inactive" label="1" [size]="60"></app-circular-loader>
      </div>
    `,
  }),
};
