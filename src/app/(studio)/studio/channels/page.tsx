import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.channels.title,
  robots: { index: false },
};

export default function StudioChannelsPage() {
  return <div>Studio Channels</div>;
}
