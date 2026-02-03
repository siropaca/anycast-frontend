'use client';

import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
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
        <Link
          key={episode.id}
          href={Pages.episode.path({
            channelId: episode.channel.id,
            episodeId: episode.id,
          })}
        >
          <Artwork
            src={episode.artwork?.url}
            title={episode.title}
            subtext={episode.channel.name}
            size={ARTWORK_SIZE}
            priority={index < 8}
          />
        </Link>
      ))}
    </ContentSection>
  );
}
