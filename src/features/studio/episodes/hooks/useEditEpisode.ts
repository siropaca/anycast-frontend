import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { usePatchChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
  getGetMeChannelsChannelIdEpisodesQueryKey,
  useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense,
} from '@/libs/api/generated/me/me';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { toOptionalField } from '@/libs/api/optionalField';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { trimFullWidth } from '@/utils/trim';

interface UpdateOptions {
  onSuccess?: () => void;
}

/**
 * エピソード編集に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns エピソードデータ、フォームデータ、更新関数
 */
export function useEditEpisode(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const { data: response } = useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense(
    channelId,
    episodeId,
  );
  const mutation = usePatchChannelsChannelIdEpisodesEpisodeId();

  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  const [error, setError] = useState<string>();

  const defaultValues: EpisodeFormInput = {
    title: episode.title,
    description: episode.description ?? '',
    artworkImageId: episode.artwork?.id,
  };

  /**
   * エピソードを更新する
   *
   * @param data - フォーム入力データ
   * @param options - オプション（成功時コールバック）
   */
  function updateEpisode(data: EpisodeFormInput, options?: UpdateOptions) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          title: trimFullWidth(data.title),
          description: trimFullWidth(data.description),
          artworkImageId: toOptionalField(data.artworkImageId),
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ?? 'エピソードの更新に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesQueryKey(channelId),
          });
          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'エピソードの更新に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    episode,
    defaultValues,
    defaultArtworkUrl: episode.artwork?.url,
    isUpdating: mutation.isPending,
    error,

    updateEpisode,
  };
}
