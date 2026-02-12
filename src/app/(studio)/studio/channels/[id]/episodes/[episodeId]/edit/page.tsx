import type { Metadata } from 'next';
import { Suspense } from 'react';
import { EditEpisode } from '@/features/studio/episodes/components/EditEpisode';
import { Pages } from '@/libs/pages';
import type { EditEpisodeParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.editEpisode.title,
  robots: { index: false },
};

interface Props {
  params: Promise<EditEpisodeParams>;
}

export default async function StudioEditEpisodePage({ params }: Props) {
  const { id, episodeId } = await params;

  return (
    // TODO: ローディング実装
    <Suspense fallback={<p>読み込み中...</p>}>
      <EditEpisode channelId={id} episodeId={episodeId} />
    </Suspense>
  );
}
