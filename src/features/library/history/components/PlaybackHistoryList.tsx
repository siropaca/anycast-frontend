'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { PlaybackHistoryDeleteDialog } from '@/features/library/history/components/PlaybackHistoryDeleteDialog';
import { PlaybackHistoryItem } from '@/features/library/history/components/PlaybackHistoryItem';
import { PlaybackHistoryMenu } from '@/features/library/history/components/PlaybackHistoryMenu';
import { usePlaybackHistory } from '@/features/library/history/hooks/usePlaybackHistory';
import { usePlaybackHistoryDeleteDialog } from '@/features/library/history/hooks/usePlaybackHistoryDeleteDialog';
import { Pages } from '@/libs/pages';

export function PlaybackHistoryList() {
  const { items } = usePlaybackHistory();
  const deleteDialog = usePlaybackHistoryDeleteDialog();

  return (
    <div>
      <SectionTitle
        title={Pages.library.history.pageTitle}
        action={
          items.length > 0 ? (
            <PlaybackHistoryMenu onDelete={deleteDialog.open} />
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <p className="py-12 text-center text-text-subtle">
          再生履歴はありません
        </p>
      ) : (
        <ArtworkGrid>
          {items.map((item, index) => (
            <PlaybackHistoryItem
              key={item.episode.id}
              item={item}
              priority={index < 6}
            />
          ))}
        </ArtworkGrid>
      )}

      <PlaybackHistoryDeleteDialog
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={deleteDialog.confirm}
      />
    </div>
  );
}
