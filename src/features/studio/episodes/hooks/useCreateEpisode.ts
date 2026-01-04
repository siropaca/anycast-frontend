import { usePostChannelsChannelIdEpisodes } from '@/libs/api/generated/episodes/episodes';

/**
 * エピソード作成に必要なデータと操作を提供する
 *
 * @returns 作成ミューテーション
 */
export function useCreateEpisode() {
  const createMutation = usePostChannelsChannelIdEpisodes();

  return {
    createMutation,
  };
}
