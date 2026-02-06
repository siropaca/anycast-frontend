import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import {
  getGetMePlaylistsPlaylistIdQueryKey,
  getGetMePlaylistsQueryKey,
  usePatchMePlaylistsPlaylistId,
} from '@/libs/api/generated/me/me';

/**
 * プレイリスト更新ミューテーションを提供する
 *
 * @returns 更新関数、更新中フラグ、エラー
 */
export function useUpdatePlaylist() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const mutation = usePatchMePlaylistsPlaylistId();

  const [error, setError] = useState<string>();

  /**
   * プレイリスト名を更新する
   *
   * @param playlistId - 更新するプレイリストのID
   * @param name - 新しいプレイリスト名
   * @returns 更新が成功したかどうか
   */
  async function updatePlaylist(
    playlistId: string,
    name: string,
  ): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({
        playlistId,
        data: { name },
      });

      if (response.status !== StatusCodes.OK) {
        const message =
          response.data.error?.message ?? '再生リストの更新に失敗しました';
        setError(message);
        toast.error({ title: message });
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMePlaylistsPlaylistIdQueryKey(playlistId),
      });
      queryClient.invalidateQueries({
        queryKey: getGetMePlaylistsQueryKey(),
      });
      toast.success({ title: '再生リストを更新しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : '再生リストの更新に失敗しました';
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
    isUpdating: mutation.isPending,
    error,

    updatePlaylist,
    clearError,
  };
}
