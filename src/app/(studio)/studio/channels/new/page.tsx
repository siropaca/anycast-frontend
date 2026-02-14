import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateChannel } from '@/features/studio/channels/components/CreateChannel';
import { CreateChannelSkeleton } from '@/features/studio/channels/components/CreateChannelSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.studio.newChannel.title,
  robots: { index: false },
};

export default function StudioNewChannelPage() {
  return (
    <Suspense fallback={<CreateChannelSkeleton />}>
      <CreateChannel />
    </Suspense>
  );
}
