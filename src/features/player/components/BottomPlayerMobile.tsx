import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { SpeedControl } from '@/features/player/components/SpeedControl';
import { TrackInfo } from '@/features/player/components/TrackInfo';
import type { Track } from '@/stores/playerStore';

interface Props {
  title: string;
  subtitle?: string;
  artworkUrl?: string;
  trackType?: Track['type'];
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;
  playbackRate: number;

  onPlayPause: () => void;
  onPlaybackRateChange: (rate: number) => void;
}

export function BottomPlayerMobile({
  title,
  subtitle,
  artworkUrl,
  trackType,
  isPlaying,
  currentTimeMs,
  durationMs,
  playbackRate,
  onPlayPause,
  onPlaybackRateChange,
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
          subtitle={subtitle}
          artworkUrl={artworkUrl}
          trackType={trackType}
          artworkSize={40}
          className="flex-1 min-w-0"
        />

        <SpeedControl
          playbackRate={playbackRate}
          onPlaybackRateChange={onPlaybackRateChange}
        />

        <button
          type="button"
          aria-label={isPlaying ? '一時停止' : '再生'}
          onClick={onPlayPause}
          className="shrink-0 ml-1 text-text-main"
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
