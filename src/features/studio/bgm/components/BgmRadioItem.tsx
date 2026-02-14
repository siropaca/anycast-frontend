'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';
import { formatTime } from '@/utils/date';

interface Props {
  bgm: ResponseBgmWithEpisodesResponse;
  value: string;
  selectedValue: string;
  isPlaying: boolean;

  onSelect: (value: string) => void;
  onPlayToggle: () => void;
}

export function BgmRadioItem({
  bgm,
  value,
  selectedValue,
  isPlaying,
  onSelect,
  onPlayToggle,
}: Props) {
  const isSelected = selectedValue === value;

  function handlePlayClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    onPlayToggle();
  }

  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 transition-colors',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:bg-surface-secondary',
      )}
    >
      <input
        type="radio"
        name="bgm"
        value={value}
        checked={isSelected}
        className="accent-primary"
        onChange={() => onSelect(value)}
      />

      <span className="flex-1 truncate text-sm">{bgm.name}</span>

      {bgm.audio.durationMs > 0 && (
        <span className="text-xs text-text-secondary">
          {formatTime(bgm.audio.durationMs)}
        </span>
      )}

      <IconButton
        icon={
          isPlaying ? (
            <PauseIcon size={14} weight="fill" />
          ) : (
            <PlayIcon size={14} weight="fill" />
          )
        }
        aria-label={isPlaying ? '一時停止' : '再生'}
        size="sm"
        color="secondary"
        variant="solid"
        onClick={handlePlayClick}
      />
    </label>
  );
}
