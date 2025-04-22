import { Meta, moduleMetadata, applicationConfig, StoryObj } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThermometerComponent } from './thermometer.component';

const defaultOptions = [
  { id: 'income', title: 'Income Investor', description: 'Seeks steady growth with minimal risk.', value: 20 },
  { id: 'balanced', title: 'Balanced Investor', description: 'Balances risk and rewards for stable returns.', value: 50 },
  { id: 'growth', title: 'Growth Investor', description: 'Focuses on high returns with moderate risk.', value: 80 }
];

export default {
  title: 'Progress/Thermometer',
  component: ThermometerComponent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ThermometerComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserModule)],
    }),
  ],
  argTypes: {
    options: {
      control: 'object',
      description: 'List of options to display in the thermometer',
    },
    selectedOptionId: {
      control: 'select',
      options: ['income', 'balanced', 'growth'],
      description: 'Currently selected option ID',
    },
    selectionChange: {
      action: 'selectionChange',
    },
  },
} as Meta<ThermometerComponent>;

type Story = StoryObj<ThermometerComponent>;

export const Default: Story = {
  args: {
    options: defaultOptions,
    selectedOptionId: 'balanced',
  },
  render: (args) => ({
    props: args,
  }),
};

export const IncomeSelected: Story = {
  args: {
    options: defaultOptions,
    selectedOptionId: 'income',
  },
  render: (args) => ({
    props: args,
  }),
};

export const GrowthSelected: Story = {
  args: {
    options: defaultOptions,
    selectedOptionId: 'growth',
  },
  render: (args) => ({
    props: args,
  }),
};

export const AllProfiles: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <app-thermometer 
          [options]="options" 
          [selectedOptionId]="'income'">
        </app-thermometer>
      </div>
    `,
    props: {
      options: defaultOptions,
    },
  }),
};