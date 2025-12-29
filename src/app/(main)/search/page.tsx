import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.search.title,
};

export default function SearchPage() {
  return <div>Search</div>;
}
