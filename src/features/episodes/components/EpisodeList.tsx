'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useEpisodes } from '@/features/episodes/hooks/useEpisodes';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponseRecommendedEpisodeResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeResponse';
import { Pages } from '@/libs/pages';

export function EpisodeList() {
  const { episodes } = useEpisodes();

  if (episodes.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        おすすめのエピソードはありません
      </p>
    );
  }

  return (
    <ArtworkGrid>
      {episodes.map((episode, index) => (
        <EpisodeItem key={episode.id} episode={episode} priority={index < 6} />
      ))}
    </ArtworkGrid>
  );
}

interface EpisodeItemProps {
  episode: ResponseRecommendedEpisodeResponse;
  priority: boolean;
}

function EpisodeItem({ episode, priority }: EpisodeItemProps) {
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { isEpisodePlaying, playOrResume, pauseEpisode } = usePlayEpisode();

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
        priority={priority}
        isPlaying={episode.id === nowPlayingEpisodeId}
        onPlayClick={episode.fullAudio ? handlePlayClick : undefined}
      />
    </Link>
  );
}
