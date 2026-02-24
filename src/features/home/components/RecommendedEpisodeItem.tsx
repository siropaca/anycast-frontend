'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponseRecommendedEpisodeResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeResponse';
import { Pages } from '@/libs/pages';

interface Props {
  episode: ResponseRecommendedEpisodeResponse;
  priority: boolean;
}

export function RecommendedEpisodeItem({ episode, priority }: Props) {
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { playOrResume, pauseEpisode, isEpisodePlaying } = usePlayEpisode();

  function handlePlayClick() {
    if (isEpisodePlaying(episode.id)) {
      pauseEpisode();
    } else {
      playOrResume(episode);
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
        src={episode.artwork?.url}
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
