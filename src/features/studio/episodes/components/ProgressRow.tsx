'use client';

import { XIcon } from '@phosphor-icons/react';

import { useElapsedTime } from '@/hooks/useElapsedTime';
import { formatElapsedTime } from '@/utils/date';

interface Props {
  label: string;
  progress: number;
  startedAt?: number;
  isGenerating: boolean;
  isCancelable: boolean;
  isCanceling: boolean;
  isTerminal: boolean;

  onCancel: () => void;
  onReset: () => void;
}

export function ProgressRow({
  label,
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

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-main">{label}</span>
        <div className="flex items-center gap-2">
          {isGenerating && (
            <span className="text-sm tabular-nums text-text-subtle">
              {elapsedMs != null && (
                <span className="mr-1.5">{formatElapsedTime(elapsedMs)}</span>
              )}
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
