import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@/components/dataDisplay/Badge/Badge';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    count: 3,
    size: 'md',
  },
};

export const Sizes: Story = {
  args: { count: 5 },
  render: () => (
    <Stack>
      <Badge count={5} size="sm" />
      <Badge count={5} size="md" />
      <Badge count={5} size="lg" />
    </Stack>
  ),
};

export const Counts: Story = {
  args: { count: 1 },
  render: () => (
    <Stack>
      <Badge count={1} />
      <Badge count={9} />
      <Badge count={99} />
      <Badge count={100} />
    </Stack>
  ),
};
