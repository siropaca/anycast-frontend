import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { usePostImages } from '@/libs/api/generated/images/images';

interface UploadResult {
  id: string;
  url: string;
}

/**
 * アートワーク画像アップロードミューテーションを提供する
 *
 * @returns アップロード関数、アップロード中フラグ、エラー
 */
export function useUploadArtwork() {
  const uploadMutation = usePostImages();

  const [error, setError] = useState<string>();

  /**
   * アートワーク画像をアップロードする
   *
   * @param file - アップロードする画像ファイル
   * @param onSuccess - アップロード成功時のコールバック
   */
  function uploadArtwork(
    file: File,
    onSuccess?: (result: UploadResult) => void,
  ) {
    setError(undefined);

    uploadMutation.mutate(
      { data: { file } },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError('画像のアップロードに失敗しました');
            return;
          }

          const { id, url } = response.data.data;
          onSuccess?.({ id, url });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : '画像のアップロードに失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isUploading: uploadMutation.isPending,
    error,

    uploadArtwork,
  };
}
