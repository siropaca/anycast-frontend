'use client';

import Link from 'next/link';
import { Artwork } from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ArtworkGrid } from '@/features/home/components/ArtworkGrid';
import { PlaybackHistoryDeleteDialog } from '@/features/library/history/components/PlaybackHistoryDeleteDialog';
import { PlaybackHistoryMenu } from '@/features/library/history/components/PlaybackHistoryMenu';
import { usePlaybackHistory } from '@/features/library/history/hooks/usePlaybackHistory';
import { usePlaybackHistoryDeleteDialog } from '@/features/library/history/hooks/usePlaybackHistoryDeleteDialog';
import { useNowPlayingEpisodeId } from '@/features/player/hooks/useNowPlayingEpisodeId';
import { usePlayEpisode } from '@/features/player/hooks/usePlayEpisode';
import type { ResponsePlaybackHistoryItemResponse } from '@/libs/api/generated/schemas/responsePlaybackHistoryItemResponse';
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

interface PlaybackHistoryItemProps {
  item: ResponsePlaybackHistoryItemResponse;
  priority: boolean;
}

function PlaybackHistoryItem({ item, priority }: PlaybackHistoryItemProps) {
  const nowPlayingEpisodeId = useNowPlayingEpisodeId();
  const { isEpisodePlaying, playOrResume, pauseEpisode } = usePlayEpisode();
  const { episode } = item;

  function handlePlayClick() {
    if (isEpisodePlaying(episode.id)) {
      pauseEpisode();
    } else {
      playOrResume({
        ...episode,
        playbackProgress: {
          completed: item.completed,
          progressMs: item.progressMs,
        },
      });
    }
  }

  return (
    <Link
      href={Pages.episode.path({
        channelId: episode.channel.id,
        episodeId: episode.id,
      })}
    >
      <Artwork
        src={episode.channel.artwork?.url}
        title={episode.title}
        subtext={episode.channel.name}
        priority={priority}
        isPlaying={episode.id === nowPlayingEpisodeId}
        onPlayClick={episode.fullAudio ? handlePlayClick : undefined}
      />
    </Link>
  );
}
