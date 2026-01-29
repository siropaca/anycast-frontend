import { EnvelopeIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { InputSkeleton } from '@/components/inputs/Input/InputSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'md',
    placeholder: 'Placeholder',
    showCounter: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="column">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Left Icon">
        <Stack direction="column">
          <Input
            size="sm"
            leftIcon={<MagnifyingGlassIcon />}
            placeholder="検索"
          />
          <Input
            size="md"
            leftIcon={<MagnifyingGlassIcon />}
            placeholder="検索"
          />
          <Input
            size="lg"
            leftIcon={<MagnifyingGlassIcon />}
            placeholder="検索"
          />
        </Stack>
      </Section>

      <Section title="Right Icon">
        <Stack direction="column">
          <Input size="md" rightIcon={<EnvelopeIcon />} placeholder="Email" />
        </Stack>
      </Section>

      <Section title="Both Icons">
        <Stack direction="column">
          <Input
            size="md"
            leftIcon={<MagnifyingGlassIcon />}
            rightIcon={<EnvelopeIcon />}
            placeholder="検索"
          />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Default">
        <Input placeholder="Default" />
      </Section>

      <Section title="Disabled">
        <Input placeholder="Disabled" disabled />
      </Section>

      <Section title="Error">
        <Input placeholder="Error" error />
      </Section>
    </Stack>
  ),
};

function ClearableInputExample() {
  const [value, setValue] = useState('テキストを入力');

  return (
    <Input
      value={value}
      placeholder="検索"
      leftIcon={<MagnifyingGlassIcon />}
      clearable
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
    />
  );
}

function CounterInputExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      placeholder="最大100文字"
      maxLength={100}
      showCounter
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function CounterWithoutMaxExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      placeholder="文字数をカウント"
      showCounter
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const Clearable: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Clearable">
        <ClearableInputExample />
      </Section>
    </Stack>
  ),
};

export const WithCounter: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With maxLength">
        <CounterInputExample />
      </Section>

      <Section title="Without maxLength">
        <CounterWithoutMaxExample />
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack direction="column">
      <InputSkeleton size="sm" />
      <InputSkeleton size="md" />
      <InputSkeleton size="lg" />
    </Stack>
  ),
};

export const WithLabelAndHelperText: Story = {
  render: () => (
    <Stack direction="column" align="start" gap={24}>
      <Section title="Basic">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input id="email" type="email" placeholder="example@example.com" />
          <HelperText>有効なメールアドレスを入力してください</HelperText>
        </Stack>
      </Section>

      <Section title="Required">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="username" required>
            ユーザー名
          </FormLabel>
          <Input id="username" placeholder="username" />
        </Stack>
      </Section>

      <Section title="Error State">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="password">パスワード</FormLabel>
          <Input id="password" type="password" placeholder="••••••••" error />
          <HelperText error>パスワードは8文字以上必要です</HelperText>
        </Stack>
      </Section>
    </Stack>
  ),
};
