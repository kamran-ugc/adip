import { Meta, StoryObj } from "@storybook/angular";
import { CardComponent } from "./card.component";

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: "Components/Card",
};

export default meta;

type Story = StoryObj<CardComponent>;


// Default story
export const Primary: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    imageUrl: 'https://icons.veryicon.com/png/o/miscellaneous/test/link-84.png',
    description: 'Card description',
    amount: '$100',
    percentage: '50%',
    actionText: 'Go to Page',
  },
};
