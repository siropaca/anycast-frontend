import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateChannel } from '@/features/studio/channels/components/CreateChannel';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.newChannel.title,
  robots: { index: false },
};

export default function StudioNewChannelPage() {
  return (
    // TODO: ローディング実装
    <Suspense fallback={<p>読み込み中...</p>}>
      <CreateChannel />
    </Suspense>
  );
}
