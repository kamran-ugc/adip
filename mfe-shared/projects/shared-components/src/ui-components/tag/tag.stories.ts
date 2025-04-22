// tag.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TagComponent } from './tag.component';

const meta: Meta<TagComponent> = {
    title: 'Components/Tag',
    component: TagComponent,
    decorators: [
        moduleMetadata({
            imports: [TagComponent],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'success', 'danger', 'warning'],
            description: 'The visual style of the tag',
        },
        text: {
            control: 'text',
            description: 'The text content of the tag',
        },
        rounded: {
            control: 'boolean',
            description: 'Whether the tag has fully rounded corners',
        },
    },
    args: {
        variant: 'default',
        text: 'Upcoming Expenses',
        rounded: true,
    },
};

export default meta;
type Story = StoryObj<TagComponent>;

export const Default: Story = {
    args: {
        variant: 'default',
    },
};

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
    },
};


export const Rounded: Story = {
    args: {
        rounded: true,
    },
};

export const Square: Story = {
    args: {
        rounded: false,
    },
};

export const WithProjectedContent: Story = {
    render: (args) => ({
        props: args,
        template: `
      <app-tag [variant]="variant" [size]="size" [rounded]="rounded">
        <span class="mr-1">🔄</span> {{ text }}
      </app-tag>
    `,
    }),
};

export const AllVariants: Story = {
    render: (args) => ({
        props: args,
        template: `
      <div class="flex flex-col space-y-2">
        <app-tag variant="default" text="Upcoming Expenses"></app-tag>
        <app-tag variant="primary" text="Upcoming Expenses"></app-tag>
        <app-tag variant="success" text="Upcoming Expenses"></app-tag>
        <app-tag variant="danger" text="Upcoming Expenses"></app-tag>
        <app-tag variant="warning" text="Upcoming Expenses"></app-tag>
      </div>
    `,
    }),
};