'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { BgmSelector } from '@/features/studio/episodes/components/BgmSelector';
import type { ResponseEpisodeResponseBgm } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  bgm?: ResponseEpisodeResponseBgm;
}

export function BgmSection({ channelId, episodeId, bgm }: Props) {
  return (
    <div className="space-y-4">
      <SectionTitle title="BGM" level="h3" />
      <BgmSelector
        channelId={channelId}
        episodeId={episodeId}
        currentBgm={bgm ?? null}
      />
    </div>
  );
}
