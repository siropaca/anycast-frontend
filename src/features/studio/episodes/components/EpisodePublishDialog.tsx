'use client';

import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

type Action = 'publish' | 'unpublish';

interface Props {
  episodeName: string;
  action: Action;
  open: boolean;
  error?: string;
  willPublishChannel?: boolean;

  onClose: () => void;
  onConfirm: () => void;
}

export function EpisodePublishDialog({
  episodeName,
  action,
  open,
  error,
  willPublishChannel = false,
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
        isPublish ? (
          <>
            {`「${episodeName}」を公開しますか？`}
            {willPublishChannel && (
              <span className="mt-1 block text-text-sub text-xs">
                チャンネルが未公開のため、チャンネルも同時に公開されます
              </span>
            )}
          </>
        ) : (
          `「${episodeName}」を非公開にしますか？`
        )
      }
      error={error}
      confirmLabel={isPublish ? '公開' : '非公開にする'}
      confirmColor={isPublish ? 'primary' : 'danger'}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
