'use client';

import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { EpisodeList } from '@/features/studio/channels/components/EpisodeList';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function MyChannelDetail({ channelId }: Props) {
  const router = useRouter();

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  return (
    <div>
      <h1>{Pages.studio.channel.title}</h1>
      <p>Channel ID: {channelId}</p>

      <button type="button" className="border" onClick={handleEditClick}>
        チャンネルを編集
      </button>

      <hr />

      <h2>エピソード一覧</h2>
      <Suspense fallback={<p>読み込み中...</p>}>
        <EpisodeList channelId={channelId} />
      </Suspense>
    </div>
  );
}
