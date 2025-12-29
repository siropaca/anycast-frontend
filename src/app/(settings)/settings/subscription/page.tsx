import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.settings.subscription.title,
  robots: { index: false },
};

export default function SettingsSubscriptionPage() {
  return <div>Settings Subscription</div>;
}
