import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { EpisodeList } from '@/features/episodes/components/EpisodeList';
import { EpisodeListSkeleton } from '@/features/episodes/components/EpisodeListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.episodes.title,
};

export default function EpisodesPage() {
  return (
    <div>
      <SectionTitle title={Pages.episodes.title} />

      <Suspense fallback={<EpisodeListSkeleton />}>
        <EpisodeList />
      </Suspense>
    </div>
  );
}
