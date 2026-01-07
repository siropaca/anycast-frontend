'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useEpisodeDetail } from '@/features/studio/episodes/hooks/useEpisodeDetail';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const router = useRouter();
  const {
    episode,
    isPublished,
    isMutating,
    deleteMutation,
    publishMutation,
    unpublishMutation,
  } = useEpisodeDetail(channelId, episodeId);
  const [error, setError] = useState<string | undefined>(undefined);

  function handleEditClick() {
    router.push(Pages.studio.editEpisode.path({ id: channelId, episodeId }));
  }

  function handleDeleteClick() {
    setError(undefined);

    deleteMutation.mutate(
      {
        channelId,
        episodeId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(
              response.data.error?.message ?? 'エピソードの削除に失敗しました',
            );
            return;
          }

          router.push(Pages.studio.channel.path({ id: channelId }));
        },
      },
    );
  }

  function handlePublishClick() {
    setError(undefined);

    publishMutation.mutate(
      {
        channelId,
        episodeId,
        data: {},
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ?? 'エピソードの公開に失敗しました',
            );
          }
        },
      },
    );
  }

  function handleUnpublishClick() {
    setError(undefined);

    unpublishMutation.mutate(
      {
        channelId,
        episodeId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                'エピソードの非公開に失敗しました',
            );
          }
        },
      },
    );
  }

  return (
    <div>
      <h1>{Pages.studio.episode.title}</h1>
      <p>タイトル: {episode.title}</p>
      {episode.description && <p>説明: {episode.description}</p>}
      <p>公開日時: {episode.publishedAt ?? '非公開'}</p>

      {episode.artwork && (
        <img src={episode.artwork.url} alt="" className="size-[200px]" />
      )}

      {error && <p>{error}</p>}

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleEditClick}
      >
        エピソードを編集
      </button>

      <button
        type="button"
        className="border"
        disabled={isMutating}
        onClick={handleDeleteClick}
      >
        {deleteMutation.isPending ? '削除中...' : 'エピソードを削除'}
      </button>

      {isPublished ? (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handleUnpublishClick}
        >
          {unpublishMutation.isPending
            ? '非公開にしています...'
            : '非公開にする'}
        </button>
      ) : (
        <button
          type="button"
          className="border"
          disabled={isMutating}
          onClick={handlePublishClick}
        >
          {publishMutation.isPending ? '公開しています...' : 'エピソードを公開'}
        </button>
      )}

      <hr className="my-4" />

      <Suspense fallback={<p>読み込み中...</p>}>
        <ScriptLineList
          channelId={channelId}
          episodeId={episodeId}
          episodeName={episode.title}
        />
      </Suspense>
    </div>
  );
}
