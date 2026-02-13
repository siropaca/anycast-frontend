import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { usePostImagesGenerate } from '@/libs/api/generated/images/images';

interface GenerateResult {
  id: string;
  url: string;
}

/**
 * AI によるアートワーク画像生成ミューテーションを提供する
 *
 * @returns 生成関数、生成中フラグ、エラー
 */
export function useGenerateArtwork() {
  const generateMutation = usePostImagesGenerate();

  const [error, setError] = useState<string>();

  /**
   * AI でアートワーク画像を生成する
   *
   * @param prompt - 画像生成に使用するプロンプト
   * @param onSuccess - 生成成功時のコールバック
   */
  function generateArtwork(
    prompt: string,
    onSuccess?: (result: GenerateResult) => void,
  ) {
    setError(undefined);

    generateMutation.mutate(
      { data: { prompt } },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError('画像の生成に失敗しました');
            return;
          }

          const { id, url } = response.data.data;
          onSuccess?.({ id, url });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : '画像の生成に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isGenerating: generateMutation.isPending,
    error,

    generateArtwork,
  };
}
