'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { usePlaybackHistory } from '@/features/library/history/hooks/usePlaybackHistory';
import { Pages } from '@/libs/pages';

export function PlaybackHistoryList() {
  const { items } = usePlaybackHistory();

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">再生履歴はありません</p>
    );
  }

  return (
    <ArtworkGrid>
      {items.map((item, index) => (
        <Link
          key={item.episode.id}
          href={Pages.episode.path({
            channelId: item.episode.channel.id,
            episodeId: item.episode.id,
          })}
        >
          <Artwork
            src={item.episode.channel.artwork?.url}
            title={item.episode.title}
            subtext={item.episode.channel.name}
            priority={index < 6}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
