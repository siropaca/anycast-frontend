import Link from 'next/link';

import {
  ARTWORK_FIXED_SIZE,
  Artwork,
} from '@/components/dataDisplay/artworks/Artwork/Artwork';
import { ContentSection } from '@/components/surface/ContentSection/ContentSection';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas/responseEpisodeResponse';
import { Pages } from '@/libs/pages';
import { formatDate } from '@/utils/date';

interface Props {
  episodes: ResponseEpisodeResponse[];
  channelId: string;
}

export function ChannelEpisodeList({ episodes, channelId }: Props) {
  if (episodes.length === 0) {
    return null;
  }

  return (
    <ContentSection title="同じチャンネルのエピソード">
      {episodes.map((ep) => (
        <Link
          key={ep.id}
          href={Pages.episode.path({
            channelId,
            episodeId: ep.id,
          })}
        >
          <Artwork
            src={ep.artwork?.url}
            title={ep.title}
            size={ARTWORK_FIXED_SIZE}
            subtext={
              ep.publishedAt
                ? formatDate(new Date(ep.publishedAt))
                : undefined
            }
          />
        </Link>
      ))}
    </ContentSection>
  );
}
