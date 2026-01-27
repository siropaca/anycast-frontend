import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Track {
  id: string;
  type: 'episode' | 'voiceSample';
  title: string;
  channelName?: string;
  artworkUrl?: string;
  audioUrl: string;
  durationMs: number;
}

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  queueIndex: number;

  isPlaying: boolean;
  currentTimeMs: number;
  durationMs: number;

  volume: number;
  isMuted: boolean;
}

interface PlayerActions {
  play: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;

  next: () => void;
  previous: () => void;

  seek: (timeMs: number) => void;

  setVolume: (volume: number) => void;
  toggleMute: () => void;

  setCurrentTime: (timeMs: number) => void;
  setDuration: (durationMs: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const PREVIOUS_THRESHOLD_MS = 3000;

export const usePlayerStore = create<PlayerState & PlayerActions>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      queueIndex: 0,

      isPlaying: false,
      currentTimeMs: 0,
      durationMs: 0,

      volume: 0.8,
      isMuted: false,

      play: (track, queue) => {
        const newQueue = queue ?? [track];
        const index = newQueue.findIndex((t) => t.id === track.id);

        set({
          currentTrack: track,
          queue: newQueue,
          queueIndex: index === -1 ? 0 : index,
          isPlaying: true,
          currentTimeMs: 0,
          durationMs: track.durationMs,
        });
      },

      pause: () => {
        set({ isPlaying: false });
      },

      resume: () => {
        if (get().currentTrack) {
          set({ isPlaying: true });
        }
      },

      stop: () => {
        set({
          currentTrack: null,
          isPlaying: false,
          currentTimeMs: 0,
          durationMs: 0,
          queue: [],
          queueIndex: 0,
        });
      },

      next: () => {
        const { queue, queueIndex } = get();
        if (queueIndex >= queue.length - 1 || queue.length <= 1) {
          return;
        }

        const nextIndex = queueIndex + 1;
        const nextTrack = queue[nextIndex];

        set({
          currentTrack: nextTrack,
          queueIndex: nextIndex,
          isPlaying: true,
          currentTimeMs: 0,
          durationMs: nextTrack.durationMs,
        });
      },

      previous: () => {
        const { queue, queueIndex, currentTimeMs } = get();

        if (currentTimeMs >= PREVIOUS_THRESHOLD_MS) {
          set({ currentTimeMs: 0 });
          return;
        }

        if (queueIndex > 0) {
          const prevIndex = queueIndex - 1;
          const prevTrack = queue[prevIndex];

          set({
            currentTrack: prevTrack,
            queueIndex: prevIndex,
            isPlaying: true,
            currentTimeMs: 0,
            durationMs: prevTrack.durationMs,
          });
          return;
        }

        set({ currentTimeMs: 0 });
      },

      seek: (timeMs) => {
        set({ currentTimeMs: timeMs });
      },

      setVolume: (volume) => {
        set({ volume, isMuted: volume === 0 ? get().isMuted : false });
      },

      toggleMute: () => {
        set((state) => ({ isMuted: !state.isMuted }));
      },

      setCurrentTime: (timeMs) => {
        set({ currentTimeMs: timeMs });
      },

      setDuration: (durationMs) => {
        set({ durationMs });
      },

      setIsPlaying: (isPlaying) => {
        set({ isPlaying });
      },
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
      }),
    },
  ),
);
