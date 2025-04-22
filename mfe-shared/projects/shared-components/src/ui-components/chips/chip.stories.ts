import { Meta, StoryObj } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip component with customizable styling using CSS variables'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text to display inside the chip',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'selected'],
      description: 'Visual style variant of the chip',
    },
    themeClass: {
      control: 'text',
      description: 'CSS class name to apply custom theme styling',
    }
  },
};

export default meta;
type Story = StoryObj<ChipComponent>;

// Basic variants with default styling
export const DefaultVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px;">
        <app-chip label="Outlined" variant="outlined"></app-chip>
        <app-chip label="Filled" variant="filled"></app-chip>
        <app-chip label="Selected" variant="selected"></app-chip>
      </div>
    `
  })
};

// Custom styling examples
export const CustomStyledVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3>Blue Variant</h3>
          <div style="display: flex; gap: 8px;">
            <app-chip themeClass="blue-theme" label="Outlined" variant="outlined"></app-chip>
            <app-chip themeClass="blue-theme" label="Filled" variant="filled"></app-chip>
            <app-chip themeClass="blue-theme" label="Selected" variant="selected"></app-chip>
          </div>
        </div>

        <div>
          <h3>Green Variant</h3>
          <div style="display: flex; gap: 8px;">
            <app-chip themeClass="green-theme" label="Outlined" variant="outlined"></app-chip>
            <app-chip themeClass="green-theme" label="Filled" variant="filled"></app-chip>
            <app-chip themeClass="green-theme" label="Selected" variant="selected"></app-chip>
          </div>
        </div>
      </div>
    `,
    styles: [`
      .blue-theme {
        --custom-outlined-border-color: #2196f3;
        --custom-outlined-background: transparent;
        --custom-outlined-text-color: #2196f3;
        --custom-filled-border-color: transparent;
        --custom-filled-background: #e3f2fd;
        --custom-filled-text-color: #1976d2;
        --custom-selected-border-color: #2196f3;
        --custom-selected-background: #bbdefb;
        --custom-selected-text-color: #1976d2;
      }

      .green-theme {
        --custom-outlined-border-color: #4caf50;
        --custom-outlined-background: transparent;
        --custom-outlined-text-color: #4caf50;
        --custom-filled-border-color: transparent;
        --custom-filled-background: #e8f5e9;
        --custom-filled-text-color: #2e7d32;
        --custom-selected-border-color: #4caf50;
        --custom-selected-background: #c8e6c9;
        --custom-selected-text-color: #2e7d32;
      }
    `]
  })
};

// Usage guide
export const UsageGuide: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px;">
        <h3>How to Customize Chip Colors</h3>
        <p>You can customize the chip appearance in two ways:</p>
        
        <h4>1. Using the themeClass input</h4>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 4px; margin: 16px 0; font-family: monospace;">
          &lt;app-chip themeClass="purple-theme" label="Chip Label" variant="outlined"&gt;&lt;/app-chip&gt;
        </div>
        
        <h4>2. By setting CSS variables on a parent element</h4>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 4px; margin: 16px 0; font-family: monospace; white-space: pre-wrap;">
.purple-theme {{'{'}}<br>
  /* For outlined variant */<br>
  --custom-outlined-border-color: #9c27b0;<br>
  --custom-outlined-background: transparent;<br>
  --custom-outlined-text-color: #9c27b0;<br>
  <br>
  /* For filled variant */<br>
  --custom-filled-border-color: transparent;<br>
  --custom-filled-background: #f3e5f5;<br>
  --custom-filled-text-color: #7b1fa2;<br>
  <br>
  /* For selected variant */<br>
  --custom-selected-border-color: #9c27b0;<br>
  --custom-selected-background: #e1bee7;<br>
  --custom-selected-text-color: #7b1fa2;<br>
{{'}'}}
        </div>

        <h4>Example:</h4>
        <div style="display: flex; gap: 8px;">
          <app-chip themeClass="purple-theme" label="Outlined" variant="outlined"></app-chip>
          <app-chip themeClass="purple-theme" label="Filled" variant="filled"></app-chip>
          <app-chip themeClass="purple-theme" label="Selected" variant="selected"></app-chip>
        </div>
      </div>
    `,
    styles: [`
      .purple-theme {
        --custom-outlined-border-color: #9c27b0;
        --custom-outlined-background: transparent;
        --custom-outlined-text-color: #9c27b0;
        --custom-filled-border-color: transparent;
        --custom-filled-background: #f3e5f5;
        --custom-filled-text-color: #7b1fa2;
        --custom-selected-border-color: #9c27b0;
        --custom-selected-background: #e1bee7;
        --custom-selected-text-color: #7b1fa2;
      }
    `]
  })
};
