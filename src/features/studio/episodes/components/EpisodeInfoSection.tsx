'use client';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type { ResponseEpisodeResponse } from '@/libs/api/generated/schemas';

const ARTWORK_SIZE = 170;

interface Props {
  episode: ResponseEpisodeResponse;
}

export function EpisodeInfoSection({ episode }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <ArtworkImage
        src={episode.artwork?.url}
        alt={episode.title}
        size={ARTWORK_SIZE}
        priority
      />

      <div className="flex flex-1 flex-col gap-3">
        {episode.description ? (
          <p className="whitespace-pre-wrap">{episode.description}</p>
        ) : (
          <p className="text-sm text-text-subtle">説明文が設定されていません</p>
        )}

        <p className="text-sm text-text-subtle">
          {episode.publishedAt
            ? `公開日: ${new Date(episode.publishedAt).toLocaleDateString('ja-JP')}`
            : '非公開'}
        </p>
      </div>
    </div>
  );
}
