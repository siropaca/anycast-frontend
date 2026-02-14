'use client';

import { PauseIcon, PlayIcon, UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import type { ResponseCharacterResponse } from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

interface Props {
  character: ResponseCharacterResponse;
  isSelected: boolean;
  isPlaying: boolean;
  hasSampleAudio: boolean;
  onSelect: () => void;
  onPlayToggle: () => void;
}

export function CharacterOptionItem({
  character,
  isSelected,
  isPlaying,
  hasSampleAudio,
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
      {character.avatar?.url ? (
        <Image
          src={character.avatar.url}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-bg-hover text-text-placeholder">
          <UserIcon size={16} />
        </div>
      )}

      <span className="flex-1 truncate text-sm">
        {character.name}
        <span className="text-text-secondary"> ({character.voice.name})</span>
      </span>

      {hasSampleAudio && (
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
