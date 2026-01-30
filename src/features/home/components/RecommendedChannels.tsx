'use client';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedChannelsSkeleton } from '@/features/home/components/RecommendedChannelsSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useRecommendedChannels } from '@/features/home/hooks/useRecommendedChannels';

export function RecommendedChannels() {
  const { channels } = useRecommendedChannels();

  // エンプティ
  if (channels.length === 0) {
    return (
      <ContentSectionEmpty message="おすすめのチャンネルはありません">
        <RecommendedChannelsSkeleton />
      </ContentSectionEmpty>
    );
  }

  // 通常表示
  return (
    <ContentSection title="おすすめのチャンネル" moreHref="/channels">
      {channels.map((channel) => (
        <Artwork
          key={channel.id}
          src={channel.artwork?.url}
          title={channel.name}
          subtext={channel.category.name}
          size={ARTWORK_SIZE}
        />
      ))}
    </ContentSection>
  );
}
