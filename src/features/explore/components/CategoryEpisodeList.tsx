'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useCategoryEpisodes } from '@/features/explore/hooks/useCategoryEpisodes';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { Pages } from '@/libs/pages';

interface Props {
  categorySlug: string;
}

export function CategoryEpisodeList({ categorySlug }: Props) {
  const { episodes } = useCategoryEpisodes(categorySlug);
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();

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
            priority={index < 6}
            isPlaying={episode.id === nowPlayingEpisodeId}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
