import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.library.history.title,
  robots: { index: false },
};

export default function LibraryHistoryPage() {
  return <div>Library History</div>;
}
