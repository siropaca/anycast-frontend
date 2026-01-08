import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { usePatchChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import { useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense } from '@/libs/api/generated/me/me';
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
  const { data: response } = useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );
  const updateMutation = usePatchChannelsChannelIdEpisodesEpisodeId();

  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  const defaultValues: EpisodeFormInput = {
    title: episode.title,
    description: episode.description ?? '',
    artworkImageId: episode.artwork?.id,
  };

  return {
    episode,
    defaultValues,
    defaultArtworkUrl: episode.artwork?.url,
    updateMutation,
  };
}
