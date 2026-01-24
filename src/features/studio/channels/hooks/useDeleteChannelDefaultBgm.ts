import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useDeleteChannelsChannelIdDefaultBgm } from '@/libs/api/generated/channels/channels';
import {
  getGetMeBgmsQueryKey,
  getGetMeChannelsChannelIdQueryKey,
} from '@/libs/api/generated/me/me';

/**
 * チャンネルのデフォルトBGM削除ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @returns BGM削除関数、削除中フラグ、エラー
 */
export function useDeleteChannelDefaultBgm(channelId: string) {
  const queryClient = useQueryClient();
  const mutation = useDeleteChannelsChannelIdDefaultBgm();

  const [error, setError] = useState<string>();

  /**
   * チャンネルからデフォルトBGMを削除する
   *
   * @param onSuccess - 成功時コールバック
   */
  function deleteDefaultBgm(onSuccess?: () => void) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error?.message ?? 'BGMの削除に失敗しました');
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
          });
          queryClient.invalidateQueries({
            queryKey: getGetMeBgmsQueryKey(),
          });
          onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'BGMの削除に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isDeletingDefaultBgm: mutation.isPending,
    error,

    deleteDefaultBgm,
  };
}
