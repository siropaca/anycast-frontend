import type { Metadata } from 'next';
import { AccountContent } from '@/features/settings/account/components/AccountContent';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.settings.account.title,
  robots: { index: false },
};

export default function SettingsAccountPage() {
  return <AccountContent />;
}
