import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';
import { useGetChannelsChannelIdEpisodesEpisodeIdScriptLinesSuspense } from '@/libs/api/generated/script/script';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * エピソードの台本行一覧を取得する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns 台本行一覧
 */
export function useScriptLines(channelId: string, episodeId: string) {
  const { data: response } =
    useGetChannelsChannelIdEpisodesEpisodeIdScriptLinesSuspense(
      channelId,
      episodeId,
    );

  const scriptLines = unwrapResponse<ResponseScriptLineResponse[]>(response);

  return {
    scriptLines,
  };
}
