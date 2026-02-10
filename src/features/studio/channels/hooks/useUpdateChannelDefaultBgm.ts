import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import {
  useDeleteChannelsChannelIdDefaultBgm,
  usePutChannelsChannelIdDefaultBgm,
} from '@/libs/api/generated/channels/channels';
import {
  getGetMeBgmsQueryKey,
  getGetMeChannelsChannelIdQueryKey,
} from '@/libs/api/generated/me/me';

interface UpdateOptions {
  onSuccess?: () => void;
}

/**
 * チャンネルのデフォルトBGMの設定・削除を提供する
 *
 * @param channelId - チャンネル ID
 * @returns 設定関数、削除関数、ローディング状態、エラー
 */
export function useUpdateChannelDefaultBgm(channelId: string) {
  const queryClient = useQueryClient();
  const setMutation = usePutChannelsChannelIdDefaultBgm();
  const deleteMutation = useDeleteChannelsChannelIdDefaultBgm();
  const [error, setError] = useState<string>();

  /**
   * クエリキャッシュを無効化する
   */
  function invalidate() {
    queryClient.invalidateQueries({
      queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
    });
    queryClient.invalidateQueries({
      queryKey: getGetMeBgmsQueryKey(),
    });
  }

  /**
   * デフォルトBGMを設定する
   *
   * @param bgmId - ユーザーBGM ID（systemBgmId と排他）
   * @param systemBgmId - システムBGM ID（bgmId と排他）
   * @param options - オプション（成功時コールバック）
   */
  function setDefaultBgm(
    bgmId: string | undefined,
    systemBgmId: string | undefined,
    options?: UpdateOptions,
  ) {
    setError(undefined);

    setMutation.mutate(
      {
        channelId,
        data: { bgmId, systemBgmId },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                'デフォルトBGMの設定に失敗しました',
            );
            return;
          }

          invalidate();
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'デフォルトBGMの設定に失敗しました';
          setError(message);
        },
      },
    );
  }

  /**
   * デフォルトBGMを解除する
   *
   * @param options - オプション（成功時コールバック）
   */
  function removeDefaultBgm(options?: UpdateOptions) {
    setError(undefined);

    deleteMutation.mutate(
      { channelId },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                'デフォルトBGMの解除に失敗しました',
            );
            return;
          }

          invalidate();
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'デフォルトBGMの解除に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isUpdating: setMutation.isPending || deleteMutation.isPending,
    error,

    setDefaultBgm,
    removeDefaultBgm,
  };
}
