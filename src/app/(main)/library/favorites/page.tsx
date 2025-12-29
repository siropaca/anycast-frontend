import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.favorites.title,
  robots: { index: false },
};

export default function LibraryFavoritesPage() {
  return <div>Library Favorites</div>;
}
