import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { usePatchChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import { useGetMeChannelsChannelIdEpisodesSuspense } from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソード編集に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、フォームデータ、更新ミューテーション
 */
export function useEditEpisode(channelId: string, episodeId: string) {
  const { data: episodesData } =
    useGetMeChannelsChannelIdEpisodesSuspense(channelId);
  const updateMutation = usePatchChannelsChannelIdEpisodesEpisodeId();

  const episodes = unwrapResponse<ResponseEpisodeResponse[]>(episodesData, []);
  const episode = episodes.find((e) => e.id === episodeId) ?? null;

  const defaultValues: EpisodeFormInput | null = episode
    ? {
        title: episode.title,
        description: episode.description ?? '',
      }
    : null;

  return {
    episode,
    defaultValues,
    updateMutation,
  };
}
