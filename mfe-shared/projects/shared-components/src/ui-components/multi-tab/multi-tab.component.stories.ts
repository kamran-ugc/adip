import type { Meta, StoryObj } from '@storybook/angular';
import { MultiTabComponent } from './multi-tab.component';

const meta: Meta<MultiTabComponent> = {
    title: 'Components/MultiTab',
    component: MultiTabComponent,
    tags: ['autodocs'],
    argTypes: {
        mainTabs: {
            control: 'object',
            description: 'Array of tab labels',
            defaultValue: ['All', 'Equities', 'Dividends', 'Portfolio', 'Volatility']
        },
        activeMainTab: {
            control: 'select',
            options: ['All', 'Equities', 'Dividends', 'Portfolio', 'Volatility'],
            description: 'Currently active tab',
            defaultValue: 'All'
        },
        mainTabChange: {
            action: 'tabChanged',
            description: 'Event emitted when tab changes'
        }
    },
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<MultiTabComponent>;

export const Default: Story = {
    args: {
        mainTabs: ['All', 'Equities', 'Dividends', 'Portfolio', 'Volatility'],
        activeMainTab: 'All'
    }
};

export const WithCustomTabs: Story = {
    args: {
        mainTabs: ['Overview', 'Details', 'History', 'Settings'],
        activeMainTab: 'Overview'
    }
};

export const WithLongTabs: Story = {
    args: {
        mainTabs: ['Dashboard Overview', 'Financial Analysis', 'Portfolio Management', 'Risk Assessment', 'Market Research'],
        activeMainTab: 'Dashboard Overview'
    }
}; 