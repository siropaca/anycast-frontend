'use client';

import '@/features/player/styles/player-slider.css';
import { BottomPlayerDesktop } from '@/features/player/components/BottomPlayerDesktop';
import { BottomPlayerMobile } from '@/features/player/components/BottomPlayerMobile';
import { useAudioPlayer } from '@/features/player/hooks/useAudioPlayer';
import { useBottomPlayer } from '@/features/player/hooks/useBottomPlayer';

export function BottomPlayer() {
  useAudioPlayer();

  const {
    hasPlayer,
    currentTrack,
    isPlaying,
    currentTimeMs,
    durationMs,
    volume,
    isMuted,
    hasPrevious,
    hasNext,
    onPlayPause,
    onPrevious,
    onNext,
    onSeek,
    onVolumeChange,
    onToggleMute,
  } = useBottomPlayer();

  if (!hasPlayer) {
    return null;
  }

  return (
    <section aria-label="オーディオプレイヤー">
      <BottomPlayerDesktop
        title={currentTrack?.title ?? ''}
        subtitle={currentTrack?.subtitle}
        artworkUrl={currentTrack?.artworkUrl}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={durationMs}
        volume={volume}
        isMuted={isMuted}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPlayPause={onPlayPause}
        onPrevious={onPrevious}
        onNext={onNext}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        onToggleMute={onToggleMute}
      />

      <BottomPlayerMobile
        title={currentTrack?.title ?? ''}
        subtitle={currentTrack?.subtitle}
        artworkUrl={currentTrack?.artworkUrl}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={durationMs}
        onPlayPause={onPlayPause}
      />
    </section>
  );
}
