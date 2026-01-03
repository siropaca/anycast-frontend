'use client';

import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

export function EditEpisode({ channelId, episodeId }: Props) {
  return (
    <div>
      <h1>{Pages.studio.editEpisode.title}</h1>
      <p>Channel ID: {channelId}</p>
      <p>Episode ID: {episodeId}</p>

      {/* TODO: エピソード編集フォームを実装 */}
    </div>
  );
}
