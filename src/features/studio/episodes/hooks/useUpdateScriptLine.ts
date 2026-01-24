import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import type { RequestUpdateScriptLineRequest } from '@/libs/api/generated/schemas';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePatchChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId,
} from '@/libs/api/generated/script/script';
import { trimFullWidth } from '@/utils/trim';

/**
 * 台本行の更新ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 更新関数、更新中フラグ、エラー
 */
export function useUpdateScriptLine(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const mutation =
    usePatchChannelsChannelIdEpisodesEpisodeIdScriptLinesLineId();

  /**
   * 台本行を更新する
   *
   * @param lineId - 更新する行の ID
   * @param data - 更新データ
   */
  function updateLine(lineId: string, data: RequestUpdateScriptLineRequest) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        lineId,
        data: {
          ...data,
          text: data.text ? trimFullWidth(data.text) : undefined,
        },
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
            err instanceof Error ? err.message : '台本行の更新に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    updateLine,
    isUpdating: mutation.isPending,
    error,
  };
}
