import { MusicNoteIcon, PlaylistIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { ArtworkImageSkeleton } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImageSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/artworks/ArtworkImage',
  component: ArtworkImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArtworkImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://picsum.photos/seed/artwork/400/400';

export const Playground: Story = {
  args: {
    src: sampleImage,
    alt: 'Channel artwork',
    size: 128,
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <ArtworkImage src={sampleImage} size={64} alt="64px artwork" />
      <ArtworkImage src={sampleImage} size={128} alt="128px artwork" />
      <ArtworkImage src={sampleImage} size={192} alt="192px artwork" />
    </Stack>
  ),
};

export const NoImage: Story = {
  render: () => (
    <Stack>
      <ArtworkImage size={64} />
      <ArtworkImage size={128} />
      <ArtworkImage size={192} />
    </Stack>
  ),
};

export const FallbackIcon: Story = {
  render: () => (
    <Stack>
      <ArtworkImage
        size={64}
        fallbackIcon={<PlaylistIcon size={24} className="text-white" />}
      />
      <ArtworkImage
        size={128}
        fallbackIcon={<PlaylistIcon size={48} className="text-white" />}
      />
      <ArtworkImage
        size={192}
        fallbackIcon={<MusicNoteIcon size={64} className="text-white" />}
      />
    </Stack>
  ),
};

export const Rounded: Story = {
  render: () => (
    <Stack>
      <ArtworkImage src={sampleImage} size={64} alt="64px" rounded />
      <ArtworkImage src={sampleImage} size={128} alt="128px" rounded />
      <ArtworkImage src={sampleImage} size={192} alt="192px" rounded />
    </Stack>
  ),
};

export const NowPlaying: Story = {
  render: () => (
    <Stack>
      <ArtworkImage src={sampleImage} size={128} alt="Playing" isPlaying />
      <ArtworkImage src={sampleImage} size={128} alt="Not playing" />
    </Stack>
  ),
};

export const PlayButton: Story = {
  render: () => (
    <Stack>
      <ArtworkImage
        src={sampleImage}
        size={128}
        alt="With play button"
        onPlayClick={() => {}}
      />
      <ArtworkImage
        src={sampleImage}
        size={170}
        alt="With play button large"
        onPlayClick={() => {}}
      />
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With Image">
        <Stack>
          <ArtworkImage src={sampleImage} size={64} alt="64px" />
          <ArtworkImage src={sampleImage} size={128} alt="128px" />
          <ArtworkImage src={sampleImage} size={192} alt="192px" />
        </Stack>
      </Section>
      <Section title="No Image">
        <Stack>
          <ArtworkImage size={64} />
          <ArtworkImage size={128} />
          <ArtworkImage size={192} />
        </Stack>
      </Section>
      <Section title="Fallback Icon">
        <Stack>
          <ArtworkImage
            size={64}
            fallbackIcon={<PlaylistIcon size={24} className="text-white" />}
          />
          <ArtworkImage
            size={128}
            fallbackIcon={<PlaylistIcon size={48} className="text-white" />}
          />
          <ArtworkImage
            size={192}
            fallbackIcon={<PlaylistIcon size={64} className="text-white" />}
          />
        </Stack>
      </Section>
      <Section title="Now Playing">
        <Stack>
          <ArtworkImage src={sampleImage} size={64} isPlaying />
          <ArtworkImage src={sampleImage} size={128} isPlaying />
          <ArtworkImage src={sampleImage} size={192} isPlaying />
        </Stack>
      </Section>
      <Section title="Play Button (hover to see)">
        <Stack>
          <ArtworkImage src={sampleImage} size={128} onPlayClick={() => {}} />
          <ArtworkImage src={sampleImage} size={170} onPlayClick={() => {}} />
        </Stack>
      </Section>
      <Section title="Rounded">
        <Stack>
          <ArtworkImage src={sampleImage} size={64} rounded />
          <ArtworkImage src={sampleImage} size={128} rounded />
          <ArtworkImage size={128} rounded />
        </Stack>
      </Section>
      <Section title="Skeleton">
        <Stack>
          <ArtworkImageSkeleton size={64} />
          <ArtworkImageSkeleton size={128} />
          <ArtworkImageSkeleton size={192} />
        </Stack>
        <Stack>
          <ArtworkImageSkeleton size={64} rounded />
          <ArtworkImageSkeleton size={128} rounded />
          <ArtworkImageSkeleton size={192} rounded />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Stack>
        <ArtworkImageSkeleton size={64} />
        <ArtworkImageSkeleton size={128} />
        <ArtworkImageSkeleton size={192} />
      </Stack>
      <Stack>
        <ArtworkImageSkeleton size={64} rounded />
        <ArtworkImageSkeleton size={128} rounded />
        <ArtworkImageSkeleton size={192} rounded />
      </Stack>
    </Stack>
  ),
};
