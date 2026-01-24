import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useDeleteChannelsChannelId } from '@/libs/api/generated/channels/channels';
import { getGetMeChannelsQueryKey } from '@/libs/api/generated/me/me';

interface DeleteOptions {
  onSuccess?: () => void;
}

/**
 * チャンネル削除のミューテーションを提供する
 *
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeleteChannel() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const mutation = useDeleteChannelsChannelId();

  /**
   * チャンネルを削除する
   *
   * @param channelId - 削除するチャンネルの ID
   * @param options - オプション（成功時コールバック）
   */
  function deleteChannel(channelId: string, options?: DeleteOptions) {
    setError(undefined);

    mutation.mutate(
      { channelId },
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
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'チャンネルの削除に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    deleteChannel,
    isDeleting: mutation.isPending,
    error,
  };
}
