'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

type Action = 'publish' | 'unpublish';

interface Props {
  episodeName: string;
  action: Action;
  open: boolean;
  error?: string;

  onClose: () => void;
  onConfirm: () => void;
}

export function EpisodePublishDialog({
  episodeName,
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
      title={isPublish ? 'エピソードを公開' : 'エピソードを非公開にする'}
      description={
        isPublish
          ? `「${episodeName}」を公開しますか？`
          : `「${episodeName}」を非公開にしますか？`
      }
      error={error}
      confirmLabel={isPublish ? '公開' : '非公開にする'}
      confirmColor={isPublish ? 'primary' : 'danger'}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
