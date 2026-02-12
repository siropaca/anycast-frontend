import { usePlayerStore } from '@/stores/playerStore';

/**
 * ボトムプレイヤーの状態と操作を提供する
 *
 * PlayerStore から必要な状態を取得し、再生・停止・シーク・音量調整などの操作を提供する。
 *
 * @returns プレイヤーの状態と操作関数
 */
export function useBottomPlayer() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const queue = usePlayerStore((s) => s.queue);
  const queueIndex = usePlayerStore((s) => s.queueIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTimeMs = usePlayerStore((s) => s.currentTimeMs);
  const durationMs = usePlayerStore((s) => s.durationMs);
  const volume = usePlayerStore((s) => s.volume);
  const isMuted = usePlayerStore((s) => s.isMuted);
  const playbackRate = usePlayerStore((s) => s.playbackRate);

  const pause = usePlayerStore((s) => s.pause);
  const resume = usePlayerStore((s) => s.resume);
  const next = usePlayerStore((s) => s.next);
  const previous = usePlayerStore((s) => s.previous);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const toggleMute = usePlayerStore((s) => s.toggleMute);
  const setPlaybackRate = usePlayerStore((s) => s.setPlaybackRate);

  const hasPlayer = currentTrack !== null;
  const hasPrevious = true;
  const hasNext = queueIndex < queue.length - 1 && queue.length > 1;

  function handlePlayPause() {
    isPlaying ? pause() : resume();
  }

  return {
    hasPlayer,
    currentTrack,
    isPlaying,
    currentTimeMs,
    durationMs,
    volume,
    isMuted,
    playbackRate,
    hasPrevious,
    hasNext,

    onPlayPause: handlePlayPause,
    onPrevious: previous,
    onNext: next,
    onSeek: seek,
    onVolumeChange: setVolume,
    onToggleMute: toggleMute,
    onPlaybackRateChange: setPlaybackRate,
  };
}
