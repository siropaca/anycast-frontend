import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { CategoryList } from '@/features/explore/components/CategoryList';
import { CategoryListSkeleton } from '@/features/explore/components/CategoryListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.explore.title,
};

export default function ExplorePage() {
  return (
    <div>
      <SectionTitle title={Pages.explore.title} />

      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
}
