import {
  useDeleteChannelsChannelIdEpisodesEpisodeId,
  usePostChannelsChannelIdEpisodesEpisodeIdPublish,
  usePostChannelsChannelIdEpisodesEpisodeIdUnpublish,
} from '@/libs/api/generated/episodes/episodes';
import { useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense } from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソード詳細に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、各種ミューテーション
 */
export function useEpisodeDetail(channelId: string, episodeId: string) {
  const { data: response } = useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );
  const deleteMutation = useDeleteChannelsChannelIdEpisodesEpisodeId();
  const publishMutation = usePostChannelsChannelIdEpisodesEpisodeIdPublish();
  const unpublishMutation =
    usePostChannelsChannelIdEpisodesEpisodeIdUnpublish();

  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  return {
    episode,
    deleteMutation,
    publishMutation,
    unpublishMutation,
  };
}
