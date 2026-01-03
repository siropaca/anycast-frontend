'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMyChannelList } from '@/features/studio/channels/hooks/useMyChannelList';
import { Pages } from '@/libs/pages';

export function MyChannelList() {
  const router = useRouter();
  const { channels } = useMyChannelList();

  function handleNewClick() {
    router.push(Pages.studio.newChannel.path());
  }

  if (channels.length === 0) {
    return <p>チャンネルがありません</p>;
  }

  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Link
            href={Pages.studio.channel.path({ id: channel.id })}
            className="underline"
          >
            {channel.name}
          </Link>
        </li>
      ))}

      <li>
        <button type="button" className="border" onClick={handleNewClick}>
          チャンネルを作成
        </button>
      </li>
    </ul>
  );
}
