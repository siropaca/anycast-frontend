import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Copyright } from '@/components/navigation/Copyright/Copyright';

const meta = {
  title: 'navigation/Copyright',
  component: Copyright,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Copyright>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
