import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PlayList } from '@/components/dataDisplay/artworks/PlayList/PlayList';
import { PlayListSkeleton } from '@/components/dataDisplay/artworks/PlayList/PlayListSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/artworks/PlayList',
  component: PlayList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PlayList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://picsum.photos/seed/pl-1/400/400';

export const Playground: Story = {
  args: {
    src: sampleImage,
    size: 170,
    title: 'お気に入りプレイリスト',
    episodeCount: 12,
  },
};

export const NoImage: Story = {
  args: {
    size: 170,
    title: '空のプレイリスト',
    episodeCount: 0,
  },
};

export const WithoutEpisodeCount: Story = {
  args: {
    src: sampleImage,
    size: 170,
    title: 'カウントなし',
  },
};

export const LongText: Story = {
  args: {
    src: sampleImage,
    size: 170,
    title: 'これはとても長いプレイリスト名で切り詰められるはずです',
    episodeCount: 128,
  },
};

export const Sizes: Story = {
  args: { title: '', episodeCount: 0 },
  render: () => (
    <Stack align="start">
      <PlayList src={sampleImage} size={120} title="Small" episodeCount={5} />
      <PlayList src={sampleImage} size={170} title="Medium" episodeCount={12} />
      <PlayList src={sampleImage} size={220} title="Large" episodeCount={30} />
    </Stack>
  ),
};

export const AllVariants: Story = {
  args: { title: '' },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With Episode Count">
        <Stack align="start">
          <PlayList
            src={sampleImage}
            size={128}
            title="プレイリスト"
            episodeCount={12}
          />
          <PlayList size={128} title="No Image" episodeCount={3} />
          <PlayList src={sampleImage} size={128} title="カウントなし" />
        </Stack>
      </Section>

      <Section title="Skeleton">
        <Stack align="start">
          <PlayListSkeleton size={120} />
          <PlayListSkeleton size={170} />
          <PlayListSkeleton size={220} />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  args: { title: '' },
  render: () => (
    <Stack align="start">
      <PlayListSkeleton size={120} />
      <PlayListSkeleton size={170} />
      <PlayListSkeleton size={220} />
    </Stack>
  ),
};
