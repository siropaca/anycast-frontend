import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/FormLabel',
  component: FormLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'ラベル',
    required: false,
    description: '',
  },
};

export const Default: Story = {
  render: () => (
    <Stack direction="column" align="start" gap={16}>
      <Section title="Basic">
        <FormLabel>メールアドレス</FormLabel>
      </Section>

      <Section title="Required">
        <FormLabel required>ユーザー名</FormLabel>
      </Section>

      <Section title="With Description">
        <FormLabel description="省略時はファイル名になります">BGM名</FormLabel>
      </Section>

      <Section title="Required with Description">
        <FormLabel required description="3文字以上で入力してください">
          ユーザー名
        </FormLabel>
      </Section>

      <Section title="With Help Text">
        <FormLabel helpText="すべてのエピソード生成時に共通で適用されるプロンプトです">
          共通プロンプト
        </FormLabel>
      </Section>

      <Section title="Required with Help Text">
        <FormLabel required helpText="一意の識別名として使用されます">
          チャンネルID
        </FormLabel>
      </Section>
    </Stack>
  ),
};
