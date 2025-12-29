import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';
import type { ExploreSearchParams } from '@/libs/pages/mainPages';

export const metadata: Metadata = {
  title: Pages.explore.title,
};

interface Props {
  searchParams: Promise<ExploreSearchParams>;
}

export default async function ExplorePage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <div>
      <div>Explore</div>
      <div>検索クエリ: {q}</div>
    </div>
  );
}
