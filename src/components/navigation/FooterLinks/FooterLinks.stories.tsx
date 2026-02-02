import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FooterLinks } from '@/components/navigation/FooterLinks/FooterLinks';

const meta = {
  title: 'navigation/FooterLinks',
  component: FooterLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
