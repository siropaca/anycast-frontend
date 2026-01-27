import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Artwork } from '@/components/dataDisplay/Artwork/Artwork';
import { ArtworkSkeleton } from '@/components/dataDisplay/Artwork/ArtworkSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/Artwork',
  component: Artwork,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Artwork>;

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
      <Artwork src={sampleImage} size={64} alt="64px artwork" />
      <Artwork src={sampleImage} size={128} alt="128px artwork" />
      <Artwork src={sampleImage} size={192} alt="192px artwork" />
    </Stack>
  ),
};

export const NoImage: Story = {
  render: () => (
    <Stack>
      <Artwork size={64} />
      <Artwork size={128} />
      <Artwork size={192} />
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With Image">
        <Stack>
          <Artwork src={sampleImage} size={64} alt="64px" />
          <Artwork src={sampleImage} size={128} alt="128px" />
          <Artwork src={sampleImage} size={192} alt="192px" />
        </Stack>
      </Section>
      <Section title="No Image">
        <Stack>
          <Artwork size={64} />
          <Artwork size={128} />
          <Artwork size={192} />
        </Stack>
      </Section>
      <Section title="Skeleton">
        <Stack>
          <ArtworkSkeleton size={64} />
          <ArtworkSkeleton size={128} />
          <ArtworkSkeleton size={192} />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack>
      <ArtworkSkeleton size={64} />
      <ArtworkSkeleton size={128} />
      <ArtworkSkeleton size={192} />
    </Stack>
  ),
};
