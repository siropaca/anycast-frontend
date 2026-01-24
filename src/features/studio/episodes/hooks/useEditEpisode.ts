import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { usePatchChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import { useGetMeChannelsChannelIdEpisodesEpisodeIdSuspense } from '@/libs/api/generated/me/me';
import type {
  RequestUpdateEpisodeRequest,
  ResponseEpisodeResponse,
} from '@/libs/api/generated/schemas';
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
   * @param data - エピソード更新リクエスト
   * @param options - オプション（成功時コールバック）
   */
  function updateEpisode(
    data: RequestUpdateEpisodeRequest,
    options?: UpdateOptions,
  ) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        episodeId,
        data: {
          ...data,
          title: trimFullWidth(data.title),
          description: trimFullWidth(data.description),
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ?? MESSAGES.episode.updateError,
            );
            return;
          }

          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : MESSAGES.episode.updateError;
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
