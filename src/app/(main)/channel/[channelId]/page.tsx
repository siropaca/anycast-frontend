import type { Metadata } from 'next';

import { getChannelsChannelId } from '@/libs/api/generated/channels/channels';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import type { ChannelParams } from '@/libs/pages/mainPages';

interface Props {
  params: Promise<ChannelParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channelId } = await params;
  const response = await getChannelsChannelId(channelId);
  const channel = unwrapResponse<ResponseChannelResponse>(response);

  return {
    title: channel.name,
  };
}

export default async function ChannelPage({ params }: Props) {
  const { channelId } = await params;
  const response = await getChannelsChannelId(channelId);
  const channel = unwrapResponse<ResponseChannelResponse>(response);

  return (
    <div>
      <div>{channel.name}</div>
    </div>
  );
}
