import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import {
  getGetMeBgmsQueryKey,
  useDeleteMeBgmsBgmId,
} from '@/libs/api/generated/me/me';

/**
 * BGM削除ミューテーションを提供する
 *
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeleteBgm() {
  const queryClient = useQueryClient();
  const mutation = useDeleteMeBgmsBgmId();

  const [error, setError] = useState<string>();

  /**
   * BGMを削除する
   *
   * @param bgmId - 削除するBGMのID
   * @returns 削除が成功したかどうか
   */
  async function deleteBgm(bgmId: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({ bgmId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        setError(response.data.error.message);
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeBgmsQueryKey(),
      });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'BGMの削除に失敗しました';
      setError(message);
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

    deleteBgm,
    clearError,
  };
}
