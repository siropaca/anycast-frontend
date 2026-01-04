import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EpisodeDetail } from '@/features/studio/episodes/components/EpisodeDetail';
import { Pages } from '@/libs/pages';
import type { EpisodeParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.episode.title,
  robots: { index: false },
};

interface Props {
  params: Promise<EpisodeParams>;
}

export default async function StudioEpisodePage({ params }: Props) {
  const { id, episodeId } = await params;

  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <EpisodeDetail channelId={id} episodeId={episodeId} />
    </Suspense>
  );
}
