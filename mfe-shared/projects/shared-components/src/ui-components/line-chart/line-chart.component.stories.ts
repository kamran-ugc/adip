import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LineChartComponent } from './line-chart.component';

const meta: Meta<LineChartComponent> = {
  title: 'Charts/Line Chart',
  component: LineChartComponent,
  decorators: [
    moduleMetadata({
      imports: [LineChartComponent], // Standalone component
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LineChartComponent>;

export const Default: Story = {
  args: {
    color: '#0d6efd',
    showTooltip: true,
    datasets: [
      {
        label: '1W',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [120, 200, 170, 300, 400],
      },
      {
        label: '3W',
        labels: ['W1', 'W2', 'W3'],
        data: [400, 500, 600],
      },
      {
        label: '1M',
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        data: [100, 200, 300, 450],
      },
      {
        label: '2M',
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
        data: [80, 150, 170, 250, 300, 350, 400, 500],
      },
    ],
  },
};
