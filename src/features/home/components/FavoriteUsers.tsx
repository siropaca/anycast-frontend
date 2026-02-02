'use client';

import Link from 'next/link';

import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { FavoriteUsersSkeleton } from '@/features/home/components/FavoriteUsersSkeleton';
import { ARTWORK_SIZE } from '@/features/home/constants/layout';
import { useFavoriteUsers } from '@/features/home/hooks/useFavoriteUsers';
import { Pages } from '@/libs/pages';

export function FavoriteUsers() {
  const { items } = useFavoriteUsers();

  if (items.length === 0) {
    return (
      <ContentSectionEmpty message="お気に入りのユーザーはいません">
        <FavoriteUsersSkeleton />
      </ContentSectionEmpty>
    );
  }

  return (
    <ContentSection
      title="お気に入りのユーザー"
      moreHref={Pages.library.following.path()}
    >
      {items.map((item, index) => (
        <Link
          key={item.user.id}
          href={Pages.user.path({ username: item.user.username })}
        >
          <Artwork
            src={item.user.avatar?.url}
            title={item.user.displayName}
            subtext={`@${item.user.username}`}
            size={ARTWORK_SIZE}
            rounded
            priority={index < 8}
          />
        </Link>
      ))}
    </ContentSection>
  );
}
