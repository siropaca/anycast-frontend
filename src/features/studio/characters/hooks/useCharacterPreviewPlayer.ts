import { useRef, useState } from 'react';

/**
 * キャラクターのボイスサンプルをプレビュー再生するためのフック
 *
 * キャラクター ID で再生状態を管理するため、
 * 同じボイスを使うキャラクターでも再生ボタンが連動しない。
 *
 * @returns audio 要素の ref、再生状態、操作関数、イベントハンドラ
 */
export function useCharacterPreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingCharacterId, setPlayingCharacterId] = useState<string | null>(
    null,
  );
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
    setPlayingCharacterId(null);
  }

  /**
   * キャラクターのボイスサンプル再生/一時停止をトグルする
   *
   * @param characterId - キャラクター ID
   * @param sampleAudioUrl - ボイスのサンプル音声 URL
   */
  function toggle(characterId: string, sampleAudioUrl: string) {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingCharacterId === characterId) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      return;
    }

    audio.src = sampleAudioUrl;
    audio.play();
    setPlayingCharacterId(characterId);
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
    setPlayingCharacterId(null);
  }

  /**
   * 指定したキャラクターが再生中かどうかを判定する
   *
   * @param characterId - キャラクター ID
   * @returns 再生中なら true
   */
  function isCharacterPlaying(characterId: string): boolean {
    return playingCharacterId === characterId && isPlaying;
  }

  return {
    audioRef,
    isCharacterPlaying,
    toggle,
    stop,
    handlePlay,
    handlePause,
    handleEnded,
  };
}
