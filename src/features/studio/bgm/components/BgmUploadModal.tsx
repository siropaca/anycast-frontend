'use client';

import { MusicNoteIcon, PlusIcon } from '@phosphor-icons/react';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { useBgmUploadModal } from '@/features/studio/bgm/hooks/useBgmUploadModal';
import { confirmDiscard } from '@/utils/confirmDiscard';

export function BgmUploadModal() {
  const {
    open,
    setOpen,
    fileInputRef,
    bgmName,
    setBgmName,
    selectedFile,
    isUploading,
    uploadError,
    isDirty,
    reset,
    openFilePicker,
    selectFile,
    submit,
  } = useBgmUploadModal();

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      selectFile(file);
    }
  }

  return (
    <FormModal
      trigger={<Button leftIcon={<PlusIcon size={18} />}>新規追加</Button>}
      open={open}
      title="BGMをアップロード"
      submitLabel="アップロード"
      submitDisabled={!selectedFile}
      submitDisabledReason="ファイルを選択してください"
      isSubmitting={isUploading}
      onOpenChange={handleOpenChange}
      onSubmit={submit}
    >
      <div className="space-y-6">
        {/* ファイル */}
        <div className="space-y-2">
          <FormLabel htmlFor="bgm-file" required>
            ファイル
          </FormLabel>
          <input
            id="bgm-file"
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              color="secondary"
              leftIcon={<MusicNoteIcon size={16} />}
              disabled={isUploading}
              onClick={openFilePicker}
            >
              ファイルを選択
            </Button>
            {selectedFile && (
              <span className="text-sm text-text-subtle">
                {selectedFile.name}
              </span>
            )}
          </div>
        </div>

        {/* BGM名 */}
        <div className="space-y-2">
          <FormLabel
            htmlFor="bgm-name"
            description="省略時はファイル名になります"
          >
            BGM名
          </FormLabel>
          <Input
            id="bgm-name"
            value={bgmName}
            placeholder="BGM名を入力"
            disabled={isUploading}
            onChange={(e) => setBgmName(e.target.value)}
          />
        </div>

        {uploadError && (
          <p className="text-sm text-text-danger">{uploadError}</p>
        )}
      </div>
    </FormModal>
  );
}
