'use client';

import { CaretDownIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { VoiceOptionItem } from '@/features/studio/voices/components/VoiceOptionItem';
import { useVoicePreviewPlayer } from '@/features/studio/voices/hooks/useVoicePreviewPlayer';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

interface Props {
  voices: ResponseVoiceResponse[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

const DROPDOWN_GAP = 4;
const VIEWPORT_PADDING = 8;
const PREFERRED_MAX_HEIGHT = 240;

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

export function VoiceSelect({
  voices,
  value,
  onValueChange,
  placeholder = '選択してください',
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
    isVoicePlaying,
    toggle,
    stop,
    handlePlay,
    handlePause,
    handleEnded,
  } = useVoicePreviewPlayer();

  const selectedVoice = voices.find((v) => v.id === value);

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

  function handleSelect(voiceId: string) {
    onValueChange(voiceId);
    setOpen(false);
    stop();
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
        <span
          className={cn(
            'flex-1 truncate text-left',
            selectedVoice ? 'text-text-main' : 'text-text-placeholder',
          )}
        >
          {selectedVoice ? selectedVoice.name : placeholder}
        </span>

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
              {voices.map((voice) => (
                <VoiceOptionItem
                  key={voice.id}
                  voice={voice}
                  isSelected={value === voice.id}
                  isPlaying={isVoicePlaying(voice.id)}
                  onSelect={() => handleSelect(voice.id)}
                  onPlayToggle={() => toggle(voice)}
                />
              ))}
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
