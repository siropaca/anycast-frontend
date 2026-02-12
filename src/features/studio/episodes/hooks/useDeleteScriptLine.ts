import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';
import {
  type getChannelsChannelIdEpisodesEpisodeIdScriptLinesResponse200,
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId,
} from '@/libs/api/generated/script/script';

type ScriptLinesCache =
  getChannelsChannelIdEpisodesEpisodeIdScriptLinesResponse200;

/**
 * 台本行の削除ミューテーションを提供する（楽観的更新）
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

  const queryKey = getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
    channelId,
    episodeId,
  );

  /**
   * 台本行を楽観的に削除する
   *
   * @param lineId - 削除する行の ID
   */
  function deleteLine(lineId: string) {
    setError(undefined);

    // 楽観的更新: キャッシュから行を即座に除去
    const previousData = queryClient.getQueryData<ScriptLinesCache>(queryKey);

    if (previousData) {
      queryClient.setQueryData<ScriptLinesCache>(queryKey, {
        ...previousData,
        data: {
          ...previousData.data,
          data: previousData.data.data.filter(
            (line: ResponseScriptLineResponse) => line.id !== lineId,
          ),
        },
      });
    }

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
            // エラー時はキャッシュを復元
            if (previousData) {
              queryClient.setQueryData<ScriptLinesCache>(
                queryKey,
                previousData,
              );
            }
            return;
          }

          queryClient.invalidateQueries({ queryKey });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : '台本行の削除に失敗しました';
          setError(message);
          // エラー時はキャッシュを復元
          if (previousData) {
            queryClient.setQueryData<ScriptLinesCache>(queryKey, previousData);
          }
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
