import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { AvatarSkeleton } from '@/components/dataDisplay/Avatar/AvatarSkeleton';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'dataDisplay/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://i.pravatar.cc/150?img=3';

export const Playground: Story = {
  args: {
    src: sampleImage,
    alt: 'User avatar',
    fallback: 'A',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack>
      <Avatar src={sampleImage} size="sm" alt="Small avatar" />
      <Avatar src={sampleImage} size="md" alt="Medium avatar" />
      <Avatar src={sampleImage} size="lg" alt="Large avatar" />
    </Stack>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Sizes">
        <Stack>
          <Avatar fallback="A" size="sm" />
          <Avatar fallback="AB" size="md" />
          <Avatar fallback="ABC" size="lg" />
        </Stack>
      </Section>
      <Section title="Various Initials">
        <Stack>
          <Avatar fallback="田" />
          <Avatar fallback="山" />
          <Avatar fallback="?" />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const ImageError: Story = {
  render: () => (
    <Stack>
      <Avatar src="https://invalid-url.example/image.jpg" fallback="E" />
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="With Image">
        <Stack>
          <Avatar src={sampleImage} size="sm" alt="Small" />
          <Avatar src={sampleImage} size="md" alt="Medium" />
          <Avatar src={sampleImage} size="lg" alt="Large" />
        </Stack>
      </Section>
      <Section title="With Fallback">
        <Stack>
          <Avatar fallback="S" size="sm" />
          <Avatar fallback="M" size="md" />
          <Avatar fallback="L" size="lg" />
        </Stack>
      </Section>
      <Section title="Skeleton">
        <Stack>
          <AvatarSkeleton size="sm" />
          <AvatarSkeleton size="md" />
          <AvatarSkeleton size="lg" />
        </Stack>
      </Section>
    </Stack>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <Stack>
      <AvatarSkeleton size="sm" />
      <AvatarSkeleton size="md" />
      <AvatarSkeleton size="lg" />
    </Stack>
  ),
};
