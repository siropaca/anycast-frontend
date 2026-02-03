'use client';

import { useChannel } from '@/features/channels/hooks/useChannel';
import { useEpisode } from '@/features/episodes/hooks/useEpisode';
import { useEpisodePlayer } from '@/features/episodes/hooks/useEpisodePlayer';
import { useEpisodeReaction } from '@/features/episodes/hooks/useEpisodeReaction';

interface Props {
  channelId: string;
  episodeId: string;
  isLoggedIn?: boolean;
}

export function EpisodeDetail({
  channelId,
  episodeId,
  isLoggedIn = false,
}: Props) {
  const { channel } = useChannel(channelId);
  const { episode } = useEpisode(channelId, episodeId);
  const { isEpisodePlaying, playEpisode, pauseEpisode } = useEpisodePlayer(
    channel.name,
  );
  const { currentReaction, isPending, toggleReaction } =
    useEpisodeReaction(episodeId);

  function handleGoodClick() {
    toggleReaction('like');
  }

  function handlePlayClick() {
    if (isEpisodePlaying(episode)) {
      pauseEpisode();
    } else {
      playEpisode(episode);
    }
  }

  function handleBadClick() {
    toggleReaction('bad');
  }

  return (
    <div>
      <button
        type="button"
        className="border"
        onClick={handlePlayClick}
        disabled={!episode.fullAudio}
      >
        {isEpisodePlaying(episode) ? '一時停止' : '再生'}
      </button>

      {isLoggedIn && (
        <>
          <button
            type="button"
            className="border"
            onClick={handleGoodClick}
            disabled={isPending}
          >
            {currentReaction === 'like' ? 'Good済' : 'Good'}
          </button>
          <button
            type="button"
            className="border"
            onClick={handleBadClick}
            disabled={isPending}
          >
            {currentReaction === 'bad' ? 'Bad済' : 'Bad'}
          </button>
        </>
      )}

      <button type="button" className="border">
        再生リストに追加
      </button>

      <pre>{JSON.stringify(episode, null, 2)}</pre>
    </div>
  );
}
