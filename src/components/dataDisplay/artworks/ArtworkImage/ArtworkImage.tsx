'use client';

import Image from 'next/image';
import { useState } from 'react';
import { NowPlayingIndicator } from '@/components/dataDisplay/artworks/NowPlayingIndicator/NowPlayingIndicator';
import { cn } from '@/utils/cn';

interface Props {
  src?: string;
  alt?: string;
  size?: number;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  isPlaying?: boolean;
  className?: string;
}

export function ArtworkImage({
  src,
  alt = '',
  size,
  sizes,
  priority,
  rounded,
  isPlaying,
  className,
}: Props) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  /**
   * 画像読み込みエラー時にフォールバック表示に切り替える
   */
  function handleError() {
    setHasError(true);
  }

  return (
    <div
      style={size ? { width: size, height: size } : undefined}
      className={cn(
        'relative shrink-0 overflow-hidden',
        rounded ? 'rounded-full' : 'rounded-md',
        !size && 'aspect-square w-full',
        showFallback && 'bg-linear-to-br from-primary to-primary/40',
        className,
      )}
    >
      {!showFallback && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={
            sizes ??
            (size
              ? `${size}px`
              : '(min-width: 1280px) 17vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw')
          }
          onError={handleError}
          className="object-cover"
        />
      )}
      {isPlaying && <NowPlayingIndicator />}
    </div>
  );
}
