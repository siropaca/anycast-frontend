'use client';

import { Menu } from '@base-ui/react/menu';
import {
  DotsThreeIcon,
  DownloadSimpleIcon,
  MusicNoteIcon,
  PauseIcon,
  PlayIcon,
  SpeakerHighIcon,
  TextAlignLeftIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { createPortal } from 'react-dom';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { SplitButton } from '@/components/inputs/buttons/SplitButton/SplitButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { ProgressRow } from '@/features/studio/episodes/components/ProgressRow';
import { useBottomBarPortal } from '@/features/studio/episodes/hooks/useBottomBarPortal';
import {
  getJobStatusLabel,
  shouldShowJobProgress,
} from '@/features/studio/episodes/utils/jobStatus';
import type { JobStatus } from '@/types/job';
import { formatDateTime, formatTime } from '@/utils/date';

interface Props {
  isPlaying: boolean;
  hasAudio: boolean;
  hasVoiceAudio: boolean;
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
  onAudioDelete: () => void;
  onAudioUpload: () => void;
}

export function EpisodeBottomBar({
  isPlaying,
  hasAudio,
  hasVoiceAudio,
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
  onAudioDelete,
  onAudioUpload,
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
        <div className="space-y-4 border-b border-border px-4 py-3 sm:px-6">
          {showScriptProgress && (
            <ProgressRow
              type="script"
              statusLabel={getJobStatusLabel(scriptStatus)}
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
              type="audio"
              statusLabel={getJobStatusLabel(audioStatus)}
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
        <div className="flex min-w-0 items-center gap-3">
          <IconButton
            className="shrink-0"
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
            <div className="flex min-w-0 flex-col text-xs text-text-subtle">
              <span className="truncate">{formatTime(audioDurationMs)}</span>
              {audioGeneratedAt && (
                <span className="truncate">
                  {formatDateTime(new Date(audioGeneratedAt))} 生成
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="hidden sm:inline-flex"
            disabled={isScriptGenerating}
            onClick={onScriptGenerate}
          >
            台本を生成
          </Button>

          <SplitButton
            className="hidden sm:inline-flex"
            disabled={isScriptGenerating || isAudioGenerating}
            menu={remixMenuItem}
            onClick={onAudioGenerate}
          >
            音声を生成
          </SplitButton>

          <DropdownMenu
            trigger={
              <IconButton
                icon={<DotsThreeIcon size={22} weight="bold" />}
                aria-label="音声メニュー"
                color="secondary"
                variant="text"
              />
            }
            side="top"
          >
            <div className="sm:hidden">
              <DropdownMenuItem
                icon={<TextAlignLeftIcon size={16} />}
                disabled={isScriptGenerating}
                onClick={onScriptGenerate}
              >
                台本を生成
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<SpeakerHighIcon size={16} />}
                disabled={isScriptGenerating || isAudioGenerating}
                onClick={onAudioGenerate}
              >
                音声を生成
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<MusicNoteIcon size={16} />}
                disabled={!hasVoiceAudio}
                onClick={onAudioRemix}
              >
                BGMを差し替えて再生成
              </DropdownMenuItem>
            </div>
            <DropdownMenuItem
              icon={<DownloadSimpleIcon size={16} />}
              onClick={onAudioUpload}
            >
              音声インポート
            </DropdownMenuItem>
            <DropdownMenuItem
              icon={<TrashIcon size={16} />}
              variant="danger"
              disabled={!hasVoiceAudio}
              onClick={onAudioDelete}
            >
              音声を削除
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  if (!portalContainer) {
    return null;
  }

  return createPortal(content, portalContainer);
}
