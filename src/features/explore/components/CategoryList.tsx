'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { useCategories } from '@/features/explore/hooks/useCategories';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { Pages } from '@/libs/pages';

export function CategoryList() {
  const { categories } = useCategories();

  if (categories.length === 0) {
    return (
      <p className="py-12 text-center text-text-subtle">カテゴリがありません</p>
    );
  }

  return (
    <ArtworkGrid>
      {categories.map((category, index) => (
        <Link
          key={category.id}
          href={Pages.exploreCategory.path({ category: category.slug })}
        >
          <Artwork
            src={category.image?.url}
            title={category.name}
            priority={index < 6}
          />
        </Link>
      ))}
    </ArtworkGrid>
  );
}
