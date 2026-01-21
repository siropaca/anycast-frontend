import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import type { RequestGenerateScriptRequest } from '@/libs/api/generated/schemas';
import {
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerate,
} from '@/libs/api/generated/script/script';

/**
 * 台本生成フォーム用のミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本生成関数、生成中フラグ、エラー
 */
export function useGenerateScriptForm(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const mutation = usePostChannelsChannelIdEpisodesEpisodeIdScriptGenerate();

  /**
   * 台本を生成する
   *
   * @param data - 台本生成リクエスト
   */
  function generateScript(data: RequestGenerateScriptRequest) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        data,
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
      },
    );
  }

  return {
    generateScript,
    isGenerating: mutation.isPending,
    error,
  };
}
