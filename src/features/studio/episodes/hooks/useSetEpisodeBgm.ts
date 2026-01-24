import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { usePutChannelsChannelIdEpisodesEpisodeIdBgm } from '@/libs/api/generated/episodes/episodes';
import {
  getGetMeBgmsQueryKey,
  getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey,
} from '@/libs/api/generated/me/me';

/**
 * エピソードのBGM設定ミューテーションを提供する
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns BGM設定関数、設定中フラグ、エラー
 */
export function useSetEpisodeBgm(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();
  const mutation = usePutChannelsChannelIdEpisodesEpisodeIdBgm();

  const [error, setError] = useState<string>();

  /**
   * エピソードにBGMを設定する
   *
   * @param bgmId - 設定するBGMのID
   * @param isDefault - デフォルトBGMかどうか
   */
  function setBgm(bgmId: string, isDefault: boolean) {
    setError(undefined);

    const data = isDefault ? { defaultBgmId: bgmId } : { bgmId };

    mutation.mutate(
      {
        channelId,
        episodeId,
        data,
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
              channelId,
              episodeId,
            ),
          });
          queryClient.invalidateQueries({
            queryKey: getGetMeBgmsQueryKey(),
          });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'BGMの設定に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isSettingBgm: mutation.isPending,
    error,

    setBgm,
  };
}
