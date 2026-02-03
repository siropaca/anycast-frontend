'use client';

import { useGetChannelsChannelIdEpisodesEpisodeIdSuspense } from '@/libs/api/generated/episodes/episodes';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソードを取得する
 *
 * @param channelId - チャンネルの slug
 * @param episodeId - エピソードの ID
 * @returns エピソード情報
 */
export function useEpisode(channelId: string, episodeId: string) {
  const { data } = useGetChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );

  const episode = unwrapResponse<ResponseEpisodeResponse>(data);

  return {
    episode,
  };
}
