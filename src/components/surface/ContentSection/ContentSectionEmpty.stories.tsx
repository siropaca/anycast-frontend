import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'surface/ContentSectionEmpty',
  component: ContentSectionEmpty,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentSectionEmpty>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = Array.from({ length: 8 }, (_, i) => (
  // biome-ignore lint/suspicious/noArrayIndexKey: static story list
  <ArtworkSkeleton key={i} size={128} />
));

export const Playground: Story = {
  args: {
    message: 'コンテンツがありません',
    children: <div className="inline-flex space-x-2">{items}</div>,
  },
};

export const AllVariants: Story = {
  args: { message: '', children: null },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Default">
        <ContentSectionEmpty message="お気に入りのユーザーはいません">
          <div className="inline-flex space-x-2">{items}</div>
        </ContentSectionEmpty>
      </Section>

      <Section title="Rounded Items">
        <ContentSectionEmpty message="お気に入りのユーザーはいません">
          <div className="inline-flex space-x-2">
            {Array.from({ length: 8 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static story list
              <ArtworkSkeleton key={i} size={128} rounded />
            ))}
          </div>
        </ContentSectionEmpty>
      </Section>
    </Stack>
  ),
};
