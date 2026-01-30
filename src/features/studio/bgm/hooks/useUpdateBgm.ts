import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import {
  getGetMeBgmsQueryKey,
  usePatchMeBgmsBgmId,
} from '@/libs/api/generated/me/me';

/**
 * BGM更新ミューテーションを提供する
 *
 * @returns 更新関数、更新中フラグ、エラー
 */
export function useUpdateBgm() {
  const queryClient = useQueryClient();
  const mutation = usePatchMeBgmsBgmId();

  const [error, setError] = useState<string>();

  /**
   * BGM名を更新する
   *
   * @param bgmId - 更新するBGMのID
   * @param name - 新しいBGM名
   * @returns 更新が成功したかどうか
   */
  async function updateBgm(bgmId: string, name: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({
        bgmId,
        data: { name },
      });

      if (response.status !== StatusCodes.OK) {
        setError(response.data.error.message);
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeBgmsQueryKey(),
      });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'BGMの更新に失敗しました';
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
    isUpdating: mutation.isPending,
    error,

    updateBgm,
    clearError,
  };
}
