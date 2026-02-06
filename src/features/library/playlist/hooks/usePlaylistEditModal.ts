import { useState } from 'react';
import { useUpdatePlaylist } from '@/features/library/playlist/hooks/useUpdatePlaylist';
import { confirmDiscard } from '@/utils/confirmDiscard';

interface Params {
  playlistId: string;
  currentName: string;
}

/**
 * プレイリスト編集モーダルの状態を管理するフック
 *
 * @param params - プレイリストIDと現在の名前
 * @returns モーダルの状態と操作関数
 */
export function usePlaylistEditModal({ playlistId, currentName }: Params) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const { updatePlaylist, isUpdating, error, clearError } = useUpdatePlaylist();

  const isDirty = name !== currentName;

  /**
   * モーダルを開く
   */
  function open() {
    clearError();
    setName(currentName);
    setIsOpen(true);
  }

  /**
   * モーダルを閉じる（変更がある場合は破棄確認）
   */
  function close() {
    if (!confirmDiscard(isDirty)) return;
    setIsOpen(false);
    setName('');
  }

  /**
   * プレイリスト名の更新を送信する
   */
  async function submit() {
    const success = await updatePlaylist(playlistId, name);
    if (success) {
      setIsOpen(false);
      setName('');
    }
  }

  return {
    isOpen,
    name,
    setName,
    isDirty,
    isUpdating,
    error,

    open,
    close,
    submit,
  };
}
