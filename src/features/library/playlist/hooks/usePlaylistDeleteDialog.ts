import { useState } from 'react';
import { useDeletePlaylist } from '@/features/library/playlist/hooks/useDeletePlaylist';

/**
 * プレイリスト削除ダイアログの状態を管理するフック
 *
 * @param playlistId - プレイリスト ID
 * @returns ダイアログの状態と操作関数
 */
export function usePlaylistDeleteDialog(playlistId: string) {
  const [isOpen, setIsOpen] = useState(false);
  const { deletePlaylist, isDeleting, error, clearError } = useDeletePlaylist();

  /**
   * ダイアログを開く
   */
  function open() {
    clearError();
    setIsOpen(true);
  }

  /**
   * ダイアログを閉じる
   */
  function close() {
    setIsOpen(false);
  }

  /**
   * 削除を実行する
   *
   * @returns 削除が成功したかどうか
   */
  async function confirm(): Promise<boolean> {
    const success = await deletePlaylist(playlistId);
    if (success) {
      setIsOpen(false);
    }
    return success;
  }

  return {
    isOpen,
    isDeleting,
    error,

    open,
    close,
    confirm,
  };
}
