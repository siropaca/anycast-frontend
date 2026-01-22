import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { usePostChannelsChannelIdEpisodesEpisodeIdAudioGenerate } from '@/libs/api/generated/episodes/episodes';
import { getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey } from '@/libs/api/generated/me/me';
import type { RequestGenerateAudioRequest } from '@/libs/api/generated/schemas';
import { trimFullWidth } from '@/utils/trimFullWidth';

/**
 * エピソード音声生成ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 音声生成関数、生成中フラグ、エラー
 */
export function useGenerateEpisodeAudio(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const mutation = usePostChannelsChannelIdEpisodesEpisodeIdAudioGenerate();

  /**
   * 音声を生成する
   *
   * @param data - 音声生成リクエスト
   */
  function generateAudio(data: RequestGenerateAudioRequest) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          ...data,
          voiceStyle: data.voiceStyle
            ? trimFullWidth(data.voiceStyle)
            : undefined,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
            return;
          }

          queryClient.refetchQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
        },
      },
    );
  }

  return {
    generateAudio,
    isGenerating: mutation.isPending,
    error,
  };
}
