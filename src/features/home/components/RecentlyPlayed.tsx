'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecentlyPlayedSkeleton } from '@/features/home/components/RecentlyPlayedSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useRecentlyPlayed } from '@/features/home/hooks/useRecentlyPlayed';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponsePlaybackHistoryItemResponse } from '@/libs/api/generated/schemas/responsePlaybackHistoryItemResponse';
import { Pages } from '@/libs/pages';

export function RecentlyPlayed() {
  const { items } = useRecentlyPlayed();

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
        <RecentlyPlayedItem
          key={item.episode.id}
          item={item}
          priority={index < 8}
        />
      ))}
    </ContentSection>
  );
}

interface RecentlyPlayedItemProps {
  item: ResponsePlaybackHistoryItemResponse;
  priority: boolean;
}

function RecentlyPlayedItem({ item, priority }: RecentlyPlayedItemProps) {
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { isEpisodePlaying, playOrResume, pauseEpisode } = usePlayEpisode();
  const { episode } = item;

  function handlePlayClick() {
    if (isEpisodePlaying(episode.id)) {
      pauseEpisode();
    } else {
      playOrResume({
        ...episode,
        playbackProgress: {
          completed: item.completed,
          progressMs: item.progressMs,
        },
      });
    }
  }

  return (
    <Link
      href={Pages.episode.path({
        channelId: episode.channel.id,
        episodeId: episode.id,
      })}
    >
      <Artwork
        src={episode.channel.artwork?.url}
        title={episode.title}
        subtext={episode.channel.name}
        size={ARTWORK_SIZE}
        priority={priority}
        isPlaying={episode.id === nowPlayingEpisodeId}
        onPlayClick={episode.fullAudio ? handlePlayClick : undefined}
      />
    </Link>
  );
}
