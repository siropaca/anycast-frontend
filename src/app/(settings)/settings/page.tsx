import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '設定',
  robots: { index: false },
};

export default function SettingsPage() {
  return <div>Settings</div>;
}
