import type { Metadata } from 'next';
import { Suspense } from 'react';

import { PlaybackHistoryList } from '@/app/(main)/library/history/_components/PlaybackHistoryList';
import { PlaybackHistoryListSkeleton } from '@/app/(main)/library/history/_components/PlaybackHistoryListSkeleton';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.history.title,
  robots: { index: false },
};

export default function LibraryHistoryPage() {
  return (
    <div>
      <SectionTitle title={Pages.library.history.title} />

      <Suspense fallback={<PlaybackHistoryListSkeleton />}>
        <PlaybackHistoryList />
      </Suspense>
    </div>
  );
}
