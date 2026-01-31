'use client';

import { ArtworkImage } from '@/components/dataDisplay/artworks/ArtworkImage/ArtworkImage';
import { cn } from '@/utils/cn';

interface Props {
  src?: string;
  size?: number;
  priority?: boolean;
  title: string;
  episodeCount?: number;
  className?: string;
}

export function PlayList({
  src,
  size,
  priority,
  title,
  episodeCount,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'rounded-md p-2 hover:bg-bg-elevated cursor-pointer',
        className,
      )}
    >
      <div className="relative" style={size ? { width: size } : undefined}>
        <ArtworkImage
          src={src}
          size={size}
          priority={priority}
          className={!size ? 'w-full' : undefined}
        />

        {episodeCount != null && (
          <span className="absolute right-1 bottom-1 rounded bg-black/50 px-1.5 py-0.5 text-xs text-white">
            {episodeCount}件のエピソード
          </span>
        )}
      </div>

      <div className="mt-2" style={size ? { width: size } : undefined}>
        <p className="truncate text-sm">{title}</p>
      </div>
    </div>
  );
}
