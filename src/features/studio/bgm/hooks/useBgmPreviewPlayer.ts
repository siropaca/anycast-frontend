import { useRef, useState } from 'react';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';

/**
 * モーダル内で BGM をプレビュー再生するためのフック
 *
 * ボトムプレイヤーを使わず、独立した audio 要素で再生を管理する。
 * コンポーネントのアンマウント時に自動的に再生が停止される。
 *
 * @returns audio 要素の ref、再生状態、操作関数、イベントハンドラ
 */
export function useBgmPreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playingBgmId, setPlayingBgmId] = useState<string | null>(null);
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
    setPlayingBgmId(null);
  }

  /**
   * BGM の再生/一時停止をトグルする
   *
   * @param bgm - 対象の BGM
   */
  function toggle(bgm: ResponseBgmWithEpisodesResponse) {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingBgmId === bgm.id) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      return;
    }

    audio.src = bgm.audio.url;
    audio.play();
    setPlayingBgmId(bgm.id);
  }

  /**
   * 指定した BGM が再生中かどうかを判定する
   *
   * @param bgmId - BGM の ID
   * @returns 再生中なら true
   */
  function isBgmPlaying(bgmId: string): boolean {
    return playingBgmId === bgmId && isPlaying;
  }

  return {
    audioRef,
    isBgmPlaying,
    toggle,
    handlePlay,
    handlePause,
    handleEnded,
  };
}
