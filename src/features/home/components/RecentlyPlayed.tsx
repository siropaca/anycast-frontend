'use client';

import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import { ContentSectionEmpty } from '@/components/surface/ContentSection/ContentSectionEmpty';
import { RecentlyPlayedItem } from '@/features/home/components/RecentlyPlayedItem';
import { RecentlyPlayedSkeleton } from '@/features/home/components/RecentlyPlayedSkeleton';
import { useRecentlyPlayed } from '@/features/home/hooks/useRecentlyPlayed';
import { Pages } from '@/libs/pages';

export function RecentlyPlayed() {
  const { items } = useRecentlyPlayed();

  if (items.length === 0) {
    return (
      <ContentSectionEmpty message="最近聴いたコンテンツはありません">
        <RecentlyPlayedSkeleton />
      </ContentSectionEmpty>
    );
  }

  return (
    <ContentSection
      title="最近聴いたコンテンツ"
      moreHref={Pages.library.history.path()}
    >
      {items.map((item, index) => (
        <RecentlyPlayedItem
          key={item.episode.id}
          item={item}
          priority={index < 8}
        />
      ))}
    </ContentSection>
  );
}
