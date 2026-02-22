import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMeApiKeysQueryKey,
  usePostMeApiKeys,
} from '@/libs/api/generated/api-keys/api-keys';
import type { ResponseAPIKeyCreatedResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * APIキー作成ミューテーションを提供する
 *
 * @returns 作成関数、作成中フラグ、エラー
 */
export function useCreateApiKey() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = usePostMeApiKeys();

  const [error, setError] = useState<string>();

  /**
   * 新しいAPIキーを作成する
   *
   * @param name - キー名
   * @returns 作成されたAPIキー（平文キーを含む）、失敗時は null
   */
  async function createApiKey(
    name: string,
  ): Promise<ResponseAPIKeyCreatedResponse | null> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({
        data: { name },
      });

      if (response.status !== StatusCodes.CREATED) {
        const message =
          response.data.error?.message ?? 'APIキーの作成に失敗しました';
        setError(message);
        toast.error({ title: message });
        return null;
      }

      const apiKey = unwrapResponse<ResponseAPIKeyCreatedResponse>(response);

      await queryClient.invalidateQueries({
        queryKey: getGetMeApiKeysQueryKey(),
      });

      toast.success({ title: 'APIキーを作成しました' });
      return apiKey;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'APIキーの作成に失敗しました';
      setError(message);
      toast.error({ title: message });
      return null;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isCreating: mutation.isPending,
    error,

    createApiKey,
    clearError,
  };
}
