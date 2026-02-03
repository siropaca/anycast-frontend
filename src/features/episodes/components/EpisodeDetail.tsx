'use client';

import { useEpisode } from '@/features/episodes/hooks/useEpisode';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EpisodeDetail({ channelId, episodeId }: Props) {
  const { episode } = useEpisode(channelId, episodeId);

  return (
    <div>
      <div>{episode.title}</div>
    </div>
  );
}
