import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from '@/components/dataDisplay/Tag/Tag';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'タグ',
    color: 'green',
  },
};

export const Colors: Story = {
  args: { label: 'Green', color: 'green' },
  render: () => (
    <Stack>
      <Tag label="Green" color="green" />
      <Tag label="Gray" color="gray" />
      <Tag label="Blue" color="blue" />
    </Stack>
  ),
};

export const AllVariants: Story = {
  args: { label: '公開中', color: 'green' },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Colors">
        <Stack>
          <Tag label="公開中" color="green" />
          <Tag label="下書き" color="gray" />
          <Tag label="カテゴリ" color="blue" />
        </Stack>
      </Section>
    </Stack>
  ),
};
