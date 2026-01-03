import type { Metadata } from 'next';
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

  return <EditEpisode channelId={id} episodeId={episodeId} />;
}
