import type { Metadata } from 'next';
import { AccountContent } from '@/features/settings/account/components/AccountContent';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.settings.index.title,
  robots: { index: false },
};

export default function SettingsPage() {
  return <AccountContent />;
}
