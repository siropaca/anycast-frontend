import {
  HeartIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { IconButtonSkeleton } from '@/components/inputs/buttons/IconButton/IconButtonSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'inputs/buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    icon: <PlusIcon size={20} />,
    'aria-label': '追加',
    size: 'md',
    color: 'primary',
    variant: 'solid',
  },
};

export const Sizes: Story = {
  args: {
    icon: <PlusIcon size={20} />,
    'aria-label': '追加',
  },
  render: () => (
    <Stack>
      <IconButton icon={<PlusIcon size={16} />} aria-label="追加" size="sm" />
      <IconButton icon={<PlusIcon size={20} />} aria-label="追加" size="md" />
      <IconButton icon={<PlusIcon size={24} />} aria-label="追加" size="lg" />
    </Stack>
  ),
};

export const Colors: Story = {
  args: {
    icon: <HeartIcon size={20} />,
    'aria-label': 'お気に入り',
  },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Solid">
        <Stack>
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="primary"
            variant="solid"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="secondary"
            variant="solid"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="danger"
            variant="solid"
          />
        </Stack>
      </Section>

      <Section title="Outline">
        <Stack>
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="primary"
            variant="outline"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="secondary"
            variant="outline"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="danger"
            variant="outline"
          />
        </Stack>
      </Section>

      <Section title="Text">
        <Stack>
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="primary"
            variant="text"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="secondary"
            variant="text"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            color="danger"
            variant="text"
          />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const AllVariants: Story = {
  args: {
    icon: <PlusIcon size={20} />,
    'aria-label': '追加',
  },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Primary Solid">
        <Stack>
          <IconButton
            icon={<PlusIcon size={16} />}
            aria-label="追加"
            size="sm"
            color="primary"
            variant="solid"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            size="md"
            color="primary"
            variant="solid"
          />
          <IconButton
            icon={<PlusIcon size={24} />}
            aria-label="追加"
            size="lg"
            color="primary"
            variant="solid"
          />
        </Stack>
      </Section>

      <Section title="Primary Outline">
        <Stack>
          <IconButton
            icon={<PencilSimpleIcon size={16} />}
            aria-label="編集"
            size="sm"
            color="primary"
            variant="outline"
          />
          <IconButton
            icon={<PencilSimpleIcon size={20} />}
            aria-label="編集"
            size="md"
            color="primary"
            variant="outline"
          />
          <IconButton
            icon={<PencilSimpleIcon size={24} />}
            aria-label="編集"
            size="lg"
            color="primary"
            variant="outline"
          />
        </Stack>
      </Section>

      <Section title="Primary Text">
        <Stack>
          <IconButton
            icon={<MagnifyingGlassIcon size={16} />}
            aria-label="検索"
            size="sm"
            color="primary"
            variant="text"
          />
          <IconButton
            icon={<MagnifyingGlassIcon size={20} />}
            aria-label="検索"
            size="md"
            color="primary"
            variant="text"
          />
          <IconButton
            icon={<MagnifyingGlassIcon size={24} />}
            aria-label="検索"
            size="lg"
            color="primary"
            variant="text"
          />
        </Stack>
      </Section>

      <Section title="Secondary Solid">
        <Stack>
          <IconButton
            icon={<HeartIcon size={16} />}
            aria-label="お気に入り"
            size="sm"
            color="secondary"
            variant="solid"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            size="md"
            color="secondary"
            variant="solid"
          />
          <IconButton
            icon={<HeartIcon size={24} />}
            aria-label="お気に入り"
            size="lg"
            color="secondary"
            variant="solid"
          />
        </Stack>
      </Section>

      <Section title="Secondary Outline">
        <Stack>
          <IconButton
            icon={<HeartIcon size={16} />}
            aria-label="お気に入り"
            size="sm"
            color="secondary"
            variant="outline"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            size="md"
            color="secondary"
            variant="outline"
          />
          <IconButton
            icon={<HeartIcon size={24} />}
            aria-label="お気に入り"
            size="lg"
            color="secondary"
            variant="outline"
          />
        </Stack>
      </Section>

      <Section title="Secondary Text">
        <Stack>
          <IconButton
            icon={<HeartIcon size={16} />}
            aria-label="お気に入り"
            size="sm"
            color="secondary"
            variant="text"
          />
          <IconButton
            icon={<HeartIcon size={20} />}
            aria-label="お気に入り"
            size="md"
            color="secondary"
            variant="text"
          />
          <IconButton
            icon={<HeartIcon size={24} />}
            aria-label="お気に入り"
            size="lg"
            color="secondary"
            variant="text"
          />
        </Stack>
      </Section>

      <Section title="Danger Solid">
        <Stack>
          <IconButton
            icon={<TrashIcon size={16} />}
            aria-label="削除"
            size="sm"
            color="danger"
            variant="solid"
          />
          <IconButton
            icon={<TrashIcon size={20} />}
            aria-label="削除"
            size="md"
            color="danger"
            variant="solid"
          />
          <IconButton
            icon={<TrashIcon size={24} />}
            aria-label="削除"
            size="lg"
            color="danger"
            variant="solid"
          />
        </Stack>
      </Section>

      <Section title="Danger Outline">
        <Stack>
          <IconButton
            icon={<TrashIcon size={16} />}
            aria-label="削除"
            size="sm"
            color="danger"
            variant="outline"
          />
          <IconButton
            icon={<TrashIcon size={20} />}
            aria-label="削除"
            size="md"
            color="danger"
            variant="outline"
          />
          <IconButton
            icon={<TrashIcon size={24} />}
            aria-label="削除"
            size="lg"
            color="danger"
            variant="outline"
          />
        </Stack>
      </Section>

      <Section title="Danger Text">
        <Stack>
          <IconButton
            icon={<XIcon size={16} />}
            aria-label="閉じる"
            size="sm"
            color="danger"
            variant="text"
          />
          <IconButton
            icon={<XIcon size={20} />}
            aria-label="閉じる"
            size="md"
            color="danger"
            variant="text"
          />
          <IconButton
            icon={<XIcon size={24} />}
            aria-label="閉じる"
            size="lg"
            color="danger"
            variant="text"
          />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const States: Story = {
  args: {
    icon: <PlusIcon size={20} />,
    'aria-label': '追加',
  },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Enabled">
        <Stack>
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="primary"
            variant="solid"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="primary"
            variant="outline"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="primary"
            variant="text"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="secondary"
            variant="solid"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="secondary"
            variant="outline"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="secondary"
            variant="text"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="danger"
            variant="solid"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="danger"
            variant="outline"
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="danger"
            variant="text"
          />
        </Stack>
      </Section>

      <Section title="Disabled">
        <Stack>
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="primary"
            variant="solid"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="primary"
            variant="outline"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="primary"
            variant="text"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="secondary"
            variant="solid"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="secondary"
            variant="outline"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="secondary"
            variant="text"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="danger"
            variant="solid"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="danger"
            variant="outline"
            disabled
          />
          <IconButton
            icon={<PlusIcon size={20} />}
            aria-label="追加"
            color="danger"
            variant="text"
            disabled
          />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  args: {
    icon: <PlusIcon size={20} />,
    'aria-label': '追加',
  },
  render: () => (
    <Stack>
      <IconButtonSkeleton size="sm" />
      <IconButtonSkeleton size="md" />
      <IconButtonSkeleton size="lg" />
    </Stack>
  ),
};
