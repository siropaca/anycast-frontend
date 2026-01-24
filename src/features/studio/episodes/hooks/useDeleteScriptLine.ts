import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId,
} from '@/libs/api/generated/script/script';

/**
 * 台本行の削除ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeleteScriptLine(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const mutation =
    useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId();

  const [error, setError] = useState<string>();

  /**
   * 台本行を削除する
   *
   * @param lineId - 削除する行の ID
   */
  function deleteLine(lineId: string) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        lineId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError(response.data.error.message);
            return;
          }

          queryClient.invalidateQueries({
            queryKey:
              getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
                channelId,
                episodeId,
              ),
          });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : '台本行の削除に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isDeleting: mutation.isPending,
    error,

    deleteLine,
  };
}
