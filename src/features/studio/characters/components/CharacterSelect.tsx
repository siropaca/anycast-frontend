'use client';

import { CaretDownIcon, UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CharacterOptionItem } from '@/features/studio/characters/components/CharacterOptionItem';
import { useCharacterPreviewPlayer } from '@/features/studio/characters/hooks/useCharacterPreviewPlayer';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

interface Props {
  characters: ResponseCharacterResponse[];
  voices: ResponseVoiceResponse[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

const DROPDOWN_GAP = 4;
const VIEWPORT_PADDING = 8;
const PREFERRED_MAX_HEIGHT = 280;

interface DropdownStyle {
  top?: number;
  bottom?: number;
  left: number;
  width: number;
  maxHeight: number;
}

/**
 * トリガー要素の位置からドロップダウンのスタイルを計算する
 *
 * @param rect - トリガー要素の BoundingClientRect
 * @returns ドロップダウンのスタイル
 */
function calcDropdownStyle(rect: DOMRect): DropdownStyle {
  const spaceBelow =
    window.innerHeight - rect.bottom - DROPDOWN_GAP - VIEWPORT_PADDING;
  const spaceAbove = rect.top - DROPDOWN_GAP - VIEWPORT_PADDING;
  const openBelow =
    spaceBelow >= PREFERRED_MAX_HEIGHT || spaceBelow >= spaceAbove;

  if (openBelow) {
    return {
      top: rect.bottom + DROPDOWN_GAP,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.min(PREFERRED_MAX_HEIGHT, spaceBelow),
    };
  }
  return {
    bottom: window.innerHeight - rect.top + DROPDOWN_GAP,
    left: rect.left,
    width: rect.width,
    maxHeight: Math.min(PREFERRED_MAX_HEIGHT, spaceAbove),
  };
}

/**
 * ボイスの ResponseVoiceResponse をキャラクターの voice.id で引く Map を作る
 *
 * @param voices - ボイス一覧
 * @returns voiceId → ResponseVoiceResponse の Map
 */
function buildVoiceMap(
  voices: ResponseVoiceResponse[],
): Map<string, ResponseVoiceResponse> {
  const map = new Map<string, ResponseVoiceResponse>();
  for (const voice of voices) {
    map.set(voice.id, voice);
  }
  return map;
}

export function CharacterSelect({
  characters,
  voices,
  value,
  onValueChange,
  placeholder = 'キャラクターを選択',
  error = false,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<DropdownStyle | null>(
    null,
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    audioRef,
    isCharacterPlaying,
    toggle,
    stop,
    handlePlay,
    handlePause,
    handleEnded,
  } = useCharacterPreviewPlayer();

  const voiceMap = buildVoiceMap(voices);
  const selectedCharacter = characters.find((c) => c.id === value);

  // 外側クリックで閉じる
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
      stop();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, stop]);

  // スクロール・リサイズ時に位置を更新
  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        setDropdownStyle(calcDropdownStyle(rect));
      }
    }

    // capture: true で祖先要素（Modal.Body 等）のスクロールも検知
    document.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open]);

  function handleToggle() {
    if (disabled) return;

    if (open) {
      setOpen(false);
      stop();
      return;
    }

    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setDropdownStyle(calcDropdownStyle(rect));
    }
    setOpen(true);
  }

  function handleSelect(characterId: string) {
    onValueChange(characterId);
    setOpen(false);
    stop();
  }

  function handlePlayToggle(character: ResponseCharacterResponse) {
    const voice = voiceMap.get(character.voice.id);
    if (voice?.sampleAudioUrl) {
      toggle(character.id, voice.sampleAudioUrl);
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        className={cn(
          'relative inline-flex w-full items-center rounded-sm border bg-bg-elevated transition-colors',
          'h-[var(--size-md)] px-4 text-sm',
          'focus:ring-2 focus:ring-primary focus:outline-none',
          disabled && 'cursor-not-allowed opacity-50',
          error ? 'border-border-danger' : 'border-border',
        )}
        onClick={handleToggle}
      >
        {selectedCharacter ? (
          <span className="flex flex-1 items-center gap-2 truncate text-left text-text-main">
            {selectedCharacter.avatar?.url ? (
              <Image
                src={selectedCharacter.avatar.url}
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-bg-hover text-text-placeholder">
                <UserIcon size={12} />
              </span>
            )}
            <span className="truncate">
              {selectedCharacter.name}
              <span className="text-text-secondary">
                {' '}
                ({selectedCharacter.voice.name})
              </span>
            </span>
          </span>
        ) : (
          <span className="flex-1 truncate text-left text-text-placeholder">
            {placeholder}
          </span>
        )}

        <span className="shrink-0 text-text-placeholder size-4">
          <CaretDownIcon />
        </span>
      </button>

      {open &&
        dropdownStyle &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-(--z-popover) rounded-sm border border-border bg-bg-elevated shadow-lg"
            style={{
              top: dropdownStyle.top,
              bottom: dropdownStyle.bottom,
              left: dropdownStyle.left,
              width: dropdownStyle.width,
            }}
          >
            <div
              className="overflow-y-auto py-1"
              style={{ maxHeight: dropdownStyle.maxHeight }}
            >
              {characters.map((character) => {
                const voice = voiceMap.get(character.voice.id);
                return (
                  <CharacterOptionItem
                    key={character.id}
                    character={character}
                    isSelected={value === character.id}
                    isPlaying={isCharacterPlaying(character.id)}
                    hasSampleAudio={!!voice?.sampleAudioUrl}
                    onSelect={() => handleSelect(character.id)}
                    onPlayToggle={() => handlePlayToggle(character)}
                  />
                );
              })}
            </div>

            <audio
              ref={audioRef}
              hidden
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
