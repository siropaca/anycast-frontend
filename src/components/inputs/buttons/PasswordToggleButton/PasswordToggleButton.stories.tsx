import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PasswordToggleButton } from '@/components/inputs/buttons/PasswordToggleButton/PasswordToggleButton';

const meta = {
  title: 'inputs/buttons/PasswordToggleButton',
  component: PasswordToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: false,
    onToggle: () => {},
  },
};

export const Visible: Story = {
  args: {
    visible: true,
    onToggle: () => {},
  },
};
