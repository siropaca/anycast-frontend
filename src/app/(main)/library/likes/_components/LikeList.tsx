'use client';

import Link from 'next/link';

import { useLikes } from '@/app/(main)/library/likes/_components/useLikes';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { Pages } from '@/libs/pages';

export function LikeList() {
  const { items } = useLikes();

  // エンプティ
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        高評価したエピソードはありません
      </p>
    );
  }

  // 通常表示
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
    </div>
  );
}
