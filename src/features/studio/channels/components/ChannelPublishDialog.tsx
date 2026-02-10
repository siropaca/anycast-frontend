'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

type Action = 'publish' | 'unpublish';

interface Props {
  channelName: string;
  action: Action;
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function ChannelPublishDialog({
  channelName,
  action,
  open,
  error,
  onClose,
  onConfirm,
}: Props) {
  const isPublish = action === 'publish';

  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title={isPublish ? 'チャンネルを公開' : 'チャンネルを非公開にする'}
      description={
        isPublish
          ? `「${channelName}」を公開しますか？`
          : `「${channelName}」を非公開にしますか？`
      }
      error={error}
      confirmLabel={isPublish ? '公開' : '非公開にする'}
      confirmColor={isPublish ? 'primary' : 'danger'}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
