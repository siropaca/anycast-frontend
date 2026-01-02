import type { Metadata } from 'next';
import { MyChannelDetail } from '@/features/studio/channels/components/MyChannelDetail';
import { Pages } from '@/libs/pages';
import type { ChannelParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.channel.title,
  robots: { index: false },
};

interface Props {
  params: Promise<ChannelParams>;
}

export default async function StudioChannelPage({ params }: Props) {
  const { id } = await params;

  return <MyChannelDetail channelId={id} />;
}
