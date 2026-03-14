import { useEffect, useRef } from 'react';

import { usePlayerStore } from '@/stores/playerStore';

/**
 * 再生中のトラック名をブラウザタブのタイトルに反映するフック
 *
 * トラック再生中はタイトルをトラック名に変更し、
 * 再生停止またはトラックがなくなった場合は元のタイトルに戻す
 */
export function useDocumentTitle() {
  const originalTitleRef = useRef<string>('');

  useEffect(() => {
    originalTitleRef.current = document.title;

    const unsubscribe = usePlayerStore.subscribe((state, prevState) => {
      const hasTrack = state.currentTrack !== null;
      const hadTrack = prevState.currentTrack !== null;
      const trackChanged =
        state.currentTrack?.id !== prevState.currentTrack?.id;
      const playStateChanged = state.isPlaying !== prevState.isPlaying;

      if (trackChanged || playStateChanged || hasTrack !== hadTrack) {
        if (hasTrack && state.isPlaying) {
          document.title = `${state.currentTrack?.title} | Anycast`;
        } else if (!hasTrack) {
          document.title = originalTitleRef.current;
        }
      }
    });

    return () => {
      unsubscribe();
      document.title = originalTitleRef.current;
    };
  }, []);
}
