import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Label } from '@/components/inputs/Input/Label';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { TextareaSkeleton } from '@/components/inputs/Textarea/TextareaSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    placeholder: 'Placeholder',
    rows: 4,
  },
};

export const States: Story = {
  render: () => (
    <Stack direction="column" align="stretch" gap={24}>
      <Section title="Default">
        <Textarea placeholder="Default" rows={3} />
      </Section>

      <Section title="Disabled">
        <Textarea placeholder="Disabled" rows={3} disabled />
      </Section>

      <Section title="Error">
        <Textarea placeholder="Error" rows={3} error />
      </Section>
    </Stack>
  ),
};

function CounterExample() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      value={value}
      placeholder="最大200文字"
      rows={4}
      maxLength={200}
      showCounter
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

function CounterWithoutMaxExample() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      value={value}
      placeholder="文字数をカウント"
      rows={4}
      showCounter
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const WithCounter: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With maxLength">
        <CounterExample />
      </Section>

      <Section title="Without maxLength">
        <CounterWithoutMaxExample />
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack direction="column" align="stretch">
      <TextareaSkeleton rows={3} />
      <TextareaSkeleton rows={4} />
      <TextareaSkeleton rows={6} />
    </Stack>
  ),
};

export const WithLabelAndHelperText: Story = {
  render: () => (
    <Stack direction="column" align="start" gap={24}>
      <Section title="Basic">
        <Stack direction="column" align="stretch" gap={8}>
          <Label htmlFor="description">説明</Label>
          <Textarea
            id="description"
            placeholder="説明を入力してください"
            rows={4}
          />
          <HelperText>任意の説明文を入力してください</HelperText>
        </Stack>
      </Section>

      <Section title="Required">
        <Stack direction="column" align="stretch" gap={8}>
          <Label htmlFor="bio" required>
            自己紹介
          </Label>
          <Textarea
            id="bio"
            placeholder="自己紹介を入力してください"
            rows={4}
          />
        </Stack>
      </Section>

      <Section title="Error State">
        <Stack direction="column" align="stretch" gap={8}>
          <Label htmlFor="comment">コメント</Label>
          <Textarea
            id="comment"
            placeholder="コメントを入力してください"
            rows={4}
            error
          />
          <HelperText error>コメントは必須です</HelperText>
        </Stack>
      </Section>
    </Stack>
  ),
};
