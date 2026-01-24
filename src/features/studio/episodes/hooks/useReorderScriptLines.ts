import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptReorder,
} from '@/libs/api/generated/script/script';

/**
 * 台本行の並び替えミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 並び替え関数、並び替え中フラグ、エラー
 */
export function useReorderScriptLines(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const mutation = usePostChannelsChannelIdEpisodesEpisodeIdScriptReorder();

  /**
   * 台本行を並び替える
   *
   * @param lineIds - 並び替え後の行 ID の配列
   */
  function reorderLines(lineIds: string[]) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        data: { lineIds },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
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
            err instanceof Error ? err.message : '台本行の並び替えに失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    reorderLines,
    isReordering: mutation.isPending,
    error,
  };
}
