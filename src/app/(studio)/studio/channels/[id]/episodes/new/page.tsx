import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CreateEpisode } from '@/features/studio/episodes/components/CreateEpisode';
import { Pages } from '@/libs/pages';
import type { NewEpisodeParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.newEpisode.title,
  robots: { index: false },
};

interface Props {
  params: Promise<NewEpisodeParams>;
}

export default async function StudioNewEpisodePage({ params }: Props) {
  const { id } = await params;

  return (
    // TODO: ローディング実装
    <Suspense fallback={<p>読み込み中...</p>}>
      <CreateEpisode channelId={id} />
    </Suspense>
  );
}
