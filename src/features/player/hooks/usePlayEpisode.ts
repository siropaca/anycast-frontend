'use client';

import type { Track } from '@/stores/playerStore';
import { usePlayerStore } from '@/stores/playerStore';

/** 再生完了とみなす残り時間のしきい値（ミリ秒） */
const NEAR_END_THRESHOLD_MS = 5_000;

/** アートワークの再生ボタンから再生可能なエピソードの最小インターフェース */
export interface PlayableEpisode {
  id: string;
  title: string;
  fullAudio?: { url: string; durationMs: number } | null;
  channel: { name: string };
  artwork?: { url: string } | null;
  playbackProgress?: { completed: boolean; progressMs: number } | null;
}

/**
 * エピソードの簡易再生を制御するフック
 *
 * アートワーク上の再生ボタンなど、軽量な再生操作に使用する。
 *
 * @returns エピソード再生の操作関数
 */
export function usePlayEpisode() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const pause = usePlayerStore((s) => s.pause);
  const resume = usePlayerStore((s) => s.resume);
  const seek = usePlayerStore((s) => s.seek);

  /**
   * 指定したエピソード ID が再生中かどうかを判定する
   *
   * @param episodeId - エピソード ID
   * @returns 再生中なら true
   */
  function isEpisodePlaying(episodeId: string): boolean {
    return (
      currentTrack?.id === episodeId &&
      currentTrack?.type === 'episode' &&
      isPlaying
    );
  }

  /**
   * エピソードを再生またはレジュームする
   *
   * 同じエピソードが一時停止中の場合はレジュームする。
   * 未完了の再生履歴がある場合は保存された位置から再開する。
   *
   * @param episode - 再生するエピソード
   */
  function playOrResume(episode: PlayableEpisode) {
    if (!episode.fullAudio) return;

    if (currentTrack?.id === episode.id && currentTrack?.type === 'episode') {
      resume();
      return;
    }

    const track: Track = {
      id: episode.id,
      type: 'episode',
      title: episode.title,
      subtitle: episode.channel.name,
      artworkUrl: episode.artwork?.url,
      audioUrl: episode.fullAudio.url,
      durationMs: episode.fullAudio.durationMs,
    };

    play(track);

    const progress = episode.playbackProgress;
    if (progress && progress.progressMs > 0) {
      const durationMs = episode.fullAudio.durationMs;
      const isNearEnd =
        durationMs > 0 &&
        durationMs - progress.progressMs < NEAR_END_THRESHOLD_MS;

      if (!progress.completed && !isNearEnd) {
        seek(progress.progressMs);
      }
    }
  }

  /**
   * 再生中のエピソードを一時停止する
   */
  function pauseEpisode() {
    pause();
  }

  return {
    isEpisodePlaying,
    playOrResume,
    pauseEpisode,
  };
}
