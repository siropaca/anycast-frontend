import {
  CloudArrowUpIcon,
  CopyIcon,
  DownloadSimpleIcon,
  FloppyDiskIcon,
  ShareNetworkIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SplitButton } from '@/components/inputs/buttons/SplitButton/SplitButton';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/buttons/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenu = (
  <>
    <DropdownMenuItem icon={<CopyIcon size={16} />}>
      コピーとして保存
    </DropdownMenuItem>
    <DropdownMenuItem icon={<DownloadSimpleIcon size={16} />}>
      ダウンロード
    </DropdownMenuItem>
    <DropdownMenuItem icon={<ShareNetworkIcon size={16} />}>
      共有
    </DropdownMenuItem>
  </>
);

export const Playground: Story = {
  args: {
    size: 'md',
    color: 'primary',
    variant: 'solid',
    loading: false,
    children: '保存',
    menu: null,
  },
  render: (args) => (
    <SplitButton {...args} menu={defaultMenu}>
      {args.children}
    </SplitButton>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <SplitButton size="sm" menu={defaultMenu}>
        Small
      </SplitButton>
      <SplitButton size="md" menu={defaultMenu}>
        Medium
      </SplitButton>
      <SplitButton size="lg" menu={defaultMenu}>
        Large
      </SplitButton>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Solid">
        <Stack>
          <SplitButton color="primary" variant="solid" menu={defaultMenu}>
            Primary
          </SplitButton>
          <SplitButton color="secondary" variant="solid" menu={defaultMenu}>
            Secondary
          </SplitButton>
          <SplitButton color="danger" variant="solid" menu={defaultMenu}>
            Danger
          </SplitButton>
          <SplitButton color="inverse" variant="solid" menu={defaultMenu}>
            Inverse
          </SplitButton>
        </Stack>
      </Section>

      <Section title="Outline">
        <Stack>
          <SplitButton color="primary" variant="outline" menu={defaultMenu}>
            Primary
          </SplitButton>
          <SplitButton color="secondary" variant="outline" menu={defaultMenu}>
            Secondary
          </SplitButton>
          <SplitButton color="danger" variant="outline" menu={defaultMenu}>
            Danger
          </SplitButton>
          <SplitButton color="inverse" variant="outline" menu={defaultMenu}>
            Inverse
          </SplitButton>
        </Stack>
      </Section>
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Stack>
      <SplitButton leftIcon={<FloppyDiskIcon size={16} />} menu={defaultMenu}>
        保存
      </SplitButton>
      <SplitButton
        leftIcon={<CloudArrowUpIcon size={16} />}
        color="secondary"
        menu={defaultMenu}
      >
        アップロード
      </SplitButton>
    </Stack>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stack>
      <SplitButton loading menu={defaultMenu}>
        保存中
      </SplitButton>
      <SplitButton loading color="secondary" menu={defaultMenu}>
        読み込み中
      </SplitButton>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Disabled">
        <Stack>
          <SplitButton disabled menu={defaultMenu}>
            保存
          </SplitButton>
          <SplitButton
            disabled
            color="secondary"
            variant="outline"
            menu={defaultMenu}
          >
            保存
          </SplitButton>
        </Stack>
      </Section>

      <Section title="Disabled with Reason">
        <Stack>
          <SplitButton
            disabled
            disabledReason="先にフォームを入力してください"
            menu={defaultMenu}
          >
            保存
          </SplitButton>
        </Stack>
      </Section>
    </Stack>
  ),
};

export const DangerAction: Story = {
  render: () => (
    <SplitButton
      color="danger"
      leftIcon={<TrashIcon size={16} />}
      menu={
        <DropdownMenuItem icon={<TrashIcon size={16} />} variant="danger">
          完全に削除
        </DropdownMenuItem>
      }
    >
      削除
    </SplitButton>
  ),
};
