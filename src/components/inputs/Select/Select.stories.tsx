import { GlobeIcon, UserIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Select } from '@/components/inputs/Select/Select';
import { SelectSkeleton } from '@/components/inputs/Select/SelectSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const fruitOptions = [
  { label: 'りんご', value: 'apple' },
  { label: 'バナナ', value: 'banana' },
  { label: 'オレンジ', value: 'orange' },
  { label: 'ぶどう', value: 'grape' },
  { label: 'いちご', value: 'strawberry' },
];

const languageOptions = [
  { label: '日本語', value: 'ja' },
  { label: 'English', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '한국어', value: 'ko' },
];

const groupedOptions = [
  {
    label: '果物',
    options: [
      { label: 'りんご', value: 'apple' },
      { label: 'バナナ', value: 'banana' },
      { label: 'いちご', value: 'strawberry' },
    ],
  },
  {
    label: '野菜',
    options: [
      { label: 'にんじん', value: 'carrot' },
      { label: 'トマト', value: 'tomato' },
      { label: 'きゅうり', value: 'cucumber' },
    ],
  },
];

const meta = {
  title: 'inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  args: {
    options: fruitOptions,
    size: 'md',
    placeholder: '果物を選択',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="column">
      <Select size="sm" options={fruitOptions} placeholder="Small" />
      <Select size="md" options={fruitOptions} placeholder="Medium" />
      <Select size="lg" options={fruitOptions} placeholder="Large" />
    </Stack>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Left Icon">
        <Stack direction="column">
          <Select
            size="sm"
            leftIcon={<GlobeIcon />}
            options={languageOptions}
            placeholder="言語を選択"
          />
          <Select
            size="md"
            leftIcon={<GlobeIcon />}
            options={languageOptions}
            placeholder="言語を選択"
          />
          <Select
            size="lg"
            leftIcon={<GlobeIcon />}
            options={languageOptions}
            placeholder="言語を選択"
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
        <Select options={fruitOptions} placeholder="選択してください" />
      </Section>

      <Section title="Disabled">
        <Select
          options={fruitOptions}
          placeholder="選択してください"
          disabled
        />
      </Section>

      <Section title="Error">
        <Select options={fruitOptions} placeholder="選択してください" error />
      </Section>
    </Stack>
  ),
};

function ControlledSelectExample() {
  const [value, setValue] = useState<string | null>('apple');

  return (
    <Stack direction="column" gap={8}>
      <Select
        options={fruitOptions}
        value={value}
        onValueChange={setValue}
        placeholder="果物を選択"
      />
      <span style={{ fontSize: '12px', color: '#888' }}>
        選択中: {value ?? '未選択'}
      </span>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Controlled">
        <ControlledSelectExample />
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack direction="column">
      <SelectSkeleton size="sm" />
      <SelectSkeleton size="md" />
      <SelectSkeleton size="lg" />
    </Stack>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Grouped Options">
        <Select
          options={groupedOptions}
          placeholder="食材を選択"
        />
      </Section>

      <Section title="Grouped + Flat Mixed">
        <Select
          options={[
            { label: '指定なし', value: 'none' },
            ...groupedOptions,
          ]}
          placeholder="食材を選択"
        />
      </Section>
    </Stack>
  ),
};

function GroupedControlledExample() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Stack direction="column" gap={8}>
      <Select
        options={groupedOptions}
        value={value}
        onValueChange={setValue}
        placeholder="食材を選択"
      />
      <span style={{ fontSize: '12px', color: '#888' }}>
        選択中: {value ?? '未選択'}
      </span>
    </Stack>
  );
}

export const GroupedControlled: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Controlled with Groups">
        <GroupedControlledExample />
      </Section>
    </Stack>
  ),
};

export const WithLabelAndHelperText: Story = {
  render: () => (
    <Stack direction="column" align="start" gap={24}>
      <Section title="Basic">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="role">役職</FormLabel>
          <Select
            options={[
              { label: '管理者', value: 'admin' },
              { label: '編集者', value: 'editor' },
              { label: '閲覧者', value: 'viewer' },
            ]}
            placeholder="役職を選択"
          />
          <HelperText>ユーザーの権限レベルを設定します</HelperText>
        </Stack>
      </Section>

      <Section title="Required">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="category" required>
            カテゴリー
          </FormLabel>
          <Select
            options={[
              { label: 'テクノロジー', value: 'tech' },
              { label: 'ビジネス', value: 'business' },
              { label: 'エンタメ', value: 'entertainment' },
            ]}
            placeholder="カテゴリーを選択"
            required
          />
        </Stack>
      </Section>

      <Section title="Error State">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="status">ステータス</FormLabel>
          <Select
            options={[
              { label: '公開', value: 'public' },
              { label: '下書き', value: 'draft' },
              { label: '非公開', value: 'private' },
            ]}
            placeholder="ステータスを選択"
            error
          />
          <HelperText error>ステータスを選択してください</HelperText>
        </Stack>
      </Section>

      <Section title="With Left Icon">
        <Stack direction="column" align="stretch" gap={8}>
          <FormLabel htmlFor="member">メンバー</FormLabel>
          <Select
            leftIcon={<UserIcon />}
            options={[
              { label: '山田太郎', value: 'yamada' },
              { label: '鈴木花子', value: 'suzuki' },
              { label: '田中一郎', value: 'tanaka' },
            ]}
            placeholder="メンバーを選択"
          />
        </Stack>
      </Section>
    </Stack>
  ),
};
