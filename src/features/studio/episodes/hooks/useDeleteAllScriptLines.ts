import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import {
  type getChannelsChannelIdEpisodesEpisodeIdScriptLinesResponse200,
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLines,
} from '@/libs/api/generated/script/script';
import { getGetMeChannelsChannelIdEpisodesQueryKey } from '@/libs/api/generated/me/me';

type ScriptLinesCache =
  getChannelsChannelIdEpisodesEpisodeIdScriptLinesResponse200;

/**
 * 台本行の全削除ミューテーションを提供する（楽観的更新）
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 全削除関数、削除中フラグ、エラー
 */
export function useDeleteAllScriptLines(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const mutation = useDeleteChannelsChannelIdEpisodesEpisodeIdScriptLines();

  const [error, setError] = useState<string>();

  const queryKey = getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
    channelId,
    episodeId,
  );

  /**
   * 台本行をすべて楽観的に削除する
   */
  function deleteAllLines() {
    setError(undefined);

    // 楽観的更新: キャッシュから全行を即座に除去
    const previousData = queryClient.getQueryData<ScriptLinesCache>(queryKey);

    if (previousData) {
      queryClient.setQueryData<ScriptLinesCache>(queryKey, {
        ...previousData,
        data: {
          ...previousData.data,
          data: [],
        },
      });
    }

    mutation.mutate(
      {
        channelId,
        episodeId,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.NO_CONTENT) {
            setError('台本の全削除に失敗しました');
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
          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
          });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : '台本の全削除に失敗しました';
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

    deleteAllLines,
  };
}
