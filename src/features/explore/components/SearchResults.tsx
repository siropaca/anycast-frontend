'use client';

import { Suspense } from 'react';
import { SearchResultsContent } from '@/features/explore/components/SearchResultsContent';
import { SearchResultsSkeleton } from '@/features/explore/components/SearchResultsSkeleton';

interface Props {
  query: string;
}

export function SearchResults({ query }: Props) {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResultsContent query={query} />
    </Suspense>
  );
}
