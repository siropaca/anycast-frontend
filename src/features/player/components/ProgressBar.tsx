'use client';

import { cn } from '@/utils/cn';
import { formatTime } from '@/utils/date';

interface Props {
  currentTimeMs: number;
  durationMs: number;
  className?: string;

  onSeek: (timeMs: number) => void;
}

export function ProgressBar({
  currentTimeMs,
  durationMs,
  className,
  onSeek,
}: Props) {
  const progress = durationMs > 0 ? (currentTimeMs / durationMs) * 100 : 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSeek(Number(e.target.value));
  }

  return (
    <div className={cn('flex items-center gap-2 w-full', className)}>
      <span className="text-xs text-text-subtle tabular-nums w-8 text-right shrink-0">
        {formatTime(currentTimeMs)}
      </span>

      <input
        type="range"
        className="player-slider flex-1"
        min={0}
        max={durationMs}
        value={currentTimeMs}
        aria-label="再生位置"
        aria-valuemin={0}
        aria-valuemax={durationMs}
        aria-valuenow={currentTimeMs}
        aria-valuetext={`${formatTime(currentTimeMs)} / ${formatTime(durationMs)}`}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, var(--color-primary) ${progress}%, var(--color-bg-elevated) ${progress}%)`,
        }}
      />

      <span className="text-xs text-text-subtle tabular-nums w-8 shrink-0">
        {formatTime(durationMs)}
      </span>
    </div>
  );
}
