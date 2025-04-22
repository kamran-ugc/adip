import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart.component';

const meta: Meta<PieChartComponent> = {
  title: 'Charts/Pie Chart',
  component: PieChartComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<PieChartComponent>;

// Common args for all stories
const commonArgs = {
  width: '147px',
  height: '147px',
};

export const Default: Story = {
  args: {
    ...commonArgs,
    title: 'FUNDS TO REACH YOUR GOAL',
    data: [
      { name: 'Savings', value: 30, color: '#4CAF50' },
      { name: 'Investments', value: 50, color: '#2196F3' },
      { name: 'Other', value: 20, color: '#FFC107' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Default pie chart with three segments showing fund distribution',
      },
    },
  },
};

export const CustomCutout: Story = {
  args: {
    ...commonArgs,
    ...Default.args,
    cutout: '50%',
    title: 'CUSTOM CUTOUT CHART',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pie chart with custom cutout percentage',
      },
    },
  },
};

export const CustomBorder: Story = {
  args: {
    ...commonArgs,
    ...Default.args,
    borderWidth: 10,
    borderRadius: 25,
    borderColor: '#E0E0E0',
    title: 'CUSTOM BORDER STYLE',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pie chart with custom border styling',
      },
    },
  },
};

export const WithTooltip: Story = {
  args: {
    ...commonArgs,
    ...Default.args,
    showTooltip: true,
    title: 'CHART WITH TOOLTIPS',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pie chart with tooltips enabled',
      },
    },
  },
};

export const SingleSegment: Story = {
  args: {
    ...commonArgs,
    title: 'SINGLE SEGMENT CHART',
    data: [
      { name: 'Complete', value: 100, color: '#4CAF50' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Pie chart with a single segment',
      },
    },
  },
};

export const ManySegments: Story = {
  args: {
    ...commonArgs,
    title: 'MULTIPLE SEGMENTS CHART',
    data: [
      { name: 'Segment 1', value: 15, color: '#4CAF50' },
      { name: 'Segment 2', value: 20, color: '#2196F3' },
      { name: 'Segment 3', value: 10, color: '#FFC107' },
      { name: 'Segment 4', value: 25, color: '#FF5722' },
      { name: 'Segment 5', value: 30, color: '#9C27B0' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Pie chart with multiple segments',
      },
    },
  },
};

export const UsageGuide: Story = {
  args: {
    ...commonArgs,
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: `
# Pie Chart Usage Guide

## Basic Usage
The pie chart component can be used with minimal configuration:

\`\`\`typescript
<app-pie-chart 
  [title]="'Chart Title'"
  [data]="chartData"
  width="200px"
  height="200px">
</app-pie-chart>
\`\`\`

## Input Properties

### Data Structure
The data input should be an array of objects with the following structure:
\`\`\`typescript
interface ChartData {
  name: string;    // Label for the segment
  value: number;   // Numerical value
  color: string;   // Color in hex format
}
\`\`\`

### Customization Options
- \`cutout\`: Percentage of the center cutout (default: '70%')
- \`borderWidth\`: Width of the segment borders (default: 10)
- \`borderRadius\`: Radius of the segment corners (default: 30)
- \`borderColor\`: Color of the segment borders (default: '#f6f9fc')
- \`showTooltip\`: Enable/disable tooltips (default: false)
- \`width\`: Chart width (default: '200px')
- \`height\`: Chart height (default: '200px')

## Best Practices
1. Use contrasting colors for adjacent segments
2. Keep the number of segments reasonable (ideally under 8)
3. Ensure the sum of values makes sense for the context
4. Use tooltips for detailed information
5. Consider accessibility when choosing colors

## Accessibility
- Ensure sufficient color contrast between segments
- Provide meaningful labels for each segment
- Consider using patterns or textures for colorblind users
`,
      },
    },
  },
};
