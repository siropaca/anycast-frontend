import { useState } from 'react';
import { useCreateApiKey } from '@/features/settings/apiKeys/hooks/useCreateApiKey';
import type { ResponseAPIKeyCreatedResponse } from '@/libs/api/generated/schemas';

/**
 * APIキー作成モーダルの状態を管理するフック
 *
 * @returns モーダルの状態と操作関数
 */
export function useCreateApiKeyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [createdKey, setCreatedKey] =
    useState<ResponseAPIKeyCreatedResponse | null>(null);
  const { createApiKey, isCreating, error, clearError } = useCreateApiKey();

  /**
   * モーダルを開く
   */
  function open() {
    clearError();
    setIsOpen(true);
  }

  /**
   * モーダルを閉じる
   */
  function close() {
    setIsOpen(false);
  }

  /**
   * APIキーを作成し、成功時にモーダルを閉じて作成結果ダイアログを表示する
   *
   * @param name - キー名
   */
  async function submit(name: string) {
    const apiKey = await createApiKey(name);
    if (apiKey) {
      setIsOpen(false);
      setCreatedKey(apiKey);
    }
  }

  /**
   * 作成結果ダイアログを閉じる
   */
  function closeCreatedDialog() {
    setCreatedKey(null);
  }

  return {
    isOpen,
    isCreating,
    error,
    createdKey,

    open,
    close,
    submit,
    closeCreatedDialog,
  };
}
