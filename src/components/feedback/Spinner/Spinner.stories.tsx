import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={16}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  ),
};
