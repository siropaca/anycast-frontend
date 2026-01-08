import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.settings.title,
  robots: { index: false },
};

export default function StudioSettingsPage() {
  return (
    <div>
      <p>Studio Setting</p>
    </div>
  );
}
