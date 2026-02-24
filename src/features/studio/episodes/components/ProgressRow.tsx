'use client';

import { XIcon } from '@phosphor-icons/react';

import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { useElapsedTime } from '@/hooks/useElapsedTime';
import { formatElapsedTime } from '@/utils/date';

interface Props {
  type: 'script' | 'audio';
  statusLabel: string;
  progress: number;
  startedAt?: number;
  isGenerating: boolean;
  isCancelable: boolean;
  isCanceling: boolean;
  isTerminal: boolean;

  onCancel: () => void;
  onReset: () => void;
}

const typeLabel: Record<Props['type'], string> = {
  script: '台本',
  audio: '音声',
};

export function ProgressRow({
  type,
  statusLabel,
  progress,
  startedAt,
  isGenerating,
  isCancelable,
  isCanceling,
  isTerminal,
  onCancel,
  onReset,
}: Props) {
  const elapsedMs = useElapsedTime(isGenerating ? (startedAt ?? null) : null);

  const prefix = typeLabel[type];
  const displayLabel = isGenerating
    ? `${prefix}生成中...`
    : `${prefix}の${statusLabel}`;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isGenerating && <Spinner size="md" />}

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <Tooltip label={`${progress}%: ${statusLabel}`}>
              <span className="text-sm text-text-main">{displayLabel}</span>
            </Tooltip>

            {isGenerating && elapsedMs != null && (
              <span className="text-sm tabular-nums text-text-subtle">
                {formatElapsedTime(elapsedMs)}
              </span>
            )}
          </div>

          {isGenerating && (
            <span className="text-xs text-text-subtle">
              処理には数分〜数十分かかる場合があります
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isCancelable && (
          <Button
            size="sm"
            variant="outline"
            color="danger"
            disabled={isCanceling}
            onClick={onCancel}
          >
            キャンセル
          </Button>
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
  );
}
