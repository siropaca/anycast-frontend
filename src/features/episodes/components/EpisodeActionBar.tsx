'use client';

import {
  ListPlusIcon,
  PauseIcon,
  PlayIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from '@phosphor-icons/react';

import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { useEpisodeReaction } from '@/features/episodes/hooks/useEpisodeReaction';
import { useToast } from '@/hooks/useToast';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';

interface Props {
  episode: ResponseEpisodeResponse;
  channelName: string;
  isLoggedIn: boolean;
}

export function EpisodeActionBar({ episode, channelName, isLoggedIn }: Props) {
  const { isEpisodePlaying, playEpisode, pauseEpisode } =
    useEpisodePlayer(channelName);
  const { currentReaction, isPending, toggleReaction } = useEpisodeReaction(
    episode.id,
  );
  const toast = useToast();

  const playing = isEpisodePlaying(episode);

  function handlePlayClick() {
    if (playing) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  }

  function handleGoodClick() {
    const isRemoving = currentReaction === 'like';
    toggleReaction('like');
    toast.success({
      title: isRemoving ? '高評価を取り消しました' : '高評価しました',
    });
  }

  function handleBadClick() {
    const isRemoving = currentReaction === 'bad';
    toggleReaction('bad');
    toast.success({
      title: isRemoving ? '低評価を取り消しました' : '低評価しました',
    });
  }

  return (
    <div className="flex items-center gap-4">
      <IconButton
        icon={
          playing ? (
            <PauseIcon size={24} weight="fill" />
          ) : (
            <PlayIcon size={24} weight="fill" />
          )
        }
        aria-label={playing ? '一時停止' : '再生'}
        size="xl"
        color="primary"
        disabled={!episode.fullAudio}
        disabledReason="音声が生成されていません"
        onClick={handlePlayClick}
      />

      {isLoggedIn && (
        <>
          <IconButton
            icon={
              <ThumbsUpIcon
                size={20}
                weight={currentReaction === 'like' ? 'fill' : 'regular'}
              />
            }
            aria-label="高評価"
            variant={currentReaction === 'like' ? 'solid' : 'outline'}
            color="secondary"
            disabled={isPending}
            onClick={handleGoodClick}
          />
          <IconButton
            icon={
              <ThumbsDownIcon
                size={20}
                weight={currentReaction === 'bad' ? 'fill' : 'regular'}
              />
            }
            aria-label="低評価"
            variant={currentReaction === 'bad' ? 'solid' : 'outline'}
            color="secondary"
            disabled={isPending}
            onClick={handleBadClick}
          />
        </>
      )}

      <IconButton
        icon={<ListPlusIcon size={26} />}
        aria-label="再生リストに追加"
        variant="text"
        color="secondary"
      />
    </div>
  );
}
