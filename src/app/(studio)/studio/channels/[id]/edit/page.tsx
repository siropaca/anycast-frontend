import type { Metadata } from 'next';
import { Pages } from '@/libs/pages';
import type { EditChannelParams } from '@/libs/pages/studioPages';

export const metadata: Metadata = {
  title: Pages.studio.editChannel.title,
  robots: { index: false },
};

interface Props {
  params: Promise<EditChannelParams>;
}

export default async function StudioEditChannelPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <h1>{Pages.studio.editChannel.title}</h1>
      <p>Channel ID: {id}</p>
    </div>
  );
}
