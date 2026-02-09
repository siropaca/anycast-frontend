import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMePlaybackHistoryQueryKey,
  useDeleteMePlaybackHistory,
} from '@/libs/api/generated/me/me';

/**
 * 再生履歴削除ミューテーションを提供する
 *
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeletePlaybackHistory() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useDeleteMePlaybackHistory();

  const [error, setError] = useState<string>();

  /**
   * 再生履歴をすべて削除する
   *
   * @returns 削除が成功したかどうか
   */
  async function deletePlaybackHistory(): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync();

      if (response.status !== StatusCodes.NO_CONTENT) {
        const message =
          response.data.error?.message ?? '再生履歴の削除に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMePlaybackHistoryQueryKey(),
      });
      toast.success({ title: '再生履歴を削除しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : '再生履歴の削除に失敗しました';
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

    deletePlaybackHistory,
    clearError,
  };
}
