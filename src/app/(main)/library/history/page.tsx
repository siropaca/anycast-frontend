import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PlaybackHistoryList } from '@/features/library/history/components/PlaybackHistoryList';
import { PlaybackHistoryListSkeleton } from '@/features/library/history/components/PlaybackHistoryListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.history.title,
  robots: { index: false },
};

export default function LibraryHistoryPage() {
  return (
    <Suspense fallback={<PlaybackHistoryListSkeleton />}>
      <PlaybackHistoryList />
    </Suspense>
  );
}
