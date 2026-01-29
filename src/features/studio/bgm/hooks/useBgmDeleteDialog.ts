import { useState } from 'react';
import { useDeleteBgm } from '@/features/studio/bgm/hooks/useDeleteBgm';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';

/**
 * BGM削除ダイアログの状態を管理するフック
 *
 * @returns ダイアログの状態と操作関数
 */
export function useBgmDeleteDialog() {
  const [deleteTarget, setDeleteTarget] =
    useState<ResponseBgmWithEpisodesResponse | null>(null);
  const { deleteBgm, isDeleting } = useDeleteBgm();

  const isOpen = deleteTarget !== null;

  function open(bgm: ResponseBgmWithEpisodesResponse) {
    setDeleteTarget(bgm);
  }

  function close() {
    setDeleteTarget(null);
  }

  function confirm() {
    if (!deleteTarget) return;
    deleteBgm(deleteTarget.id);
    setDeleteTarget(null);
  }

  return {
    isOpen,
    deleteTarget,
    isDeleting,
    open,
    close,
    confirm,
  };
}
