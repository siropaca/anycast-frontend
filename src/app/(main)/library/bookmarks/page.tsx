import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.bookmarks.title,
  robots: { index: false },
};

export default function LibraryBookmarksPage() {
  return <div>Library Bookmarks</div>;
}
