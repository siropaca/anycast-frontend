import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.index.title,
  robots: { index: false },
};

export default function StudioPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title={Pages.studio.dashboard.title} />

      <div>ここにコンテンツ</div>
    </div>
  );
}
