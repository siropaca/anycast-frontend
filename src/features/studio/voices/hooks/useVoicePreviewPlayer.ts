import { useRef, useState } from 'react';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';

/**
 * ボイスのサンプル音声をプレビュー再生するためのフック
 *
 * 独立した audio 要素で再生を管理する。
 * コンポーネントのアンマウント時に自動的に再生が停止される。
 *
 * @returns audio 要素の ref、再生状態、操作関数、イベントハンドラ
 */
export function useVoicePreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  /** audio 要素の onPlay ハンドラ */
  function handlePlay() {
    setIsPlaying(true);
  }

  /** audio 要素の onPause ハンドラ */
  function handlePause() {
    setIsPlaying(false);
  }

  /** audio 要素の onEnded ハンドラ */
  function handleEnded() {
    setIsPlaying(false);
    setPlayingVoiceId(null);
  }

  /**
   * ボイスのサンプル音声の再生/一時停止をトグルする
   *
   * @param voice - 対象のボイス
   */
  function toggle(voice: ResponseVoiceResponse) {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingVoiceId === voice.id) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      return;
    }

    audio.src = voice.sampleAudioUrl;
    audio.play();
    setPlayingVoiceId(voice.id);
  }

  /**
   * 再生を停止してリセットする
   */
  function stop() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setPlayingVoiceId(null);
  }

  /**
   * 指定したボイスが再生中かどうかを判定する
   *
   * @param voiceId - ボイスの ID
   * @returns 再生中なら true
   */
  function isVoicePlaying(voiceId: string): boolean {
    return playingVoiceId === voiceId && isPlaying;
  }

  return {
    audioRef,
    isVoicePlaying,
    toggle,
    stop,
    handlePlay,
    handlePause,
    handleEnded,
  };
}
