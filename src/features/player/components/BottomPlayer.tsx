'use client';

import '@/features/player/styles/player-slider.css';
import { BottomPlayerDesktop } from '@/features/player/components/BottomPlayerDesktop';
import { BottomPlayerMobile } from '@/features/player/components/BottomPlayerMobile';
import { useAudioPlayer } from '@/features/player/hooks/useAudioPlayer';
import { useBottomPlayer } from '@/features/player/hooks/useBottomPlayer';

export function BottomPlayer() {
  useAudioPlayer();

  const {
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

  return (
    <section aria-label="オーディオプレイヤー">
      <BottomPlayerDesktop
        title={currentTrack?.title ?? ''}
        channelName={currentTrack?.channelName}
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
        channelName={currentTrack?.channelName}
        artworkUrl={currentTrack?.artworkUrl}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={durationMs}
        onPlayPause={onPlayPause}
      />
    </section>
  );
}
