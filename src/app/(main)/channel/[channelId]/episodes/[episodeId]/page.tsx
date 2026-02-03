import type { Metadata } from 'next';

import { getChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import type { EpisodeParams } from '@/libs/pages/mainPages';

import { EpisodeDetail } from '@/features/episodes/components/EpisodeDetail';

interface Props {
  params: Promise<EpisodeParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channelId, episodeId } = await params;
  const response = await getChannelsChannelIdEpisodesEpisodeId(
    channelId,
    episodeId,
  );
  const episode = unwrapResponse<ResponseEpisodeResponse>(response);

  return {
    title: episode.title,
  };
}

export default async function EpisodePage({ params }: Props) {
  const { channelId, episodeId } = await params;

  return <EpisodeDetail channelId={channelId} episodeId={episodeId} />;
}
