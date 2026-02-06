'use client';

import Link from 'next/link';

import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';
import { formatDate } from '@/utils/date';

interface Props {
  episodes: ResponseEpisodeResponse[];
  currentEpisodeId: string;
  channelId: string;
}

export function ChannelEpisodeList({
  episodes,
  currentEpisodeId,
  channelId,
}: Props) {
  const otherEpisodes = episodes.filter((ep) => ep.id !== currentEpisodeId);
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();

  if (otherEpisodes.length === 0) {
    return null;
  }

  return (
    <ContentSection title="同じチャンネルのエピソード">
      {otherEpisodes.map((ep) => (
        <Link
          key={ep.id}
          href={Pages.episode.path({
            channelId,
            episodeId: ep.id,
          })}
        >
          <Artwork
            src={ep.artwork?.url}
            title={ep.title}
            size={ARTWORK_FIXED_SIZE}
            subtext={
              ep.publishedAt
                ? formatDate(new Date(ep.publishedAt))
                : undefined
            }
            isPlaying={ep.id === nowPlayingEpisodeId}
          />
        </Link>
      ))}
    </ContentSection>
  );
}
