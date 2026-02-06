'use client';

import { useChannel } from '@/features/channels/hooks/useChannel';
import { useEpisode } from '@/features/episodes/hooks/useEpisode';

import { ChannelEpisodeList } from './ChannelEpisodeList';
import { EpisodeActionBar } from './EpisodeActionBar';
import { EpisodeHeader } from './EpisodeHeader';

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

  const otherEpisodes = channel.episodes.filter((ep) => ep.id !== episodeId);

  return (
    <div className="space-y-8">
      <EpisodeHeader
        episode={episode}
        channel={channel}
        channelId={channelId}
      />

      <EpisodeActionBar
        episode={episode}
        channelName={channel.name}
        isLoggedIn={isLoggedIn}
      />

      {/* 説明セクション */}
      <section>
        <h2 className="mb-3 text-lg font-bold">説明</h2>
        <p className="whitespace-pre-wrap text-sm text-text-subtle">
          {episode.description || '説明はありません'}
        </p>
      </section>

      <ChannelEpisodeList episodes={otherEpisodes} channelId={channelId} />
    </div>
  );
}
