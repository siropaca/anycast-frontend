import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
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

/**
 * チャンネル詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、各種操作関数
 */
export function useChannelDetail(channelId: string) {
  const queryClient = useQueryClient();
  const toast = useToast();
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
   * @returns 削除が成功したかどうか
   */
  async function deleteChannel(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await deleteMutation.mutateAsync({ channelId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        const message =
          response.data.error?.message ?? 'チャンネルの削除に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsQueryKey(),
      });
      toast.success({ title: 'チャンネルを削除しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'チャンネルの削除に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * チャンネルを公開する
   *
   * @returns 公開が成功したかどうか
   */
  async function publishChannel(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await publishMutation.mutateAsync({
        channelId,
        data: {},
      });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? 'チャンネルの公開に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
      });
      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsQueryKey(),
      });
      toast.success({ title: 'チャンネルを公開しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'チャンネルの公開に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * チャンネルを非公開にする
   *
   * @returns 非公開が成功したかどうか
   */
  async function unpublishChannel(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await unpublishMutation.mutateAsync({ channelId });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? 'チャンネルの非公開に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
      });
      queryClient.invalidateQueries({
        queryKey: getGetMeChannelsQueryKey(),
      });
      toast.success({ title: 'チャンネルを非公開にしました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'チャンネルの非公開に失敗しました';
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
    clearError,
  };
}
