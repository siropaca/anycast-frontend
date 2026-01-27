import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { TrackInfo } from '@/features/player/components/TrackInfo';

interface Props {
  title: string;
  channelName?: string;
  artworkUrl?: string;
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;

  onPlayPause: () => void;
}

export function BottomPlayerMobile({
  title,
  channelName,
  artworkUrl,
  isPlaying,
  currentTimeMs,
  durationMs,
  onPlayPause,
}: Props) {
  const progress = durationMs > 0 ? (currentTimeMs / durationMs) * 100 : 0;

  return (
    <div className="md:hidden border-t border-border bg-bg-main">
      {/* 極細プログレスバー */}
      <div className="h-1 w-full bg-bg-elevated">
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center justify-between px-4 h-14">
        <TrackInfo
          title={title}
          channelName={channelName}
          artworkUrl={artworkUrl}
          artworkSize={40}
          className="flex-1 min-w-0"
        />

        <button
          type="button"
          aria-label={isPlaying ? '一時停止' : '再生'}
          onClick={onPlayPause}
          className="shrink-0 ml-3 text-text-main"
        >
          {isPlaying ? (
            <PauseIcon size={28} weight="fill" />
          ) : (
            <PlayIcon size={28} weight="fill" />
          )}
        </button>
      </div>
    </div>
  );
}
