import type { Metadata } from 'next';
import { Suspense } from 'react';

import { LikeList } from '@/app/(main)/library/likes/_components/LikeList';
import { LikeListSkeleton } from '@/app/(main)/library/likes/_components/LikeListSkeleton';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
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
