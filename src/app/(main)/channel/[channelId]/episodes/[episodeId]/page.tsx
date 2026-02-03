import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EpisodeDetail } from '@/features/episodes/components/EpisodeDetail';
import { getChannelsChannelIdEpisodesEpisodeId } from '@/libs/api/generated/episodes/episodes';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { auth } from '@/libs/auth/auth';
import type { EpisodeParams } from '@/libs/pages/mainPages';

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
  const { isLoggedIn } = await auth();

  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <EpisodeDetail
        channelId={channelId}
        episodeId={episodeId}
        isLoggedIn={isLoggedIn}
      />
    </Suspense>
  );
}
