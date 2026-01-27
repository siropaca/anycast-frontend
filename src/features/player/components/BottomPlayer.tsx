'use client';

import '@/styles/player-slider.css';
import { BottomPlayerDesktop } from '@/features/player/components/BottomPlayerDesktop';
import { BottomPlayerMobile } from '@/features/player/components/BottomPlayerMobile';
import { useMockPlayer } from '@/features/player/hooks/useMockPlayer';

export function BottomPlayer() {
  const {
    track,
    isPlaying,
    volume,
    isMuted,
    currentTimeMs,
    hasPrevious,
    hasNext,
    onPlayPause,
    onPrevious,
    onNext,
    onSeek,
    onVolumeChange,
    onToggleMute,
  } = useMockPlayer();

  return (
    <section aria-label="オーディオプレイヤー">
      <BottomPlayerDesktop
        title={track.title}
        channelName={track.channelName}
        artworkUrl={track.artworkUrl}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={track.durationMs}
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
        title={track.title}
        channelName={track.channelName}
        artworkUrl={track.artworkUrl}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={track.durationMs}
        onPlayPause={onPlayPause}
      />
    </section>
  );
}
