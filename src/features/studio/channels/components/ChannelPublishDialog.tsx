'use client';

import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

type Action = 'publish' | 'unpublish';

interface Props {
  channelName: string;
  action: Action;
  open: boolean;
  error?: string;
  unpublishedEpisodeCount: number;
  includeEpisodes: boolean;

  onClose: () => void;
  onConfirm: () => void;
  onIncludeEpisodesChange: (checked: boolean) => void;
}

export function ChannelPublishDialog({
  channelName,
  action,
  open,
  error,
  unpublishedEpisodeCount,
  includeEpisodes,
  onClose,
  onConfirm,
  onIncludeEpisodesChange,
}: Props) {
  const isPublish = action === 'publish';
  const showEpisodeCheckbox = isPublish && unpublishedEpisodeCount > 0;

  return (
    <ConfirmDialog
      trigger={<span className="hidden" />}
      open={open}
      title={isPublish ? 'チャンネルを公開' : 'チャンネルを非公開にする'}
      description={
        <>
          {isPublish
            ? `「${channelName}」を公開しますか？`
            : `「${channelName}」を非公開にしますか？`}
          {showEpisodeCheckbox && (
            <Checkbox
              className="mt-3"
              checked={includeEpisodes}
              onChange={(e) => onIncludeEpisodesChange(e.target.checked)}
              label={`未公開のエピソードも一緒に公開する（${unpublishedEpisodeCount}件）`}
            />
          )}
        </>
      }
      error={error}
      confirmLabel={isPublish ? '公開' : '非公開にする'}
      confirmColor={isPublish ? 'primary' : 'danger'}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      onConfirm={onConfirm}
    />
  );
}
