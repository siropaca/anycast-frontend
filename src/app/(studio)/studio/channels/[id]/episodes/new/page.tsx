import type { Metadata } from 'next';
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

  return <CreateEpisode channelId={id} />;
}
