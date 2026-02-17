import {
  DotsThreeIcon,
  EyeIcon,
  PencilSimpleIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTrigger = (
  <IconButton
    icon={<DotsThreeIcon size={26} weight="bold" />}
    aria-label="メニュー"
    color="secondary"
    variant="text"
  />
);

export const Playground: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
  },
  render: (args) => (
    <DropdownMenu trigger={args.trigger}>
      <DropdownMenuItem icon={<EyeIcon size={16} />}>公開する</DropdownMenuItem>
      <DropdownMenuItem icon={<PencilSimpleIcon size={16} />}>
        編集
      </DropdownMenuItem>
      <DropdownMenuItem icon={<TrashIcon size={16} />} variant="danger">
        削除
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

export const WithDangerItem: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
  },
  render: () => (
    <Section title="Danger variant">
      <DropdownMenu trigger={defaultTrigger}>
        <DropdownMenuItem icon={<TrashIcon size={16} />} variant="danger">
          削除
        </DropdownMenuItem>
      </DropdownMenu>
    </Section>
  ),
};

export const Disabled: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
    disabled: true,
  },
  render: () => (
    <Section title="Disabled">
      <DropdownMenu trigger={defaultTrigger} disabled>
        <DropdownMenuItem>表示されない</DropdownMenuItem>
      </DropdownMenu>
    </Section>
  ),
};

export const DisabledWithReason: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
    disabled: true,
    disabledReason: '権限がありません',
  },
  render: () => (
    <Section title="Disabled with reason tooltip">
      <DropdownMenu
        trigger={defaultTrigger}
        disabled
        disabledReason="権限がありません"
      >
        <DropdownMenuItem>表示されない</DropdownMenuItem>
      </DropdownMenu>
    </Section>
  ),
};

export const DisabledItem: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
  },
  render: () => (
    <Section title="Disabled item">
      <DropdownMenu trigger={defaultTrigger}>
        <DropdownMenuItem icon={<EyeIcon size={16} />} disabled>
          公開する
        </DropdownMenuItem>
        <DropdownMenuItem icon={<PencilSimpleIcon size={16} />}>
          編集
        </DropdownMenuItem>
        <DropdownMenuItem icon={<TrashIcon size={16} />} variant="danger">
          削除
        </DropdownMenuItem>
      </DropdownMenu>
    </Section>
  ),
};

export const CustomTrigger: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
  },
  render: () => (
    <Section title="Custom trigger (button)">
      <DropdownMenu
        trigger={
          <button
            type="button"
            className="rounded-md border border-border px-3 py-1.5 text-sm"
          >
            メニューを開く
          </button>
        }
      >
        <DropdownMenuItem icon={<PencilSimpleIcon size={16} />}>
          編集
        </DropdownMenuItem>
        <DropdownMenuItem icon={<TrashIcon size={16} />} variant="danger">
          削除
        </DropdownMenuItem>
      </DropdownMenu>
    </Section>
  ),
};

export const WithLinkItem: Story = {
  args: {
    trigger: defaultTrigger,
    children: null,
  },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With link item (render prop)">
        <DropdownMenu trigger={defaultTrigger}>
          <DropdownMenuItem
            icon={<PencilSimpleIcon size={16} />}
            // biome-ignore lint/a11y/useAnchorContent: render prop でコンテンツは Menu.Item から注入される
            render={<a href="/settings" />}
          >
            設定
          </DropdownMenuItem>
          <DropdownMenuItem icon={<TrashIcon size={16} />} variant="danger">
            削除
          </DropdownMenuItem>
        </DropdownMenu>
      </Section>
    </Stack>
  ),
};
