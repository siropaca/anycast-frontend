import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ChannelList } from '@/features/studio/channels/components/ChannelList';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.channels.title,
  robots: { index: false },
};

export default function StudioChannelsPage() {
  return (
    <div>
      {/* TODO: loading 作成 */}
      <Suspense fallback={<p>読み込み中...</p>}>
        <ChannelList />
      </Suspense>
    </div>
  );
}
