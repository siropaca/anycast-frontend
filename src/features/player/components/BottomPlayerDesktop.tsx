import { PlaybackControls } from '@/features/player/components/PlaybackControls';
import { TrackInfo } from '@/features/player/components/TrackInfo';
import { VolumeControl } from '@/features/player/components/VolumeControl';

interface Props {
  title: string;
  subtitle?: string;
  artworkUrl?: string;
  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;
  volume: number;
  isMuted: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;

  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (timeMs: number) => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function BottomPlayerDesktop({
  title,
  subtitle,
  artworkUrl,
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
}: Props) {
  return (
    <div className="hidden md:flex items-center h-bottom-player px-6 bg-bg-main">
      <div className="flex-1 min-w-0">
        <TrackInfo title={title} subtitle={subtitle} artworkUrl={artworkUrl} />
      </div>

      <div className="flex-1 flex justify-center">
        <PlaybackControls
          isPlaying={isPlaying}
          currentTimeMs={currentTimeMs}
          durationMs={durationMs}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          onPlayPause={onPlayPause}
          onPrevious={onPrevious}
          onNext={onNext}
          onSeek={onSeek}
        />
      </div>

      <div className="flex-1 flex justify-end">
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={onVolumeChange}
          onToggleMute={onToggleMute}
        />
      </div>
    </div>
  );
}
