'use client';

import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedEpisodeItem } from '@/features/home/components/RecommendedEpisodeItem';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import { useRecommendedEpisodes } from '@/features/home/hooks/useRecommendedEpisodes';
import { Pages } from '@/libs/pages';

export function RecommendedEpisodes() {
  const { episodes } = useRecommendedEpisodes();

  if (episodes.length === 0) {
    return (
      <ContentSectionEmpty message="おすすめのエピソードはありません">
        <RecommendedEpisodesSkeleton />
      </ContentSectionEmpty>
    );
  }

  return (
    <ContentSection
      title="おすすめのエピソード"
      moreHref={Pages.episodes.path()}
    >
      {episodes.map((episode, index) => (
        <RecommendedEpisodeItem
          key={episode.id}
          episode={episode}
          priority={index < 8}
        />
      ))}
    </ContentSection>
  );
}
