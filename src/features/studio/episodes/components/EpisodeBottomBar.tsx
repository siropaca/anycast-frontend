'use client';

import {
  MicrophoneIcon,
  PauseIcon,
  PlayIcon,
  ScrollIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import type { JobStatus } from '@/types/job';

interface Props {
  isPlaying: boolean;
  hasAudio: boolean;
  onPlay: () => void;
  onPause: () => void;

  scriptStatus: JobStatus;
  scriptProgress: number;
  isScriptGenerating: boolean;
  isScriptCancelable: boolean;
  isScriptCanceling: boolean;
  audioStatus: JobStatus;
  audioProgress: number;
  isAudioGenerating: boolean;
  isAudioCancelable: boolean;
  isAudioCanceling: boolean;

  onScriptGenerate: () => void;
  onScriptCancel: () => void;
  onScriptReset: () => void;
  onAudioGenerate: () => void;
  onAudioCancel: () => void;
  onAudioReset: () => void;
}

/**
 * ジョブのステータスラベルを返す
 *
 * @param type - ジョブの種類
 * @param status - ジョブのステータス
 * @returns ステータスラベル
 */
function getStatusLabel(type: 'script' | 'audio', status: JobStatus): string {
  const prefix = type === 'script' ? '台本' : '音声';

  switch (status) {
    case 'pending':
      return `${prefix}: キュー待機中...`;
    case 'processing':
      return `${prefix}: 生成中...`;
    case 'canceling':
      return `${prefix}: キャンセル中...`;
    case 'completed':
      return `${prefix}: 生成完了`;
    case 'canceled':
      return `${prefix}: キャンセル済み`;
    case 'failed':
      return `${prefix}: 生成失敗`;
    default:
      return '';
  }
}

export function EpisodeBottomBar({
  isPlaying,
  hasAudio,
  onPlay,
  onPause,
  scriptStatus,
  scriptProgress,
  isScriptGenerating,
  isScriptCancelable,
  isScriptCanceling,
  audioStatus,
  audioProgress,
  isAudioGenerating,
  isAudioCancelable,
  isAudioCanceling,
  onScriptGenerate,
  onScriptCancel,
  onScriptReset,
  onAudioGenerate,
  onAudioCancel,
  onAudioReset,
}: Props) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    const viewport = document.getElementById(MAIN_SCROLL_VIEWPORT_ID);
    setPortalContainer(viewport?.parentElement ?? null);

    // Viewport にボトムバー分の padding-bottom を追加して
    // フッター（利用規約等）がバーの裏に隠れるのを防ぐ
    if (viewport) {
      viewport.style.paddingBottom = '5rem';
    }

    return () => {
      if (viewport) {
        viewport.style.paddingBottom = '';
      }
    };
  }, []);

  const showScriptProgress =
    isScriptGenerating ||
    scriptStatus === 'completed' ||
    scriptStatus === 'canceled' ||
    scriptStatus === 'failed';

  const showAudioProgress =
    isAudioGenerating ||
    audioStatus === 'completed' ||
    audioStatus === 'canceled' ||
    audioStatus === 'failed';

  const content = (
    <div className="absolute bottom-0 left-0 right-0 z-(--z-sticky) rounded-b-md border-t border-border bg-bg-surface">
      {/* 進捗表示 */}
      {(showScriptProgress || showAudioProgress) && (
        <div className="border-b border-border px-4 py-3 sm:px-6">
          {showScriptProgress && (
            <ProgressRow
              label={getStatusLabel('script', scriptStatus)}
              progress={scriptProgress}
              isGenerating={isScriptGenerating}
              isCancelable={isScriptCancelable}
              isCanceling={isScriptCanceling}
              isTerminal={
                scriptStatus === 'completed' ||
                scriptStatus === 'canceled' ||
                scriptStatus === 'failed'
              }
              onCancel={onScriptCancel}
              onReset={onScriptReset}
            />
          )}

          {showAudioProgress && (
            <ProgressRow
              label={getStatusLabel('audio', audioStatus)}
              progress={audioProgress}
              isGenerating={isAudioGenerating}
              isCancelable={isAudioCancelable}
              isCanceling={isAudioCanceling}
              isTerminal={
                audioStatus === 'completed' ||
                audioStatus === 'canceled' ||
                audioStatus === 'failed'
              }
              onCancel={onAudioCancel}
              onReset={onAudioReset}
            />
          )}
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <IconButton
          icon={
            isPlaying ? (
              <PauseIcon size={20} weight="fill" />
            ) : (
              <PlayIcon size={20} weight="fill" />
            )
          }
          aria-label={isPlaying ? '一時停止' : '再生'}
          size="lg"
          color="primary"
          disabled={!hasAudio}
          disabledReason="音声が生成されていません"
          onClick={isPlaying ? onPause : onPlay}
        />
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<ScrollIcon size={16} />}
            disabled={isScriptGenerating}
            onClick={onScriptGenerate}
          >
            台本を作成
          </Button>
          <Button
            leftIcon={<MicrophoneIcon size={16} />}
            disabled={isAudioGenerating}
            onClick={onAudioGenerate}
          >
            音声を生成
          </Button>
        </div>
      </div>
    </div>
  );

  if (!portalContainer) return null;

  return createPortal(content, portalContainer);
}

interface ProgressRowProps {
  label: string;
  progress: number;
  isGenerating: boolean;
  isCancelable: boolean;
  isCanceling: boolean;
  isTerminal: boolean;

  onCancel: () => void;
  onReset: () => void;
}

function ProgressRow({
  label,
  progress,
  isGenerating,
  isCancelable,
  isCanceling,
  isTerminal,
  onCancel,
  onReset,
}: ProgressRowProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-main">{label}</span>
        <div className="flex items-center gap-2">
          {isGenerating && (
            <span className="text-sm tabular-nums text-text-subtle">
              {progress}%
            </span>
          )}
          {isCancelable && (
            <button
              type="button"
              className="text-sm text-text-danger hover:underline"
              disabled={isCanceling}
              onClick={onCancel}
            >
              キャンセル
            </button>
          )}
          {isTerminal && (
            <button
              type="button"
              className="text-text-subtle transition-colors hover:text-text-main"
              onClick={onReset}
              aria-label="閉じる"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>
      </div>

      {isGenerating && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
