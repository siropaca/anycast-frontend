import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { FollowingList } from '@/features/library/following/components/FollowingList';
import { FollowingListSkeleton } from '@/features/library/following/components/FollowingListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.following.title,
  robots: { index: false },
};

export default function LibraryFollowingPage() {
  return (
    <div>
      <SectionTitle title={Pages.library.following.title} />

      <Suspense fallback={<FollowingListSkeleton />}>
        <FollowingList />
      </Suspense>
    </div>
  );
}
