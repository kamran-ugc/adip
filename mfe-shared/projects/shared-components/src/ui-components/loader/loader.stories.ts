import { Meta, StoryObj } from "@storybook/angular";
import { LoaderComponent } from "./loader.component";

const meta: Meta<LoaderComponent> = {
  component: LoaderComponent,
  title: "Progress/Loader",
};

export default meta;

type Story = StoryObj<LoaderComponent>;


// Default story
export const Primary: Story = {
  args: {
    isLoading: true,
    size: 'medium',
    color: 'primary'
  },
};
