'use client';

import { ScrollArea } from '@base-ui/react/scroll-area';
import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { BgmRadioItem } from '@/features/studio/bgm/components/BgmRadioItem';
import { useBgmPreviewPlayer } from '@/features/studio/bgm/hooks/useBgmPreviewPlayer';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { cn } from '@/utils/cn';

interface Props {
  allBgms: ResponseBgmWithEpisodesResponse[];
  selectedValue: string;
  isLoading: boolean;

  onSelect: (value: string) => void;
}

export function BgmRadioList({
  allBgms,
  selectedValue,
  isLoading,
  onSelect,
}: Props) {
  const {
    audioRef,
    isBgmPlaying,
    toggle,
    handlePlay,
    handlePause,
    handleEnded,
  } = useBgmPreviewPlayer();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    );
  }

  const userBgms = allBgms.filter((bgm) => !bgm.isSystem);
  const systemBgms = allBgms.filter((bgm) => bgm.isSystem);

  return (
    <ScrollArea.Root className="relative max-h-80">
      <ScrollArea.Viewport className="max-h-80 overflow-y-auto px-6 pb-6">
        <div className="space-y-4">
          <audio
            ref={audioRef}
            preload="none"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
          />

          <label
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-md border px-3 py-4 transition-colors',
              selectedValue === ''
                ? 'border-primary bg-primary/5'
                : 'border-border hover:bg-surface-secondary',
            )}
          >
            <input
              type="radio"
              name="bgm"
              value=""
              checked={selectedValue === ''}
              className="accent-primary"
              onChange={() => onSelect('')}
            />
            <span className="text-sm text-text-secondary">なし</span>
          </label>

          {userBgms.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-medium text-text-secondary">マイBGM</p>
              {userBgms.map((bgm) => (
                <BgmRadioItem
                  key={bgm.id}
                  bgm={bgm}
                  value={`user:${bgm.id}`}
                  selectedValue={selectedValue}
                  isPlaying={isBgmPlaying(bgm.id)}
                  onSelect={onSelect}
                  onPlayToggle={() => toggle(bgm)}
                />
              ))}
            </div>
          )}

          {systemBgms.length > 0 && (
            <div className="space-y-2.5">
              <p className="text-xs font-medium text-text-secondary">
                システム
              </p>
              {systemBgms.map((bgm) => (
                <BgmRadioItem
                  key={bgm.id}
                  bgm={bgm}
                  value={`system:${bgm.id}`}
                  selectedValue={selectedValue}
                  isPlaying={isBgmPlaying(bgm.id)}
                  onSelect={onSelect}
                  onPlayToggle={() => toggle(bgm)}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent px-0.5">
        <ScrollArea.Thumb className="w-full rounded-full bg-bg-elevated/75" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
