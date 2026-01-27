import { usePlayerStore } from '@/stores/playerStore';

export function useBottomPlayer() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const queue = usePlayerStore((s) => s.queue);
  const queueIndex = usePlayerStore((s) => s.queueIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const currentTimeMs = usePlayerStore((s) => s.currentTimeMs);
  const durationMs = usePlayerStore((s) => s.durationMs);
  const volume = usePlayerStore((s) => s.volume);
  const isMuted = usePlayerStore((s) => s.isMuted);

  const pause = usePlayerStore((s) => s.pause);
  const resume = usePlayerStore((s) => s.resume);
  const next = usePlayerStore((s) => s.next);
  const previous = usePlayerStore((s) => s.previous);
  const seek = usePlayerStore((s) => s.seek);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const toggleMute = usePlayerStore((s) => s.toggleMute);

  const hasPrevious = true;
  const hasNext = queueIndex < queue.length - 1 && queue.length > 1;

  function handlePlayPause() {
    isPlaying ? pause() : resume();
  }

  return {
    currentTrack,
    isPlaying,
    currentTimeMs,
    durationMs,
    volume,
    isMuted,
    hasPrevious,
    hasNext,

    onPlayPause: handlePlayPause,
    onPrevious: previous,
    onNext: next,
    onSeek: seek,
    onVolumeChange: setVolume,
    onToggleMute: toggleMute,
  };
}
