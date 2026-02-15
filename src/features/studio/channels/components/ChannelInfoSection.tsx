import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import type {
  ResponseCategoryResponse,
  ResponseChannelResponseArtwork,
} from '@/libs/api/generated/schemas';

const ARTWORK_SIZE = 150;

interface Props {
  name: string;
  artwork?: ResponseChannelResponseArtwork;
  category: ResponseCategoryResponse;
  publishedAt?: string | null;
  description: string;
}

export function ChannelInfoSection({
  name,
  artwork,
  category,
  publishedAt,
  description,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <ArtworkImage
        src={artwork?.url}
        alt={name}
        size={ARTWORK_SIZE}
        priority
      />

      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-1">
          <p className="text-sm text-text-subtle">{category.name}</p>
          <p className="text-sm text-text-subtle">
            {publishedAt
              ? `公開日: ${new Date(publishedAt).toLocaleDateString('ja-JP')}`
              : '非公開'}
          </p>
        </div>

        {description ? (
          <p className="whitespace-pre-wrap">{description}</p>
        ) : (
          <p className="text-sm text-text-subtle">説明文が設定されていません</p>
        )}
      </div>
    </div>
  );
}
