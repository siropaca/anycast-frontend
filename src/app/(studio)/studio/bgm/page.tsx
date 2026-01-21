import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.bgm.title,
  robots: { index: false },
};

export default function StudioBgmPage() {
  return <div>Studio BGM</div>;
}
