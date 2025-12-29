import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.explore.title,
};

export default function ExplorePage() {
  return <div>Explore</div>;
}
