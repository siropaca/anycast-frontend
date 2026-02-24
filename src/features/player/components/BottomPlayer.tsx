'use client';

import '@/features/player/styles/player-slider.css';
import { BottomPlayerDesktop } from '@/features/player/components/BottomPlayerDesktop';
import { BottomPlayerMobile } from '@/features/player/components/BottomPlayerMobile';
import { useAudioPlayer } from '@/features/player/hooks/useAudioPlayer';
import { useBottomPlayer } from '@/features/player/hooks/useBottomPlayer';
import { usePlaybackTracking } from '@/features/player/hooks/usePlaybackTracking';

export function BottomPlayer() {
  useAudioPlayer();
  usePlaybackTracking();

  const {
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
    onPlayPause,
    onPrevious,
    onNext,
    onSeek,
    onVolumeChange,
    onToggleMute,
    onPlaybackRateChange,
    onDownload,
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
        trackType={currentTrack?.type}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={durationMs}
        volume={volume}
        isMuted={isMuted}
        playbackRate={playbackRate}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        onPlayPause={onPlayPause}
        onPrevious={onPrevious}
        onNext={onNext}
        onSeek={onSeek}
        onVolumeChange={onVolumeChange}
        onToggleMute={onToggleMute}
        onPlaybackRateChange={onPlaybackRateChange}
        onDownload={onDownload}
      />

      <BottomPlayerMobile
        title={currentTrack?.title ?? ''}
        subtitle={currentTrack?.subtitle}
        artworkUrl={currentTrack?.artworkUrl}
        trackType={currentTrack?.type}
        isPlaying={isPlaying}
        currentTimeMs={currentTimeMs}
        durationMs={durationMs}
        playbackRate={playbackRate}
        onPlayPause={onPlayPause}
        onPlaybackRateChange={onPlaybackRateChange}
      />
    </section>
  );
}
