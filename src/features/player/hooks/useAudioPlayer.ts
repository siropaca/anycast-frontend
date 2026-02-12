import { useEffect, useRef } from 'react';

import { usePlayerStore } from '@/stores/playerStore';

/**
 * HTML5 Audio API をラップし、PlayerStore と同期するカスタムフック
 *
 * BottomPlayer のトップレベルで1回だけ呼び出す
 * Audio インスタンスの生成・管理、Store の状態変更に応じた Audio 操作、
 * Audio イベントの監視と Store への状態同期を行う
 */
export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audioRef.current = audio;

    function handleTimeUpdate() {
      usePlayerStore.getState().setCurrentTime(audio.currentTime * 1000);
    }

    function handleLoadedMetadata() {
      usePlayerStore.getState().setDuration(audio.duration * 1000);
    }

    function handleEnded() {
      const { currentTrack } = usePlayerStore.getState();
      // voiceSample の場合は自動で次のトラックに進まない
      if (currentTrack?.type !== 'voiceSample') {
        usePlayerStore.getState().next();
      }
    }

    function handlePlay() {
      usePlayerStore.getState().setIsPlaying(true);
    }

    function handlePause() {
      usePlayerStore.getState().setIsPlaying(false);
    }

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    const unsubscribe = usePlayerStore.subscribe((state, prevState) => {
      // トラック変更の検知
      if (state.currentTrack?.id !== currentTrackIdRef.current) {
        if (state.currentTrack) {
          currentTrackIdRef.current = state.currentTrack.id;
          audio.src = state.currentTrack.audioUrl;
          audio.playbackRate = state.playbackRate;
          audio.play().catch(() => {
            usePlayerStore.getState().setIsPlaying(false);
          });
        } else {
          currentTrackIdRef.current = null;
          audio.pause();
          audio.removeAttribute('src');
          audio.load();
        }
      }

      // isPlaying 変更の検知（トラック変更時は上で処理済み）
      if (
        state.isPlaying !== prevState.isPlaying &&
        state.currentTrack?.id === prevState.currentTrack?.id
      ) {
        if (state.isPlaying) {
          audio.play().catch(() => {
            usePlayerStore.getState().setIsPlaying(false);
          });
        } else {
          audio.pause();
        }
      }

      // シーク検知
      if (
        state.currentTimeMs !== prevState.currentTimeMs &&
        state.currentTrack?.id === prevState.currentTrack?.id
      ) {
        const diff = Math.abs(audio.currentTime * 1000 - state.currentTimeMs);
        if (diff > 500) {
          audio.currentTime = state.currentTimeMs / 1000;
        }
      }

      // 音量変更の検知
      if (
        state.volume !== prevState.volume ||
        state.isMuted !== prevState.isMuted
      ) {
        audio.volume = state.isMuted ? 0 : state.volume;
      }

      // 再生速度変更の検知
      if (state.playbackRate !== prevState.playbackRate) {
        audio.playbackRate = state.playbackRate;
      }
    });

    // 初期値を設定
    const initialState = usePlayerStore.getState();
    audio.volume = initialState.isMuted ? 0 : initialState.volume;
    audio.playbackRate = initialState.playbackRate;

    return () => {
      unsubscribe();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audioRef.current = null;
    };
  }, []);
}
