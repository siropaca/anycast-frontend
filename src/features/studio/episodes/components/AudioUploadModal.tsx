'use client';

import { DownloadSimpleIcon, QuestionIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';

import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Modal } from '@/components/utils/Modal/Modal';
import { useUploadEpisodeAudio } from '@/features/studio/episodes/hooks/useUploadEpisodeAudio';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/utils/cn';

interface Props {
  open: boolean;
  channelId: string;
  episodeId: string;

  onClose: () => void;
}

const ACCEPTED_EXTENSIONS = '.mp3,.wav,.ogg,.aac,.m4a';

export function AudioUploadModal({
  open,
  channelId,
  episodeId,
  onClose,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const toast = useToast();
  const { isUploading, error, uploadFile, clearError } =
    useUploadEpisodeAudio(channelId, episodeId);

  function handleClose() {
    if (isUploading) return;
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

  function startUpload(file: File) {
    clearError();
    uploadFile(file, {
      onSuccess: () => {
        resetState();
        onClose();
        toast.success({ title: '音声をインポートしました' });
      },
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (selected) startUpload(selected);
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
    if (dropped) startUpload(dropped);
  }

  return (
    <Modal.Root open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>音声をインポート</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-4">
          <p className="text-sm text-text-subtle">
            音声ファイルをインポートします
            <Tooltip label="対応形式: mp3, wav, ogg, aac, m4a（最大 50MB）">
              <button
                type="button"
                className="ml-1 inline-flex cursor-help align-middle relative -top-px text-text-subtle hover:text-text-main"
                onClick={(e) => e.preventDefault()}
              >
                <QuestionIcon
                  size={20}
                  weight="fill"
                  aria-label="対応形式"
                />
              </button>
            </Tooltip>
          </p>

          <button
            type="button"
            disabled={isUploading}
            className={cn(
              'flex min-h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors',
              isUploading
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
            disabled={isUploading}
            onClick={handleClose}
          >
            閉じる
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
