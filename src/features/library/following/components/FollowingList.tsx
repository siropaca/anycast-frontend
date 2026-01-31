'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { useFollowing } from '@/features/library/following/hooks/useFollowing';
import { Pages } from '@/libs/pages';

export function FollowingList() {
  const { items } = useFollowing();

  // エンプティ
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        フォロー中のユーザーはいません
      </p>
    );
  }

  // 通常表示
  return (
    <ArtworkGrid>
      {items.map((item) => (
        <Link
          key={item.user.id}
          href={Pages.user.path(item.user.username)}
        >
          <Artwork
            src={item.user.avatar?.url}
            title={item.user.displayName}
            subtext={`@${item.user.username}`}
            rounded
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
