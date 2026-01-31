'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useEpisodes } from '@/features/episodes/hooks/useEpisodes';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export function EpisodeList() {
  const { episodes } = useEpisodes();

  // エンプティ
  if (episodes.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        おすすめのエピソードはありません
      </p>
    );
  }

  // 通常表示
  return (
    <ArtworkGrid>
      {episodes.map((episode, index) => (
        <Link
          key={episode.id}
          href={Pages.episode.path({
            channelSlug: episode.channel.id,
            episodeId: episode.id,
          })}
        >
          <Artwork
            src={episode.artwork?.url}
            title={episode.title}
            subtext={episode.channel.name}
            priority={index < 6}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
