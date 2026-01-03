'use client';

import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function CreateEpisode({ channelId }: Props) {
  return (
    <div>
      <h1>{Pages.studio.newEpisode.title}</h1>
      <p>Channel ID: {channelId}</p>

      {/* TODO: エピソード作成フォームを実装 */}
    </div>
  );
}
