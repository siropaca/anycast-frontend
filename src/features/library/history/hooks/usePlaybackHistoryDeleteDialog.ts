import { useState } from 'react';
import { useDeletePlaybackHistory } from '@/features/library/history/hooks/useDeletePlaybackHistory';

/**
 * 再生履歴削除ダイアログの状態を管理するフック
 *
 * @returns ダイアログの状態と操作関数
 */
export function usePlaybackHistoryDeleteDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { deletePlaybackHistory, isDeleting, error, clearError } =
    useDeletePlaybackHistory();

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
    const success = await deletePlaybackHistory();
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
