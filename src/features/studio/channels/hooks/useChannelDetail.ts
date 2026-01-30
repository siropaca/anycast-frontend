import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import {
  useDeleteChannelsChannelId,
  usePostChannelsChannelIdPublish,
  usePostChannelsChannelIdUnpublish,
} from '@/libs/api/generated/channels/channels';
import {
  getGetMeChannelsChannelIdQueryKey,
  getGetMeChannelsQueryKey,
  useGetMeChannelsChannelIdSuspense,
} from '@/libs/api/generated/me/me';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface DeleteOptions {
  onSuccess?: () => void;
}

/**
 * チャンネル詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、各種操作関数
 */
export function useChannelDetail(channelId: string) {
  const queryClient = useQueryClient();
  const { data: response } = useGetMeChannelsChannelIdSuspense(channelId);
  const deleteMutation = useDeleteChannelsChannelId();
  const publishMutation = usePostChannelsChannelIdPublish();
  const unpublishMutation = usePostChannelsChannelIdUnpublish();

  const [error, setError] = useState<string>();

  const channel = unwrapResponse<ResponseChannelResponse>(response);

  const isPublished = !!channel.publishedAt;
  const isMutating =
    deleteMutation.isPending ||
    publishMutation.isPending ||
    unpublishMutation.isPending;

  /**
   * チャンネルを削除する
   *
   * @param options - オプション（成功時コールバック）
   */
  function deleteChannel(options?: DeleteOptions) {
    setError(undefined);

    deleteMutation.mutate(
      {
        channelId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(
              response.data.error?.message ?? 'チャンネルの削除に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsQueryKey(),
          });
          options?.onSuccess?.();
        },
      },
    );
  }

  /**
   * チャンネルを公開する
   */
  function publishChannel() {
    setError(undefined);

    publishMutation.mutate(
      {
        channelId,
        data: {},
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ?? 'チャンネルの公開に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
          });
        },
      },
    );
  }

  /**
   * チャンネルを非公開にする
   */
  function unpublishChannel() {
    setError(undefined);

    unpublishMutation.mutate(
      {
        channelId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                'チャンネルの非公開に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
          });
        },
      },
    );
  }

  return {
    channel,
    isPublished,
    isMutating,
    isDeleting: deleteMutation.isPending,
    isPublishing: publishMutation.isPending,
    isUnpublishing: unpublishMutation.isPending,
    error,

    deleteChannel,
    publishChannel,
    unpublishChannel,
  };
}
