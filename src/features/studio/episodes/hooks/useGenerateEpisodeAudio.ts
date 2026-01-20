import { useQueryClient } from '@tanstack/react-query';
import { usePostChannelsChannelIdEpisodesEpisodeIdAudioGenerate } from '@/libs/api/generated/episodes/episodes';
import { getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey } from '@/libs/api/generated/me/me';

/**
 * エピソード音声生成ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 音声生成ミューテーション
 */
export function useGenerateEpisodeAudio(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const generateAudioMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdAudioGenerate({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
        },
      },
    });

  return {
    generateAudioMutation,
  };
}
