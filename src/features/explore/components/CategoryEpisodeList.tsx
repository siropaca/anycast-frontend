'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useCategoryEpisodes } from '@/features/explore/hooks/useCategoryEpisodes';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponseRecommendedEpisodeResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeResponse';
import { Pages } from '@/libs/pages';

interface Props {
  categorySlug: string;
}

export function CategoryEpisodeList({ categorySlug }: Props) {
  const { episodes } = useCategoryEpisodes(categorySlug);

  if (episodes.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        エピソードがありません
      </p>
    );
  }

  return (
    <ArtworkGrid>
      {episodes.map((episode, index) => (
        <CategoryEpisodeItem
          key={episode.id}
          episode={episode}
          priority={index < 6}
        />
      ))}
    </ArtworkGrid>
  );
}

interface CategoryEpisodeItemProps {
  episode: ResponseRecommendedEpisodeResponse;
  priority: boolean;
}

function CategoryEpisodeItem({ episode, priority }: CategoryEpisodeItemProps) {
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
