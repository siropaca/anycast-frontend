'use client';

import { PlayIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';
import { NowPlayingIndicator } from '@/components/dataDisplay/artworks/NowPlayingIndicator/NowPlayingIndicator';
import { cn } from '@/utils/cn';

/**
 * アートワークのサイズに応じた再生ボタンのサイズを返す
 *
 * @param artworkSize - アートワークの幅（px）。未指定時はデフォルトサイズ
 * @returns ボタンとアイコンのサイズ（px）
 */
function getPlayButtonSize(artworkSize?: number): {
  button: number;
  icon: number;
} {
  if (!artworkSize || artworkSize >= 160) return { button: 40, icon: 22 };
  if (artworkSize >= 100) return { button: 32, icon: 16 };
  return { button: 24, icon: 12 };
}

interface Props {
  src?: string;
  alt?: string;
  size?: number;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  isPlaying?: boolean;
  fallbackIcon?: React.ReactNode;
  className?: string;

  onPlayClick?: () => void;
}

export function ArtworkImage({
  src,
  alt = '',
  size,
  sizes,
  priority,
  rounded,
  isPlaying,
  fallbackIcon,
  className,
  onPlayClick,
}: Props) {
  const [hasError, setHasError] = useState(false);

  const showFallback = !src || hasError;

  /**
   * 画像読み込みエラー時にフォールバック表示に切り替える
   */
  function handleError() {
    setHasError(true);
  }

  /**
   * 再生ボタンのクリックイベントを処理し、親要素へのイベント伝播を停止する
   */
  function handlePlayClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onPlayClick?.();
  }

  const playButton = getPlayButtonSize(size);

  return (
    <div
      style={size ? { width: size, height: size } : undefined}
      className={cn(
        'group/artwork relative shrink-0 overflow-hidden bg-bg-main',
        rounded ? 'rounded-full' : 'rounded-md',
        !size && 'aspect-square w-full',
        showFallback && 'bg-linear-to-br from-primary to-primary/40',
        className,
      )}
    >
      {showFallback && fallbackIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          {fallbackIcon}
        </div>
      )}

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

      {onPlayClick && !isPlaying && (
        <button
          type="button"
          aria-label="再生"
          onClick={handlePlayClick}
          style={{
            width: playButton.button,
            height: playButton.button,
          }}
          className="absolute right-2.5 bottom-2.5 flex items-center justify-center rounded-full bg-white opacity-0 shadow-lg transition-opacity cursor-pointer group-hover/artwork:opacity-100 hover:bg-white/80 hover:scale-105"
        >
          <PlayIcon
            size={playButton.icon}
            weight="fill"
            className="text-black ml-0.5 relative -left-px"
          />
        </button>
      )}
    </div>
  );
}
