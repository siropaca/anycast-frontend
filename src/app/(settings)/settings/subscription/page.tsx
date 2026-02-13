import type { Metadata } from 'next';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.settings.subscription.title,
  robots: { index: false },
};

export default function SettingsSubscriptionPage() {
  return (
    <div className="space-y-8">
      <SectionTitle title="サブスクリプション" level="h2" />
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-text-placeholder">Coming Soon...</p>
      </div>
    </div>
  );
}
