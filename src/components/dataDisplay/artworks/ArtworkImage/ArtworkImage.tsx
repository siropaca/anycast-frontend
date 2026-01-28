'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export function ArtworkImage({ src, alt = '', size, className }: Props) {
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
        'relative shrink-0 overflow-hidden rounded-md',
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
          onError={handleError}
          className="object-cover"
        />
      )}
    </div>
  );
}
