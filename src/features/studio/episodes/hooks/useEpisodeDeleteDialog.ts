import { useState } from 'react';

interface Params {
  isDeleting: boolean;
  error: string | undefined;

  deleteEpisode: () => Promise<boolean>;
  clearError: () => void;
}

/**
 * エピソード削除ダイアログの状態を管理するフック
 *
 * @param params - useEpisodeDetail から渡される削除関連の値
 * @returns ダイアログの状態と操作関数
 */
export function useEpisodeDeleteDialog({
  deleteEpisode,
  clearError,
  isDeleting,
  error,
}: Params) {
  const [isOpen, setIsOpen] = useState(false);

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
    const success = await deleteEpisode();
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
