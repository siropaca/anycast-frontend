import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: 'セクションタイトル',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'セクションタイトル',
    description: 'セクションの説明文がここに入ります',
  },
};

export const WithAction: Story = {
  args: {
    title: 'セクションタイトル',
    action: (
      <button type="button" className="text-sm text-primary">
        アクション
      </button>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="h2 (default)">
        <SectionTitle title="セクションタイトル" />
      </Section>

      <Section title="h3">
        <SectionTitle title="セクションタイトル" level="h3" />
      </Section>

      <Section title="With Description">
        <SectionTitle
          title="セクションタイトル"
          description="セクションの説明文がここに入ります"
        />
      </Section>

      <Section title="With Action">
        <SectionTitle
          title="セクションタイトル"
          action={
            <button type="button" className="text-sm text-primary">
              アクション
            </button>
          }
        />
      </Section>

      <Section title="Full">
        <SectionTitle
          title="セクションタイトル"
          description="セクションの説明文がここに入ります"
          action={
            <button type="button" className="text-sm text-primary">
              アクション
            </button>
          }
        />
      </Section>
    </Stack>
  ),
};
