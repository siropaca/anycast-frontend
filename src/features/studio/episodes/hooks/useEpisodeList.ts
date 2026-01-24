import { useGetMeChannelsChannelIdEpisodesSuspense } from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネルのエピソード一覧を取得する
 *
 * @param channelId - チャンネル ID
 * @returns エピソード一覧
 */
export function useEpisodeList(channelId: string) {
  const { data } = useGetMeChannelsChannelIdEpisodesSuspense(channelId);

  const episodes = unwrapResponse<ResponseEpisodeResponse[]>(data, []);

  return {
    episodes,
  };
}
