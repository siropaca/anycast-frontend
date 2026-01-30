import type { Metadata } from 'next';

import { Pages } from '@/libs/pages';

interface Props {
  params: Promise<{ episodeId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { episodeId } = await params;
  return {
    title: `${Pages.episode.title} - ${episodeId}`,
  };
}

export default async function EpisodePage({ params }: Props) {
  const { episodeId } = await params;

  return (
    <div>
      <div>エピソード詳細</div>
      <div>{episodeId}</div>
    </div>
  );
}
