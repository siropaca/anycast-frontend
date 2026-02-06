import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMePlaylistsQueryKey,
  useDeleteMePlaylistsPlaylistId,
} from '@/libs/api/generated/me/me';

/**
 * プレイリスト削除ミューテーションを提供する
 *
 * @returns 削除関数、削除中フラグ、エラー
 */
export function useDeletePlaylist() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = useDeleteMePlaylistsPlaylistId();

  const [error, setError] = useState<string>();

  /**
   * プレイリストを削除する
   *
   * @param playlistId - 削除するプレイリストのID
   * @returns 削除が成功したかどうか
   */
  async function deletePlaylist(playlistId: string): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({ playlistId });

      if (response.status !== StatusCodes.NO_CONTENT) {
        const message =
          response.data.error?.message ?? '再生リストの削除に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMePlaylistsQueryKey(),
      });
      toast.success({ title: '再生リストを削除しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : '再生リストの削除に失敗しました';
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

    deletePlaylist,
    clearError,
  };
}
