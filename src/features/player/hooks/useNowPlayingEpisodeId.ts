import { usePlayerStore } from '@/stores/playerStore';

/**
 * 現在再生中のエピソード ID を返す
 *
 * エピソードタイプのトラックが再生中の場合のみ ID を返し、それ以外は null を返す。
 *
 * @returns 再生中のエピソード ID、または null
 */
export function useNowPlayingEpisodeId(): string | null {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  if (currentTrack?.type === 'episode' && isPlaying) {
    return currentTrack.id;
  }

  return null;
}
