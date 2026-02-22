import { useState } from 'react';
import { useDeleteApiKey } from '@/features/settings/apiKeys/hooks/useDeleteApiKey';
import type { ResponseAPIKeyResponse } from '@/libs/api/generated/schemas';

/**
 * APIキー削除ダイアログの状態を管理するフック
 *
 * @returns ダイアログの状態と操作関数
 */
export function useApiKeyDeleteDialog() {
  const [deleteTarget, setDeleteTarget] =
    useState<ResponseAPIKeyResponse | null>(null);
  const { deleteApiKey, isDeleting, error, clearError } = useDeleteApiKey();

  const isOpen = deleteTarget !== null;

  function open(apiKey: ResponseAPIKeyResponse) {
    clearError();
    setDeleteTarget(apiKey);
  }

  function close() {
    setDeleteTarget(null);
  }

  async function confirm() {
    if (!deleteTarget) return;
    const success = await deleteApiKey(deleteTarget.id);
    if (success) {
      setDeleteTarget(null);
    }
  }

  return {
    isOpen,
    deleteTarget,
    isDeleting,
    error,

    open,
    close,
    confirm,
  };
}
