import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { ApiError } from '@/libs/api/ApiError';
import { usePutChannelsChannelIdEpisodesEpisodeIdAudio } from '@/libs/api/generated/episodes/episodes';
import { getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey } from '@/libs/api/generated/me/me';

interface UploadFileOptions {
  onSuccess?: () => void;
}

/**
 * エピソードに音声ファイルをアップロードする
 *
 * @param channelId - チャンネル ID
 * @param episodeId - エピソード ID
 * @returns ファイルアップロード関数、ローディング状態、エラー
 */
export function useUploadEpisodeAudio(channelId: string, episodeId: string) {
  const queryClient = useQueryClient();

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const uploadMutation = usePutChannelsChannelIdEpisodesEpisodeIdAudio({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetMeChannelsChannelIdEpisodesEpisodeIdQueryKey(
            channelId,
            episodeId,
          ),
        });
      },
    },
  });

  /**
   * 音声ファイルをアップロードする
   *
   * @param file - アップロードするファイル
   * @param options - オプション
   */
  async function uploadFile(
    file: File,
    options?: UploadFileOptions,
  ): Promise<void> {
    setIsUploading(true);
    setError(undefined);

    try {
      const response = await uploadMutation.mutateAsync({
        channelId,
        episodeId,
        data: { file },
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ??
            '音声のアップロードに失敗しました',
        );
        return;
      }

      options?.onSuccess?.();
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
      } else {
        setError('音声のアップロードに失敗しました');
      }
    } finally {
      setIsUploading(false);
    }
  }

  /**
   * エラーをクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isUploading,
    error,

    uploadFile,
    clearError,
  };
}
