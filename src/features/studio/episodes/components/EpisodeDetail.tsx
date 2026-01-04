'use client';

import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ScriptLineList } from '@/features/studio/episodes/components/ScriptLineList';
import { useEpisodeDetail } from '@/features/studio/episodes/hooks/useEpisodeDetail';
import { getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey } from '@/libs/api/generated/me/me';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { episode, deleteMutation, publishMutation, unpublishMutation } =
    useEpisodeDetail(channelId, episodeId);
  const [error, setError] = useState<string | undefined>(undefined);

  const isPublished = !!episode.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

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

  /**
   * エピソードを即時公開する
   */
  async function handlePublishClick() {
    setError(undefined);

    try {
      const response = await publishMutation.mutateAsync({
        channelId,
        episodeId,
        data: {},
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? 'エピソードの公開に失敗しました',
        );
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
          channelId,
          episodeId,
        ),
      });
    } catch {
      setError('エピソードの公開に失敗しました');
    }
  }

  /**
   * エピソードを非公開にする
   */
  async function handleUnpublishClick() {
    setError(undefined);

    try {
      const response = await unpublishMutation.mutateAsync({
        channelId,
        episodeId,
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? 'エピソードの非公開に失敗しました',
        );
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
          channelId,
          episodeId,
        ),
      });
    } catch {
      setError('エピソードの非公開に失敗しました');
    }
  }

  return (
    <div>
      <div>
        <Link
          href={Pages.studio.channel.path({ id: channelId })}
          className="underline"
        >
          チャンネルに戻る
        </Link>
      </div>

      <h1>{Pages.studio.episode.title}</h1>
      <p>タイトル: {episode.title}</p>
      {episode.description && <p>説明: {episode.description}</p>}
      <p>公開日時: {episode.publishedAt ?? '非公開'}</p>

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
        <ScriptLineList channelId={channelId} episodeId={episodeId} />
      </Suspense>
    </div>
  );
}
