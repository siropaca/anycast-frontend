'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { useLikes } from '@/features/library/likes/hooks/useLikes';
import { Pages } from '@/libs/pages';

export function LikeList() {
  const { items } = useLikes();

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        高評価したエピソードはありません
      </p>
    );
  }

  return (
    <ArtworkGrid>
      {items.map((item, index) => (
        <Link
          key={item.episode.id}
          href={Pages.episode.path({
            channelSlug: item.episode.channel.id,
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
