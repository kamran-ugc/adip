import type { Meta, StoryObj } from '@storybook/angular';
import { TabSelectionComponent } from './tab-selection.component';

const meta: Meta<TabSelectionComponent> = {
    title: 'Components/TabSelection',
    component: TabSelectionComponent,
    tags: ['autodocs'],
    argTypes: {
        multiSelect: {
            control: 'boolean',
            description: 'Enable multi-selection mode',
        },
        options: {
            control: 'object',
            description: 'Array of options to display',
        },
        initialSelected: {
            control: 'object',
            description: 'Array of initially selected option IDs',
        },
        selectionChange: {
            action: 'selectionChange',
            description: 'Event emitted when selection changes',
        },
    },
};

export default meta;
type Story = StoryObj<TabSelectionComponent>;

export const Default: Story = {
    args: {
        options: [
            { id: '1', label: 'The label goes here', icon: 'help' },
            { id: '2', label: 'The label goes here', icon: 'play' },
            { id: '3', label: 'The label goes here', icon: 'play' },
        ],
        multiSelect: false,
    },
};

export const WithLetters: Story = {
    args: {
        options: [
            { id: '1', label: 'The label goes here', letter: 'A' },
            { id: '2', label: 'The label goes here', letter: 'A' },
            { id: '3', label: 'The label goes here', letter: 'A' },
        ],
        multiSelect: false,
    },
};

export const MultiSelect: Story = {
    args: {
        options: [
            { id: '1', label: 'The label goes here', icon: 'play' },
            { id: '2', label: 'The label goes here', icon: 'play' },
            { id: '3', label: 'The label goes here', icon: 'play' },
        ],
        multiSelect: true,
    },
};

export const WithInitialSelection: Story = {
    args: {
        options: [
            { id: '1', label: 'The label goes here', icon: 'play' },
            { id: '2', label: 'The label goes here', icon: 'play' },
            { id: '3', label: 'The label goes here', icon: 'play' },
        ],
        multiSelect: false,
        initialSelected: ['2'],
    },
};

export const WithLocalIcons: Story = {
    args: {
        options: [
            { id: '1', label: 'The label goes here', icon: 'play' },
            { id: '2', label: 'The label goes here', icon: 'play' },
            { id: '3', label: 'The label goes here', icon: 'play' },
        ],
        multiSelect: false,
    },
};

export const MixedIcons: Story = {
    args: {
        options: [
            { id: '1', label: 'The label goes here', icon: 'play' },
            { id: '2', label: 'The label goes here', letter: 'B' },
            { id: '3', label: 'The label goes here', icon: 'play' },
        ],
        multiSelect: true,
    },
};