// button.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'underlined', 'icon'],
      description: 'Button variant style',
      defaultValue: 'primary'
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled', 'error'],
      description: 'Button state',
      defaultValue: 'default'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      defaultValue: false
    },
    error: {
      control: 'boolean',
      description: 'Shows the button in an error state',
      defaultValue: false
    },
    prefixIcon: {
      control: 'text',
      description: 'Icon name for prefix (before text)',
      defaultValue: undefined
    },
    postfixIcon: {
      control: 'text',
      description: 'Icon name for postfix (after text)',
      defaultValue: undefined
    },
    iconSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the icon',
      defaultValue: 'md'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button take up full width',
      defaultValue: false
    },
    buttonClick: {
      action: 'clicked',
      description: 'Button click event'
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    state: 'default',
    disabled: false,
    error: false,
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [state]="state" [disabled]="disabled" [error]="error">Field Text</app-button>`
  })
};

export const WithPrefixIcon: Story = {
  args: {
    variant: 'primary',
    prefixIcon: 'arrow-left',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [prefixIcon]="prefixIcon">Back</app-button>`
  })
};

export const WithPostfixIcon: Story = {
  args: {
    variant: 'primary',
    postfixIcon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [postfixIcon]="postfixIcon">Next</app-button>`
  })
};

export const WithBothIcons: Story = {
  args: {
    variant: 'primary',
    prefixIcon: 'home',
    postfixIcon: 'arrow-right',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [prefixIcon]="prefixIcon" [postfixIcon]="postfixIcon">Home</app-button>`
  })
};

export const IconOnly: Story = {
  args: {
    variant: 'icon',
    iconOnly: true,
    prefixIcon: 'more-vertical',
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [iconOnly]="iconOnly" [prefixIcon]="prefixIcon"></app-button>`
  })
};

export const ButtonStates: Story = {
  render: () => ({
    template: `
      <div style="padding: 16px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Default</h3>
          <app-button variant="primary">Field Text</app-button>
          <app-button variant="secondary">Field Text</app-button>
          <app-button variant="text">Field Text</app-button>
          <app-button variant="underlined">Field Text</app-button>
          <app-button variant="icon" [iconOnly]="true" prefixIcon="more-vertical" style="align-self: flex-start;"></app-button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Hover</h3>
          <app-button variant="primary" state="hover">Field Text</app-button>
          <app-button variant="secondary" state="hover">Field Text</app-button>
          <app-button variant="text" state="hover">Field Text</app-button>
          <app-button variant="underlined" state="hover">Field Text</app-button>
          <app-button variant="icon" state="hover" [iconOnly]="true" prefixIcon="more-vertical" style="align-self: flex-start;"></app-button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Active/Clicked</h3>
          <app-button variant="primary" state="active">Field Text</app-button>
          <app-button variant="secondary" state="active">Field Text</app-button>
          <app-button variant="text" state="active">Field Text</app-button>
          <app-button variant="underlined" state="active">Field Text</app-button>
          <app-button variant="icon" state="active" [iconOnly]="true" prefixIcon="more-vertical" style="align-self: flex-start;"></app-button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Disabled</h3>
          <app-button variant="primary" [disabled]="true">Field Text</app-button>
          <app-button variant="secondary" [disabled]="true">Field Text</app-button>
          <app-button variant="text" [disabled]="true">Field Text</app-button>
          <app-button variant="underlined" [disabled]="true">Field Text</app-button>
          <app-button variant="icon" [disabled]="true" [iconOnly]="true" prefixIcon="more-vertical" style="align-self: flex-start;"></app-button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 8px;">Error</h3>
          <app-button variant="primary" [error]="true">Field Text</app-button>
          <app-button variant="secondary" [error]="true">Field Text</app-button>
          <app-button variant="text" [error]="true">Field Text</app-button>
          <app-button variant="underlined" [error]="true">Field Text</app-button>
          <app-button variant="icon" [error]="true" [iconOnly]="true" prefixIcon="more-vertical" style="align-self: flex-start;"></app-button>
        </div>
      </div>
    `
  })
};

export const IconSizes: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px;">
        <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 16px;">Icon Sizes</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <app-button variant="primary" prefixIcon="arrow-left" iconSize="20">Extra Small Icon</app-button>
          <app-button variant="primary" prefixIcon="arrow-left" iconSize="24">Small Icon</app-button>
          <app-button variant="primary" prefixIcon="arrow-left" iconSize="32">Medium Icon</app-button>
          <app-button variant="primary" prefixIcon="arrow-left" iconSize="48">Large Icon</app-button>
          <app-button variant="primary" prefixIcon="arrow-left" iconSize="52">Extra Large Icon</app-button>
        </div>
      </div>
    `
  })
};

export const CustomWidth: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 24px; max-width: 800px; margin: 0 auto;">
        <h3 style="font-size: 18px; font-weight: 500; margin-bottom: 16px;">Custom Width Buttons</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <app-button variant="primary" [fullWidth]="true">Full width</app-button>
          <app-button variant="primary" class="app-button--width-50">Percentage Width (50%)</app-button>
          <app-button variant="primary" class="app-button--width-10rem">Rem Width (10rem)</app-button>
          <app-button variant="primary" class="app-button--width-300" prefixIcon="arrow-left">With Prefix Icon</app-button>
          <app-button variant="primary" class="app-button--width-300" postfixIcon="arrow-right">With Postfix Icon</app-button>
          <app-button variant="primary" class="app-button--width-400" prefixIcon="arrow-left" postfixIcon="arrow-right">With Both Icons</app-button>
        </div>
      </div>
    `
  })
};
