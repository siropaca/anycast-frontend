import type { Metadata } from 'next';
import { ApiKeyContent } from '@/features/settings/apiKeys/components/ApiKeyContent';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.settings.apiKeys.title,
  robots: { index: false },
};

export default function SettingsApiKeysPage() {
  return <ApiKeyContent />;
}
