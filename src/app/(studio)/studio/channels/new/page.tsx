import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.newChannel.title,
  robots: { index: false },
};

export default function StudioNewChannelPage() {
  return (
    <div>
      <h1>{Pages.studio.newChannel.title}</h1>
    </div>
  );
}
