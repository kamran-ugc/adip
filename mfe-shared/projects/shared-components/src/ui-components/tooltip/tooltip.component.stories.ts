import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';

// Mock component to better display the tooltip in Storybook
import { Component } from '@angular/core';

@Component({
  selector: 'tooltip-host',
  standalone: true,
  imports: [CommonModule, TooltipComponent],
  template: `
    <div class="flex items-center justify-center p-10">
      <app-tooltip [tooltipText]="tooltipText" [position]="position">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Hover Me
        </button>
      </app-tooltip>
    </div>
  `,
})
class TooltipHostComponent {
  tooltipText: string = 'This is a tooltip';
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';
}

const meta: Meta<TooltipHostComponent> = {
  title: 'Components/Tooltip',
  component: TooltipHostComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TooltipComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tooltipText: {
      control: 'text',
      description: 'Text to display in the tooltip',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the element',
    },
  },
  args: {
    tooltipText: 'This is a tooltip',
    position: 'top',
  },
};

export default meta;
type Story = StoryObj<TooltipHostComponent>;

export const Top: Story = {
  args: {
    position: 'top',
    tooltipText: 'Top tooltip example',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip appears above the element.',
      },
    },
  },
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
    tooltipText: 'Bottom tooltip example',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip appears below the element.',
      },
    },
  },
};

export const Left: Story = {
  args: {
    position: 'left',
    tooltipText: 'Left tooltip example',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip appears to the left of the element.',
      },
    },
  },
};

export const Right: Story = {
  args: {
    position: 'right',
    tooltipText: 'Right tooltip example',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip appears to the right of the element.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    position: 'top',
    tooltipText: 'This is a longer tooltip text that demonstrates how the tooltip handles multiple lines of content when the text is too long to fit on a single line.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with longer text content to demonstrate text wrapping.',
      },
    },
  },
};

// Add a simulated hover state to show the tooltip
export const AlwaysVisible: Story = {
  args: {
    position: 'top',
    tooltipText: 'This tooltip is always visible',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip is always visible for demonstration purposes.',
      },
    },
  },
  play: async ({ canvasElement, component }) => {
    // Simulate hovering to show the tooltip
    const tooltipComponent = canvasElement.querySelector('app-tooltip');
    if (tooltipComponent) {
      const tooltipInstance = (tooltipComponent as any).__ngContext__[1];
      if (tooltipInstance) {
        tooltipInstance.isVisible = true;
      }
    }
  },
};