import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type {
  RequestCreateScriptLineRequest,
  ResponseScriptLineResponse,
} from '@/libs/api/generated/schemas';
import {
  type getChannelsChannelIdEpisodesEpisodeIdScriptLinesResponse200,
  getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey,
  usePostChannelsChannelIdEpisodesEpisodeIdScriptLines,
} from '@/libs/api/generated/script/script';
import { trimFullWidth } from '@/utils/trim';

type ScriptLinesCache =
  getChannelsChannelIdEpisodesEpisodeIdScriptLinesResponse200;

/**
 * 台本行の作成ミューテーションを提供する（楽観的更新）
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 作成関数、作成中フラグ、エラー
 */
export function useCreateScriptLine(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const mutation = usePostChannelsChannelIdEpisodesEpisodeIdScriptLines();

  const [error, setError] = useState<string>();

  const queryKey = getGetChannelsChannelIdEpisodesEpisodeIdScriptLinesQueryKey(
    channelId,
    episodeId,
  );

  /**
   * 台本行を楽観的に作成する
   *
   * @param data - 作成する行のデータ
   */
  function createLine(data: RequestCreateScriptLineRequest) {
    setError(undefined);

    // 楽観的更新: 仮行をキャッシュに即座に挿入
    const previousData = queryClient.getQueryData<ScriptLinesCache>(queryKey);

    if (previousData && data.speakerId) {
      const lines = previousData.data.data;
      const existingSpeaker = lines.find(
        (l: ResponseScriptLineResponse) => l.speaker.id === data.speakerId,
      )?.speaker;

      if (existingSpeaker) {
        const now = new Date().toISOString();
        const tempLine: ResponseScriptLineResponse = {
          id: `temp-${Date.now()}`,
          text: data.text ?? '',
          emotion: data.emotion,
          speaker: existingSpeaker,
          lineOrder: 0,
          createdAt: now,
          updatedAt: now,
        };

        const afterIndex = data.afterLineId
          ? lines.findIndex(
              (l: ResponseScriptLineResponse) => l.id === data.afterLineId,
            )
          : -1;
        const insertIndex = afterIndex >= 0 ? afterIndex + 1 : lines.length;
        const newLines = [...lines];
        newLines.splice(insertIndex, 0, tempLine);

        queryClient.setQueryData<ScriptLinesCache>(queryKey, {
          ...previousData,
          data: {
            ...previousData.data,
            data: newLines,
          },
        });
      }
    }

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
            err instanceof Error ? err.message : '台本行の作成に失敗しました';
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
    isCreating: mutation.isPending,
    error,

    createLine,
  };
}
