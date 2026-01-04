'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEpisodeDetail } from '@/features/studio/episodes/hooks/useEpisodeDetail';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const router = useRouter();
  const { episode, deleteMutation } = useEpisodeDetail(channelId, episodeId);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEditClick() {
    router.push(Pages.studio.editEpisode.path({ id: channelId, episodeId }));
  }

  async function handleDeleteClick() {
    setError(undefined);

    try {
      const response = await deleteMutation.mutateAsync({
        channelId,
        episodeId,
      });

      if (response.status !== StatusCodes.NO_CONTENT) {
        setError(
          response.data.error?.message ?? 'エピソードの削除に失敗しました',
        );
        return;
      }

      router.push(Pages.studio.channel.path({ id: channelId }));
    } catch {
      setError('エピソードの削除に失敗しました');
    }
  }

  if (!episode) {
    return <p>エピソードが見つかりません</p>;
  }

  return (
    <div>
      <h1>{Pages.studio.episode.title}</h1>
      <p>タイトル: {episode.title}</p>
      {episode.description && <p>説明: {episode.description}</p>}
      {episode.publishedAt && <p>公開日時: {episode.publishedAt}</p>}

      {error && <p>{error}</p>}

      <button
        type="button"
        className="border"
        disabled={deleteMutation.isPending}
        onClick={handleEditClick}
      >
        エピソードを編集
      </button>

      <button
        type="button"
        className="border"
        disabled={deleteMutation.isPending}
        onClick={handleDeleteClick}
      >
        {deleteMutation.isPending ? '削除中...' : 'エピソードを削除'}
      </button>

      <hr />
    </div>
  );
}
