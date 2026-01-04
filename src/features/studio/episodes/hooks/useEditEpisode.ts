import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { usePatchChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import { useGetMeChannelsChannelIdEpisodesSuspense } from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * ISO 8601 形式を datetime-local 用の形式に変換する
 *
 * @param isoString - ISO 8601 形式の日時文字列
 * @returns datetime-local 用の形式（YYYY-MM-DDTHH:mm）
 *
 * @example
 * toDateTimeLocal('2024-01-01T12:00:00Z') // => '2024-01-01T12:00'
 */
function toDateTimeLocal(isoString: string | undefined): string {
  if (!isoString) return '';
  // ISO 8601 から datetime-local 形式（YYYY-MM-DDTHH:mm）に変換
  return isoString.slice(0, 16);
}

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
        publishedAt: toDateTimeLocal(episode.publishedAt),
      }
    : null;

  return {
    episode,
    defaultValues,
    updateMutation,
  };
}
