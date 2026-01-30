import type { Metadata } from 'next';

import { Pages } from '@/libs/pages';

interface Props {
  params: Promise<{ channelSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channelSlug } = await params;
  return {
    title: `${Pages.channel.title} - ${channelSlug}`,
  };
}

export default async function ChannelPage({ params }: Props) {
  const { channelSlug } = await params;

  return (
    <div>
      <div>チャンネル詳細</div>
      <div>{channelSlug}</div>
    </div>
  );
}
