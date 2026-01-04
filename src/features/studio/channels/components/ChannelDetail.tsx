'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { EpisodeList } from '@/features/studio/episodes/components/EpisodeList';
import { useDeleteChannel } from '@/features/studio/channels/hooks/useDeleteChannel';
import { Pages } from '@/libs/pages';
import Link from 'next/link';

interface Props {
  channelId: string;
}

export function ChannelDetail({ channelId }: Props) {
  const router = useRouter();
  const { deleteMutation } = useDeleteChannel();
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEditClick() {
    router.push(Pages.studio.editChannel.path({ id: channelId }));
  }

  async function handleDeleteClick() {
    setError(undefined);

    try {
      const response = await deleteMutation.mutateAsync({ channelId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        setError(
          response.data.error?.message ?? 'チャンネルの削除に失敗しました',
        );
        return;
      }

      router.push(Pages.studio.channels.path());
    } catch {
      setError('チャンネルの削除に失敗しました');
    }
  }

  return (
    <div>
      <div>
        <Link
          href={Pages.studio.channels.path()}
          className="underline"
        >
          チャンネルリストへ戻る
        </Link>
      </div>

      <h1>{Pages.studio.channel.title}</h1>
      <p>Channel ID: {channelId}</p>

      {error && <p>{error}</p>}

      <button
        type="button"
        className="border"
        disabled={deleteMutation.isPending}
        onClick={handleEditClick}
      >
        チャンネルを編集
      </button>

      <button
        type="button"
        className="border"
        disabled={deleteMutation.isPending}
        onClick={handleDeleteClick}
      >
        {deleteMutation.isPending ? '削除中...' : 'チャンネルを削除'}
      </button>

      <hr />

      <h2>エピソード一覧</h2>
      <Suspense fallback={<p>読み込み中...</p>}>
        <EpisodeList channelId={channelId} />
      </Suspense>
    </div>
  );
}
