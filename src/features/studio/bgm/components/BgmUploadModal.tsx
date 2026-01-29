'use client';

import { MusicNoteIcon, PlusIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Input } from '@/components/inputs/Input/Input';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';

export function BgmUploadModal() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgmName, setBgmName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      setBgmName('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  function handleFileSelect() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  function handleUpload() {
    if (!selectedFile) return;

    uploadBgm(selectedFile, bgmName);
    setOpen(false);
  }

  return (
    <FormModal
      trigger={<Button leftIcon={<PlusIcon size={18} />}>新規追加</Button>}
      open={open}
      title="BGMをアップロード"
      submitLabel="アップロード"
      submitDisabled={!selectedFile}
      isSubmitting={isUploading}
      onOpenChange={handleOpenChange}
      onSubmit={handleUpload}
    >
      <div className="space-y-4">
        {/* ファイル */}
        <div className="space-y-2">
          <FormLabel htmlFor="bgm-file" required>ファイル</FormLabel>
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
              onClick={handleFileSelect}
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
          <label htmlFor="bgm-name" className="block text-sm leading-relaxed">
            BGM名 <br />
            <span className="text-text-subtle">
              省略時はファイル名になります
            </span>
          </label>
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
