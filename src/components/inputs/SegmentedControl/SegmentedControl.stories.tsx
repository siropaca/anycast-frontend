import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SegmentedControl } from '@/components/inputs/SegmentedControl/SegmentedControl';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    options: [
      { label: 'オプション1', value: 'option1' },
      { label: 'オプション2', value: 'option2' },
      { label: 'オプション3', value: 'option3' },
    ],
    value: 'option1',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Small">
        <SegmentedControl
          size="sm"
          options={[
            { label: '新規作成', value: 'create' },
            { label: '既存から選択', value: 'connect' },
          ]}
          value="create"
          onValueChange={() => {}}
        />
      </Section>

      <Section title="Medium (default)">
        <SegmentedControl
          size="md"
          options={[
            { label: '新規作成', value: 'create' },
            { label: '既存から選択', value: 'connect' },
          ]}
          value="create"
          onValueChange={() => {}}
        />
      </Section>

      <Section title="Large">
        <SegmentedControl
          size="lg"
          options={[
            { label: '新規作成', value: 'create' },
            { label: '既存から選択', value: 'connect' },
          ]}
          value="create"
          onValueChange={() => {}}
        />
      </Section>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Default">
        <SegmentedControl
          options={[
            { label: '日次', value: 'daily' },
            { label: '週次', value: 'weekly' },
            { label: '月次', value: 'monthly' },
          ]}
          value="daily"
          onValueChange={() => {}}
        />
      </Section>

      <Section title="Disabled">
        <SegmentedControl
          options={[
            { label: '日次', value: 'daily' },
            { label: '週次', value: 'weekly' },
            { label: '月次', value: 'monthly' },
          ]}
          value="daily"
          disabled
          onValueChange={() => {}}
        />
      </Section>

      <Section title="Disabled option">
        <SegmentedControl
          options={[
            { label: '日次', value: 'daily' },
            { label: '週次', value: 'weekly', disabled: true },
            { label: '月次', value: 'monthly' },
          ]}
          value="daily"
          onValueChange={() => {}}
        />
      </Section>
    </Stack>
  ),
};

function InteractiveExample() {
  const [value, setValue] = useState('create');

  return (
    <Stack direction="column" gap={12}>
      <SegmentedControl
        options={[
          { label: '新規作成', value: 'create' },
          { label: '既存から選択', value: 'connect' },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <p style={{ margin: 0, fontSize: '14px', color: '#888' }}>
        選択中: {value}
      </p>
    </Stack>
  );
}

export const Interactive: Story = {
  render: () => (
    <Section title="Interactive">
      <InteractiveExample />
    </Section>
  ),
};
