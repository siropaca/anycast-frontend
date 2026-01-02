'use client';

import Link from 'next/link';
import { useGetMeChannelsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { Pages } from '@/libs/pages';

export function MyChannelList() {
  const { data } = useGetMeChannelsSuspense();

  const channels = unwrapResponse<ResponseChannelResponse[]>(data, []);

  if (channels.length === 0) {
    return <p>チャンネルがありません</p>;
  }

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Link href={Pages.studio.channel.path({ id: channel.id })}>
            {channel.name}
          </Link>
        </li>
      ))}

      <li>
        <Link href={Pages.studio.newChannel.path()}>[作成]</Link>
      </li>
    </ul>
  );
}
