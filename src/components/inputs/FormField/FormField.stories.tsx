import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Input } from '@/components/inputs/Input/Input';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'メールアドレス',
    children: ({ id, hasError }) => (
      <Input
        id={id}
        type="email"
        placeholder="example@example.com"
        error={hasError}
      />
    ),
  },
};

export const Required: Story = {
  args: {
    label: 'ユーザー名',
    required: true,
    children: ({ id, hasError }) => (
      <Input id={id} placeholder="username" error={hasError} />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'パスワード',
    error: 'パスワードは8文字以上必要です',
    children: ({ id, hasError }) => (
      <Input id={id} type="password" placeholder="••••••••" error={hasError} />
    ),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'ユーザー名',
    description: 'プロフィールページの URL に使用されます',
    children: ({ id, hasError }) => (
      <Input id={id} placeholder="username" error={hasError} />
    ),
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'ボイス',
    required: true,
    helpText: '音声合成に使用するボイスを選択してください',
    children: ({ id, hasError }) => (
      <Input id={id} placeholder="ボイスを選択" error={hasError} />
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" align="stretch" gap={24}>
      <FormField label="デフォルト">
        {({ id, hasError }) => (
          <Input id={id} placeholder="入力してください" error={hasError} />
        )}
      </FormField>

      <FormField label="必須フィールド" required>
        {({ id, hasError }) => (
          <Input id={id} placeholder="入力してください" error={hasError} />
        )}
      </FormField>

      <FormField label="エラーあり" error="入力内容に誤りがあります">
        {({ id, hasError }) => (
          <Input id={id} placeholder="入力してください" error={hasError} />
        )}
      </FormField>

      <FormField
        label="説明付き"
        description="プロフィールページの URL に使用されます"
      >
        {({ id, hasError }) => (
          <Input id={id} placeholder="入力してください" error={hasError} />
        )}
      </FormField>

      <FormField
        label="ヘルプテキスト付き"
        helpText="詳細な説明がツールチップで表示されます"
      >
        {({ id, hasError }) => (
          <Input id={id} placeholder="入力してください" error={hasError} />
        )}
      </FormField>
    </Stack>
  ),
};
