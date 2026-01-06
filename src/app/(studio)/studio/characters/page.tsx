import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.characters.title,
  robots: { index: false },
};

export default function StudioCharactersPage() {
  return (
    <div>
      <p>Studio Characters</p>
    </div>
  );
}
