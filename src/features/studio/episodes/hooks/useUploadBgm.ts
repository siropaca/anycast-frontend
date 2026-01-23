import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { usePostAudios } from '@/libs/api/generated/audios/audios';
import {
  getGetMeBgmsQueryKey,
  usePostMeBgms,
} from '@/libs/api/generated/me/me';
import { removeFileExtension, trimFullWidth } from '@/utils/trim';

/**
 * BGMアップロードミューテーションを提供する
 *
 * 音声ファイルをアップロードし、BGMとして登録する。
 *
 * @returns アップロード関数、アップロード中フラグ、エラー
 */
export function useUploadBgm() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const uploadMutation = usePostAudios();
  const createBgmMutation = usePostMeBgms();

  const isUploading = uploadMutation.isPending || createBgmMutation.isPending;

  /**
   * BGMをアップロードする
   *
   * @param file - アップロードする音声ファイル
   * @param name - BGMの名前（空の場合はファイル名から拡張子を除いた名前を使用）
   */
  function uploadBgm(file: File, name: string) {
    setError(undefined);
    const bgmName = trimFullWidth(name) || removeFileExtension(file.name);

    uploadMutation.mutate(
      { data: { file } },
      {
        onSuccess: (uploadResponse) => {
          if (uploadResponse.status !== StatusCodes.CREATED) {
            setError(uploadResponse.data.error.message);
            return;
          }

          const audioId = uploadResponse.data.data.id;

          createBgmMutation.mutate(
            { data: { audioId, name: bgmName } },
            {
              onSuccess: (bgmResponse) => {
                if (bgmResponse.status !== StatusCodes.CREATED) {
                  setError(bgmResponse.data.error.message);
                  return;
                }

                queryClient.invalidateQueries({
                  queryKey: getGetMeBgmsQueryKey(),
                });
              },
            },
          );
        },
      },
    );
  }

  return {
    uploadBgm,
    isUploading,
    error,
  };
}
