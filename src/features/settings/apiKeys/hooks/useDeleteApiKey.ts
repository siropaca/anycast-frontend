import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMeApiKeysQueryKey,
  useDeleteMeApiKeysApiKeyId,
} from '@/libs/api/generated/api-keys/api-keys';

/**
 * APIキー削除ミューテーションを提供する
 *
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeleteApiKey() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useDeleteMeApiKeysApiKeyId();

  const [error, setError] = useState<string>();

  /**
   * APIキーを削除する
   *
   * @param apiKeyId - 削除するAPIキーのID
   * @returns 削除が成功したかどうか
   */
  async function deleteApiKey(apiKeyId: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({ apiKeyId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        setError(response.data.error.message);
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeApiKeysQueryKey(),
      });
      toast.success({ title: 'APIキーを削除しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'APIキーの削除に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isDeleting: mutation.isPending,
    error,

    deleteApiKey,
    clearError,
  };
}
