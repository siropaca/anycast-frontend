'use client';

import { useGetMeChannelsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

export function ChannelList() {
  const { data } = useGetMeChannelsSuspense();

  const channels = unwrapResponse<ResponseChannelResponse[]>(data, []);

  if (channels.length === 0) {
    return <p>チャンネルがありません</p>;
  }

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>・{channel.name}</li>
      ))}
    </ul>
  );
}
