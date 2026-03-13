'use client';

import { PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { toTrackFromDefaultBgm } from '@/features/player/utils/trackConverter';
import { useBgmPlayer } from '@/features/studio/channels/hooks/useBgmPlayer';
import type { ResponseBgmAudioResponse } from '@/libs/api/generated/schemas';

interface BgmLike {
  id: string;
  name: string;
  audio: ResponseBgmAudioResponse;
}

interface Props {
  bgm: BgmLike;
}

export function BgmPlayButton({ bgm }: Props) {
  const { playing, play, pause } = useBgmPlayer(bgm.id);

  function handleClick() {
    if (playing) {
      pause();
    } else {
      play(toTrackFromDefaultBgm(bgm));
    }
  }

  return (
    <button
      type="button"
      aria-label={playing ? '一時停止' : '再生'}
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-bg-hover text-text-subtle transition-colors hover:bg-bg-hover-strong hover:text-text cursor-pointer"
      onClick={handleClick}
    >
      {playing ? (
        <PauseIcon size={10} weight="fill" />
      ) : (
        <PlayIcon size={10} weight="fill" />
      )}
    </button>
  );
}
