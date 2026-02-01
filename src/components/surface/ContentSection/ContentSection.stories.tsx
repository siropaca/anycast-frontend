import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ArtworkSkeleton } from '@/components/dataDisplay/artworks/Artwork/ArtworkSkeleton';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { Section } from '@/libs/storybook/Section';
import { Stack } from '@/libs/storybook/Stack';

const meta = {
  title: 'surface/ContentSection',
  component: ContentSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = Array.from({ length: 8 }, (_, i) => (
  // biome-ignore lint/suspicious/noArrayIndexKey: static story list
  <ArtworkSkeleton key={i} size={128} />
));

export const Playground: Story = {
  args: {
    title: 'セクションタイトル',
    children: items,
  },
};

export const WithMoreLink: Story = {
  args: {
    title: 'セクションタイトル',
    moreHref: '#',
    children: items,
  },
};

export const AllVariants: Story = {
  args: { title: '', children: null },
  render: () => (
    <Stack direction="column" gap={24}>
      <Section title="Default">
        <ContentSection title="セクションタイトル">{items}</ContentSection>
      </Section>

      <Section title="With More Link">
        <ContentSection title="セクションタイトル" moreHref="#">
          {items}
        </ContentSection>
      </Section>
    </Stack>
  ),
};
