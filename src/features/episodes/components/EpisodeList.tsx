'use client';

import { EpisodeItem } from '@/features/episodes/components/EpisodeItem';
import { useEpisodes } from '@/features/episodes/hooks/useEpisodes';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';

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
