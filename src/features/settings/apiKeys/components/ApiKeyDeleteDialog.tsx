'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

interface Props {
  apiKeyName?: string;
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function ApiKeyDeleteDialog({
  apiKeyName,
  open,
  error,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title="APIキーを削除"
      description={
        <>
          「{apiKeyName}」を削除しますか？
          <br />
          このキーを使用しているアプリケーションはアクセスできなくなります。
          <br />
          この操作は取り消せません。
        </>
      }
      error={error}
      confirmLabel="削除"
      confirmColor="danger"
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
