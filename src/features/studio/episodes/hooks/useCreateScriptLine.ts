import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { RequestCreateScriptLineRequest } from '@/libs/api/generated/schemas';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptLines,
} from '@/libs/api/generated/script/script';
import { trimFullWidth } from '@/utils/trim';

/**
 * 台本行の作成ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 作成関数、作成中フラグ、エラー
 */
export function useCreateScriptLine(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const mutation = usePostChannelsChannelIdEpisodesEpisodeIdScriptLines();

  const [error, setError] = useState<string>();

  /**
   * 台本行を作成する
   *
   * @param data - 作成する行のデータ
   */
  function createLine(data: RequestCreateScriptLineRequest) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          ...data,
          text: data.text ? trimFullWidth(data.text) : undefined,
          emotion: data.emotion ? trimFullWidth(data.emotion) : undefined,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
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
            err instanceof Error ? err.message : '台本行の作成に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isCreating: mutation.isPending,
    error,

    createLine,
  };
}
