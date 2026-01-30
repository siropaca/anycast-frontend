import type { Metadata } from 'next';
import { Suspense } from 'react';

import { RecentlyPlayed } from '@/features/home/components/RecentlyPlayed';
import { RecentlyPlayedSkeleton } from '@/features/home/components/RecentlyPlayedSkeleton';
import { RecommendedChannels } from '@/features/home/components/RecommendedChannels';
import { RecommendedChannelsSkeleton } from '@/features/home/components/RecommendedChannelsSkeleton';
import { RecommendedEpisodes } from '@/features/home/components/RecommendedEpisodes';
import { RecommendedEpisodesSkeleton } from '@/features/home/components/RecommendedEpisodesSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.home.title,
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* おすすめのエピソード */}
      <Suspense fallback={<RecommendedEpisodesSkeleton />}>
        <RecommendedEpisodes />
      </Suspense>

      {/* おすすめのチャンネル */}
      <Suspense fallback={<RecommendedChannelsSkeleton />}>
        <RecommendedChannels />
      </Suspense>

      {/* 最近聴いたコンテンツ */}
      <Suspense fallback={<RecentlyPlayedSkeleton />}>
        <RecentlyPlayed />
      </Suspense>
    </div>
  );
}
