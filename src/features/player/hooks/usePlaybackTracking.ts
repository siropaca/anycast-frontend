import { useEffect, useRef } from 'react';

import {
  postEpisodesEpisodeIdPlay,
  putEpisodesEpisodeIdPlayback,
} from '@/libs/api/generated/episodes/episodes';
import { usePlayerStore } from '@/stores/playerStore';

const INTERVAL_MS = 30_000;
const PLAY_COUNT_DELAY_MS = 30_000;
/** 再生完了とみなす残り時間のしきい値（ミリ秒） */
const COMPLETED_THRESHOLD_MS = 1_000;

/**
 * エピソード再生中の進捗をサーバーに記録するカスタムフック
 *
 * BottomPlayer のトップレベルで useAudioPlayer と並べて1回だけ呼び出す。
 * PlayerStore の状態変更を監視し、episode タイプのトラックのみを対象に
 * 再生開始・30秒ごと・一時停止・トラック変更時に API を呼ぶ。
 */
export function usePlaybackTracking() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playCountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playCountSentRef = useRef<string | null>(null);
  const prevTrackIdRef = useRef<string | null>(null);
  const prevIsPlayingRef = useRef(false);

  useEffect(() => {
    /**
     * 再生進捗を API に送信する
     *
     * @param episodeId - エピソード ID
     * @param progressMs - 再生位置（ミリ秒）
     * @param completed - 再生完了フラグ
     */
    function sendProgress(
      episodeId: string,
      progressMs: number,
      completed: boolean,
    ) {
      putEpisodesEpisodeIdPlayback(episodeId, {
        progressMs: Math.round(progressMs),
        completed,
      }).catch((error: unknown) => {
        console.warn('[PlaybackTracking] Failed to send progress:', error);
      });
    }

    /** 30秒インターバルを開始する */
    function startInterval() {
      stopInterval();
      intervalRef.current = setInterval(() => {
        const { currentTrack, currentTimeMs } = usePlayerStore.getState();
        if (currentTrack?.type === 'episode') {
          sendProgress(currentTrack.id, currentTimeMs, false);
        }
      }, INTERVAL_MS);
    }

    /** 30秒インターバルを停止する */
    function stopInterval() {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    /**
     * 再生回数カウント用の30秒タイマーを開始する
     *
     * 新しいエピソードの再生が開始されたときに呼び出し、
     * 30秒間連続再生された時点で再生回数をインクリメントする。
     *
     * @param episodeId - エピソード ID
     */
    function startPlayCountTimer(episodeId: string) {
      cancelPlayCountTimer();
      playCountTimerRef.current = setTimeout(() => {
        postEpisodesEpisodeIdPlay(episodeId).catch((error: unknown) => {
          console.warn('[PlaybackTracking] Failed to send play count:', error);
        });
        playCountSentRef.current = episodeId;
        playCountTimerRef.current = null;
      }, PLAY_COUNT_DELAY_MS);
    }

    /** 再生回数カウント用タイマーをキャンセルする */
    function cancelPlayCountTimer() {
      if (playCountTimerRef.current !== null) {
        clearTimeout(playCountTimerRef.current);
        playCountTimerRef.current = null;
      }
    }

    const unsubscribe = usePlayerStore.subscribe((state, prevState) => {
      const currentTrack = state.currentTrack;
      const prevTrack = prevState.currentTrack;
      const trackChanged = currentTrack?.id !== prevTrack?.id;

      // トラック変更時: 前のエピソードの最終進捗を送信
      if (trackChanged && prevTrack?.type === 'episode') {
        const completed =
          prevState.durationMs - prevState.currentTimeMs <
          COMPLETED_THRESHOLD_MS;
        sendProgress(prevTrack.id, prevState.currentTimeMs, completed);
        stopInterval();
        cancelPlayCountTimer();
      }

      // 現在のトラックが episode でない場合は何もしない
      if (currentTrack?.type !== 'episode') {
        if (trackChanged) {
          stopInterval();
          cancelPlayCountTimer();
          prevTrackIdRef.current = currentTrack?.id ?? null;
          prevIsPlayingRef.current = state.isPlaying;
        }
        return;
      }

      // 再生開始（トラック変更 or 一時停止→再開）
      if (state.isPlaying && (!prevState.isPlaying || trackChanged)) {
        sendProgress(currentTrack.id, state.currentTimeMs, false);
        startInterval();

        // 新しいエピソードの再生開始時のみ再生回数タイマーを開始
        if (trackChanged && playCountSentRef.current !== currentTrack.id) {
          startPlayCountTimer(currentTrack.id);
        }
      }

      // 一時停止
      if (!state.isPlaying && prevState.isPlaying && !trackChanged) {
        stopInterval();
        cancelPlayCountTimer();
        sendProgress(currentTrack.id, state.currentTimeMs, false);
      }

      prevTrackIdRef.current = currentTrack?.id ?? null;
      prevIsPlayingRef.current = state.isPlaying;
    });

    return () => {
      unsubscribe();
      stopInterval();
      cancelPlayCountTimer();
    };
  }, []);
}
