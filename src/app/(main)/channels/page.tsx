import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ChannelList } from '@/features/channels/components/ChannelList';
import { ChannelListSkeleton } from '@/features/channels/components/ChannelListSkeleton';
import { Pages } from '@/libs/pages';

export const metadata: Metadata = {
  title: Pages.channels.title,
};

export default function ChannelsPage() {
  return (
    <div>
      <SectionTitle title={Pages.channels.title} />

      <Suspense fallback={<ChannelListSkeleton />}>
        <ChannelList />
      </Suspense>
    </div>
  );
}
