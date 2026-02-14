'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { getGenderLabel } from '@/features/studio/voices/utils/voiceLabels';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

interface Props {
  voice: ResponseVoiceResponse;
  isSelected: boolean;
  isPlaying: boolean;
  onSelect: () => void;
  onPlayToggle: () => void;
}

export function VoiceOptionItem({
  voice,
  isSelected,
  isPlaying,
  onSelect,
  onPlayToggle,
}: Props) {
  function handlePlayClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    onPlayToggle();
  }

  return (
    <button
      type="button"
      className={cn(
        'flex w-full cursor-pointer items-center gap-3 px-3 py-2.5 text-left transition-colors',
        isSelected
          ? 'bg-primary/5 text-primary'
          : 'text-text-main hover:bg-bg-hover',
      )}
      onClick={onSelect}
    >
      <span className="flex-1 truncate text-sm">
        {voice.name}
        <span className="text-text-secondary">
          {' '}
          ({getGenderLabel(voice.gender)})
        </span>
      </span>

      {voice.sampleAudioUrl && (
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
      )}
    </button>
  );
}
