import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'ツールチップのテキスト',
    children: <button type="button">ホバーしてください</button>,
  },
};

export const Default: Story = {
  args: {
    label: 'ツールチップのテキスト',
    children: <button type="button">ホバーしてください</button>,
  },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Basic">
        <Tooltip label="基本的なツールチップです">
          <button
            type="button"
            className="rounded border border-border px-3 py-1 text-sm"
          >
            ホバーしてください
          </button>
        </Tooltip>
      </Section>

      <Section title="Long Text">
        <Tooltip label="これは長いツールチップのテキストです。max-w-xs によって折り返されます。すべてのチャンネルとエピソードで適用されるプロンプトです。">
          <button
            type="button"
            className="rounded border border-border px-3 py-1 text-sm"
          >
            長いテキスト
          </button>
        </Tooltip>
      </Section>

      <Section title="Inline Element">
        <span className="text-sm">
          テキストの中に
          <Tooltip label="インラインでも使えます">
            <button
              type="button"
              className="mx-1 cursor-help text-text-link underline"
            >
              ツールチップ
            </button>
          </Tooltip>
          を配置
        </span>
      </Section>
    </Stack>
  ),
};
