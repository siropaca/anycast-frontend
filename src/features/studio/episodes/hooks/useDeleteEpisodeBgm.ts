import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useDeleteChannelsChannelIdEpisodesEpisodeIdBgm } from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeBgmsQueryKey,
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
} from '@/libs/api/generated/me/me';

/**
 * エピソードのBGM削除ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns BGM削除関数、削除中フラグ、エラー
 */
export function useDeleteEpisodeBgm(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const mutation = useDeleteChannelsChannelIdEpisodesEpisodeIdBgm();

  const [error, setError] = useState<string>();

  /**
   * エピソードからBGMを削除する
   */
  function deleteBgm() {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
          queryClient.invalidateQueries({
            queryKey: getGetMeBgmsQueryKey(),
          });
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
    isDeletingBgm: mutation.isPending,
    error,

    deleteBgm,
  };
}
