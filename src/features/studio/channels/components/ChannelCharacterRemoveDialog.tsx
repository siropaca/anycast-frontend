'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

interface Props {
  characterName?: string;
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function ChannelCharacterRemoveDialog({
  characterName,
  open,
  error,
  onClose,
  onConfirm,
}: Props) {
  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title="キャラクターを外す"
      description={
        <>
          チャンネルから「{characterName}」を外しますか？
          <br />
          キャラクター自体は削除されません。
        </>
      }
      error={error}
      confirmLabel="外す"
      confirmColor="danger"
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
