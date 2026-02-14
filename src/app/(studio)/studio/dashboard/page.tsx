import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.dashboard.title,
  robots: { index: false },
};

export default function StudioDashboardPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title={Pages.studio.dashboard.title} />

      <div className="flex min-h-60 items-center justify-center">
        <p className="text-text-placeholder">Coming Soon...</p>
      </div>
    </div>
  );
}
