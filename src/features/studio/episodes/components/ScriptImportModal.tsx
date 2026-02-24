'use client';

import { DownloadSimpleIcon, QuestionIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';

import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Modal } from '@/components/utils/Modal/Modal';
import { useImportScript } from '@/features/studio/episodes/hooks/useImportScript';
import { cn } from '@/utils/cn';

interface Props {
  open: boolean;
  channelId: string;
  episodeId: string;

  onClose: () => void;
}

const ACCEPTED_EXTENSIONS = '.txt';

const FORMAT_EXAMPLE = `たかし: 今日のテーマは AI についてです
ゆうこ: 最近すごく進化してますよね
たかし: [laughing] ほんとにそうですね`;

export function ScriptImportModal({
  open,
  channelId,
  episodeId,
  onClose,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { isImporting, error, importFile, clearError } = useImportScript(
    channelId,
    episodeId,
  );

  function handleClose() {
    if (isImporting) return;
    resetState();
    onClose();
  }

  function resetState() {
    setIsDragOver(false);
    clearError();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function startImport(file: File) {
    clearError();
    importFile(file, {
      onSuccess: () => {
        resetState();
        onClose();
      },
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (selected) startImport(selected);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragOver(false);

    const dropped = event.dataTransfer.files[0];
    if (dropped) startImport(dropped);
  }

  return (
    <Modal.Root open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>台本をインポート</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-4">
          <p className="text-sm text-text-subtle">
            「話者名: テキスト」形式のテキストファイルを読み込みます
            <Tooltip
              label={
                <div>
                  <p className="mb-1 font-bold text-text-subtle">
                    フォーマット例
                  </p>
                  <pre className="whitespace-pre font-mono">
                    {FORMAT_EXAMPLE}
                  </pre>
                </div>
              }
            >
              <button
                type="button"
                className="ml-1 inline-flex cursor-help align-middle relative -top-px text-text-subtle hover:text-text-main"
                onClick={(e) => e.preventDefault()}
              >
                <QuestionIcon
                  size={20}
                  weight="fill"
                  aria-label="フォーマット例"
                />
              </button>
            </Tooltip>
          </p>

          <button
            type="button"
            disabled={isImporting}
            className={cn(
              'flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors',
              isImporting
                ? 'cursor-not-allowed border-border opacity-50'
                : isDragOver
                  ? 'cursor-pointer border-primary bg-primary/5'
                  : 'cursor-pointer border-border hover:border-primary',
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <DownloadSimpleIcon size={24} className="text-text-subtle" />
            <p className="text-sm text-text-subtle">
              ファイルをドラッグ&ドロップ、またはクリックして選択
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_EXTENSIONS}
              className="hidden"
              onChange={handleFileChange}
            />
          </button>

          {error && (
            <p className="whitespace-pre-line text-sm text-text-danger">
              {error}
            </p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            color="secondary"
            disabled={isImporting}
            onClick={handleClose}
          >
            閉じる
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
