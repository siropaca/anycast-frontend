'use client';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useRecommendedEpisodes } from '@/features/home/hooks/useRecommendedEpisodes';

export function RecommendedEpisodes() {
  const { episodes } = useRecommendedEpisodes();

  // エンプティ
  if (episodes.length === 0) {
    return (
      <ContentSectionEmpty message="おすすめのエピソードはありません">
        <RecommendedEpisodesSkeleton />
      </ContentSectionEmpty>
    );
  }

  // 通常表示
  return (
    <ContentSection title="おすすめのエピソード" moreHref="/episodes">
      {episodes.map((episode) => (
        <Artwork
          key={episode.id}
          src={episode.artwork?.url}
          title={episode.title}
          subtext={episode.channel.name}
          size={ARTWORK_SIZE}
        />
      ))}
    </ContentSection>
  );
}
