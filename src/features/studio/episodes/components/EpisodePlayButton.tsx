'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';

import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';

interface Props {
  episode: ResponseEpisodeResponse;
  channelName: string;
}

export function EpisodePlayButton({ episode, channelName }: Props) {
  const { isEpisodePlaying, playEpisode, pauseEpisode } =
    useEpisodePlayer(channelName);

  const playing = isEpisodePlaying(episode);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (playing) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  }

  return (
    <IconButton
      icon={
        playing ? (
          <PauseIcon size={18} weight="fill" />
        ) : (
          <PlayIcon size={18} weight="fill" />
        )
      }
      aria-label={playing ? '一時停止' : '再生'}
      size="md"
      color="primary"
      disabled={!episode.fullAudio}
      disabledReason="音声が生成されていません"
      onClick={handleClick}
    />
  );
}
