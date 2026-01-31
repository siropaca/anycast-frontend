'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { usePlaybackHistory } from '@/features/library/history/hooks/usePlaybackHistory';
import { Pages } from '@/libs/pages';

export function PlaybackHistoryList() {
  const { items } = usePlaybackHistory();

  // エンプティ
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">再生履歴はありません</p>
    );
  }

  // 通常表示
  return (
    <ArtworkGrid>
      {items.map((item) => (
        <Link
          key={item.episode.id}
          href={Pages.episode.path(item.episode.channel.id, item.episode.id)}
        >
          <Artwork
            src={item.episode.channel.artwork?.url}
            title={item.episode.title}
            subtext={item.episode.channel.name}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
