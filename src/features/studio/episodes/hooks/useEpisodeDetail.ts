import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
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

interface DeleteOptions {
  onSuccess?: () => void;
}

/**
 * エピソード詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、各種操作関数
 */
export function useEpisodeDetail(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const { data: response } = useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );
  const deleteMutation = useDeleteChannelsChannelIdEpisodesEpisodeId();
  const publishMutation = usePostChannelsChannelIdEpisodesEpisodeIdPublish();
  const unpublishMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdUnpublish();

  const [error, setError] = useState<string>();

  /**
   * エピソードを削除する
   *
   * @param options - オプション（成功時コールバック）
   */
  function deleteEpisode(options?: DeleteOptions) {
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

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
          });
          options?.onSuccess?.();
        },
      },
    );
  }

  /**
   * エピソードを公開する
   */
  function publishEpisode() {
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
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
        },
      },
    );
  }

  /**
   * エピソードを非公開にする
   */
  function unpublishEpisode() {
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
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
        },
      },
    );
  }

  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  const isPublished = !!episode.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

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
  };
}
