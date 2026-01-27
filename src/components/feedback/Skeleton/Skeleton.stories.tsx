import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from '@/components/feedback/Skeleton/Skeleton';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    style: { width: 200, height: 40 },
  },
};

export const Variants: Story = {
  render: () => (
    <Stack direction="column" gap={16}>
      <Skeleton style={{ width: 200, height: 20 }} />
      <Skeleton style={{ width: 160, height: 20 }} />
      <Skeleton style={{ width: 120, height: 20 }} />
      <Skeleton className="rounded-full" style={{ width: 48, height: 48 }} />
      <Skeleton style={{ width: 300, height: 100 }} />
    </Stack>
  ),
};
