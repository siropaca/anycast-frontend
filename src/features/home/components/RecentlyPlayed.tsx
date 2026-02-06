'use client';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecentlyPlayedSkeleton } from '@/features/home/components/RecentlyPlayedSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useRecentlyPlayed } from '@/features/home/hooks/useRecentlyPlayed';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { Pages } from '@/libs/pages';

export function RecentlyPlayed() {
  const { items } = useRecentlyPlayed();
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();

  if (items.length === 0) {
    return (
      <ContentSectionEmpty message="最近聴いたコンテンツはありません">
        <RecentlyPlayedSkeleton />
      </ContentSectionEmpty>
    );
  }

  return (
    <ContentSection
      title="最近聴いたコンテンツ"
      moreHref={Pages.library.history.path()}
    >
      {items.map((item, index) => (
        <Artwork
          key={item.episode.id}
          src={item.episode.channel.artwork?.url}
          title={item.episode.title}
          subtext={item.episode.channel.name}
          size={ARTWORK_SIZE}
          priority={index < 8}
          isPlaying={item.episode.id === nowPlayingEpisodeId}
        />
      ))}
    </ContentSection>
  );
}
