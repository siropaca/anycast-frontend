import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { LikeList } from '@/features/library/likes/components/LikeList';
import { LikeListSkeleton } from '@/features/library/likes/components/LikeListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.likes.title,
  robots: { index: false },
};

export default function LibraryLikesPage() {
  return (
    <div>
      <SectionTitle title={Pages.library.likes.title} />

      <Suspense fallback={<LikeListSkeleton />}>
        <LikeList />
      </Suspense>
    </div>
  );
}
