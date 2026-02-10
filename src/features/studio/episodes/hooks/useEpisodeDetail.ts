import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  useDeleteChannelsChannelIdEpisodesEpisodeId,
  usePostChannelsChannelIdEpisodesEpisodeIdPublish,
  usePostChannelsChannelIdEpisodesEpisodeIdUnpublish,
} from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
  getGetMeChannelsChannelIdEpisodesQueryKey,
  useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense,
} from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソード詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、各種操作関数
 */
export function useEpisodeDetail(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: response } = useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );
  const deleteMutation = useDeleteChannelsChannelIdEpisodesEpisodeId();
  const publishMutation = usePostChannelsChannelIdEpisodesEpisodeIdPublish();
  const unpublishMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdUnpublish();

  const [error, setError] = useState<string>();

  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  const isPublished = !!episode.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

  /**
   * エピソードを削除する
   *
   * @returns 削除が成功したかどうか
   */
  async function deleteEpisode(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await deleteMutation.mutateAsync({
        channelId,
        episodeId,
      });

      if (response.status !== StatusCodes.NO_CONTENT) {
        const message =
          response.data.error?.message ?? 'エピソードの削除に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
      });
      toast.success({ title: 'エピソードを削除しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'エピソードの削除に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エピソードを公開する
   *
   * @returns 公開が成功したかどうか
   */
  async function publishEpisode(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await publishMutation.mutateAsync({
        channelId,
        episodeId,
        data: {},
      });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? 'エピソードの公開に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
          channelId,
          episodeId,
        ),
      });
      toast.success({ title: 'エピソードを公開しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'エピソードの公開に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エピソードを非公開にする
   *
   * @returns 非公開が成功したかどうか
   */
  async function unpublishEpisode(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await unpublishMutation.mutateAsync({
        channelId,
        episodeId,
      });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? 'エピソードの非公開に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
          channelId,
          episodeId,
        ),
      });
      toast.success({ title: 'エピソードを非公開にしました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'エピソードの非公開に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    episode,
    isPublished,
    isMutating,
    isDeleting: deleteMutation.isPending,
    isPublishing: publishMutation.isPending,
    isUnpublishing: unpublishMutation.isPending,
    error,

    deleteEpisode,
    publishEpisode,
    unpublishEpisode,
    clearError,
  };
}
