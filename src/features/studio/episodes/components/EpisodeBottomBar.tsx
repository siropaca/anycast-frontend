'use client';

import { Menu } from '@base-ui/react/menu';
import { MusicNoteIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react';
import { createPortal } from 'react-dom';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { SplitButton } from '@/components/inputs/buttons/SplitButton/SplitButton';
import { ProgressRow } from '@/features/studio/episodes/components/ProgressRow';
import { useBottomBarPortal } from '@/features/studio/episodes/hooks/useBottomBarPortal';
import {
  getJobStatusLabel,
  shouldShowJobProgress,
} from '@/features/studio/episodes/utils/jobStatus';
import type { JobStatus } from '@/types/job';
import { formatDateTime, formatDuration } from '@/utils/date';

interface Props {
  isPlaying: boolean;
  hasAudio: boolean;
  hasVoiceAudio: boolean;
  audioOutdated: boolean;
  audioDurationMs?: number;
  audioGeneratedAt?: string;
  onPlay: () => void;
  onPause: () => void;

  scriptStatus: JobStatus;
  scriptProgress: number;
  scriptStartedAt?: number | null;
  isScriptGenerating: boolean;
  isScriptCancelable: boolean;
  isScriptCanceling: boolean;
  audioStatus: JobStatus;
  audioProgress: number;
  audioStartedAt?: number | null;
  isAudioGenerating: boolean;
  isAudioCancelable: boolean;
  isAudioCanceling: boolean;

  onScriptGenerate: () => void;
  onScriptCancel: () => void;
  onScriptReset: () => void;
  onAudioGenerate: () => void;
  onAudioRemix: () => void;
  onAudioCancel: () => void;
  onAudioReset: () => void;
}

export function EpisodeBottomBar({
  isPlaying,
  hasAudio,
  hasVoiceAudio,
  audioOutdated,
  audioDurationMs,
  audioGeneratedAt,
  onPlay,
  onPause,
  scriptStatus,
  scriptProgress,
  scriptStartedAt,
  isScriptGenerating,
  isScriptCancelable,
  isScriptCanceling,
  audioStatus,
  audioProgress,
  audioStartedAt,
  isAudioGenerating,
  isAudioCancelable,
  isAudioCanceling,
  onScriptGenerate,
  onScriptCancel,
  onScriptReset,
  onAudioGenerate,
  onAudioRemix,
  onAudioCancel,
  onAudioReset,
}: Props) {
  const portalContainer = useBottomBarPortal();

  const showScriptProgress = shouldShowJobProgress(
    isScriptGenerating,
    scriptStatus,
  );
  const showAudioProgress = shouldShowJobProgress(
    isAudioGenerating,
    audioStatus,
  );

  const remixMenuItem = hasVoiceAudio ? (
    <Menu.Item
      className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong"
      onClick={onAudioRemix}
    >
      <MusicNoteIcon size={16} />
      BGMを差し替えて再生成
    </Menu.Item>
  ) : (
    <Tooltip label="先に音声を生成してください">
      <span>
        <Menu.Item
          className="flex cursor-not-allowed items-center gap-2 rounded-md px-3 py-2 text-sm text-text-subtle outline-none"
          disabled
        >
          <MusicNoteIcon size={16} />
          BGMを差し替えて再生成
        </Menu.Item>
      </span>
    </Tooltip>
  );

  const content = (
    <div className="absolute bottom-0 left-0 right-0 z-(--z-sticky) rounded-b-md border-t border-border bg-bg-surface">
      {/* 進捗表示 */}
      {(showScriptProgress || showAudioProgress) && (
        <div className="border-b border-border px-4 py-3 sm:px-6">
          {showScriptProgress && (
            <ProgressRow
              label={getJobStatusLabel('script', scriptStatus)}
              progress={scriptProgress}
              startedAt={scriptStartedAt ?? undefined}
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
              label={getJobStatusLabel('audio', audioStatus)}
              progress={audioProgress}
              startedAt={audioStartedAt ?? undefined}
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
        <div className="flex items-center gap-3">
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
          {hasAudio && audioDurationMs != null && (
            <div className="flex flex-col text-xs text-text-subtle">
              <span>{formatDuration(audioDurationMs)}</span>
              {audioGeneratedAt && (
                <span>{formatDateTime(new Date(audioGeneratedAt))} 生成</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button disabled={isScriptGenerating} onClick={onScriptGenerate}>
            台本を生成
          </Button>
          <span className="relative">
            <SplitButton
              disabled={isAudioGenerating}
              menu={remixMenuItem}
              onClick={onAudioGenerate}
            >
              音声を生成
            </SplitButton>
            {audioOutdated && !isAudioGenerating && (
              <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-danger" />
            )}
          </span>
        </div>
      </div>
    </div>
  );

  if (!portalContainer) {
    return null;
  }

  return createPortal(content, portalContainer);
}
