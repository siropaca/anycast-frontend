'use client';

import Link from 'next/link';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function MyChannelDetail({ channelId }: Props) {
  return (
    <div>
      <h1>{Pages.studio.channel.title}</h1>
      <p>Channel ID: {channelId}</p>

      <Link href={Pages.studio.editChannel.path({ id: channelId })}>
        [編集]
      </Link>
    </div>
  );
}
