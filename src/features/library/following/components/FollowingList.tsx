'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { useFollowing } from '@/features/library/following/hooks/useFollowing';
import { Pages } from '@/libs/pages';

export function FollowingList() {
  const { items } = useFollowing();

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">
        フォロー中のユーザーはいません
      </p>
    );
  }

  return (
    <ArtworkGrid>
      {items.map((item, index) => (
        <Link
          key={item.user.id}
          href={Pages.user.path({ username: item.user.username })}
        >
          <Artwork
            src={item.user.avatar?.url}
            title={item.user.displayName}
            subtext={`@${item.user.username}`}
            rounded
            priority={index < 6}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
