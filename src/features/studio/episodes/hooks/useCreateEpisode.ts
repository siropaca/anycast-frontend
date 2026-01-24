import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { usePostChannelsChannelIdEpisodes } from '@/libs/api/generated/episodes/episodes';
import { getGetMeChannelsChannelIdEpisodesQueryKey } from '@/libs/api/generated/me/me';
import type { RequestCreateEpisodeRequest } from '@/libs/api/generated/schemas';
import { trimFullWidth } from '@/utils/trim';

interface CreateOptions {
  onSuccess?: (episodeId: string) => void;
}

/**
 * エピソード作成に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns 作成関数、作成中フラグ、エラー
 */
export function useCreateEpisode(channelId: string) {
  const queryClient = useQueryClient();
  const mutation = usePostChannelsChannelIdEpisodes();

  const [error, setError] = useState<string>();

  /**
   * エピソードを作成する
   *
   * @param data - エピソード作成リクエスト
   * @param options - オプション（成功時コールバック）
   */
  function createEpisode(
    data: RequestCreateEpisodeRequest,
    options?: CreateOptions,
  ) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        data: {
          ...data,
          title: trimFullWidth(data.title),
          description: trimFullWidth(data.description),
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError(
              response.data.error?.message ?? 'エピソードの作成に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
          });
          options?.onSuccess?.(response.data.data.id);
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'エピソードの作成に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isCreating: mutation.isPending,
    error,

    createEpisode,
  };
}
