'use client';

import { ListPlusIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react';
import Link from 'next/link';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';
import { formatDateJP, formatDuration } from '@/utils/date';

interface Props {
  episode: ResponseEpisodeResponse;
  channelId: string;
  channelName: string;
  isPlaying: boolean;

  onPlay: () => void;
  onPause: () => void;
  onAddToPlaylist: () => void;
}

export function ChannelEpisodeListItem({
  episode,
  channelId,
  channelName,
  isPlaying,
  onPlay,
  onPause,
  onAddToPlaylist,
}: Props) {
  const durationMs = episode.fullAudio?.durationMs;

  function handlePlayClick() {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  }

  return (
    <div className="flex gap-6 border-b border-border py-4 last:border-b-0 mt-2">
      <Link
        href={Pages.episode.path({ channelId, episodeId: episode.id })}
        className="shrink-0"
      >
        <ArtworkImage
          src={episode.artwork?.url}
          alt={episode.title}
          size={120}
          isPlaying={isPlaying}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          {/* タイトル */}
          <Link
            href={Pages.episode.path({ channelId, episodeId: episode.id })}
            className="mb-2 inline-block hover:underline font-semibold leading-snug"
          >
            {episode.title}
          </Link>

          <br />

          {/* チャンネル名 */}
          <Link
            href={Pages.channel.path({ channelId })}
            className="mb-2 inline-block hover:underline text-sm text-text-subtle"
          >
            {channelName}
          </Link>

          {/* 説明 */}
          {episode.description && (
            <p className="line-clamp-3 text-sm text-text-subtle">
              {episode.description}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-text-subtle">
            {/* 公開日 */}
            {episode.publishedAt && (
              <span>{formatDateJP(new Date(episode.publishedAt))}</span>
            )}

            {episode.publishedAt && durationMs != null && <span>・</span>}

            {/* 再生時間 */}
            {durationMs != null && <span>{formatDuration(durationMs)}</span>}
          </div>

          <div className="flex items-center gap-3">
            <IconButton
              icon={<ListPlusIcon size={24} />}
              aria-label="プレイリストに追加"
              variant="text"
              color="secondary"
              onClick={onAddToPlaylist}
            />

            <IconButton
              icon={
                isPlaying ? (
                  <PauseIcon size={18} weight="fill" />
                ) : (
                  <PlayIcon size={18} weight="fill" />
                )
              }
              aria-label={isPlaying ? '一時停止' : '再生'}
              color="primary"
              disabled={!episode.fullAudio}
              disabledReason="音声が生成されていません"
              onClick={handlePlayClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
