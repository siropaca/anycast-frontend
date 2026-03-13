'use client';

import { usePlayerStore } from '@/stores/playerStore';

/**
 * BGM の再生状態と操作を提供する
 *
 * @param bgmId - BGM の ID
 * @returns BGM の再生状態と操作関数
 */
export function useBgmPlayer(bgmId: string) {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);

  const playing =
    currentTrack?.id === bgmId && currentTrack?.type === 'bgm' && isPlaying;

  return {
    playing,
    play,
    pause,
  };
}
