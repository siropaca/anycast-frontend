import { useRef, useState } from 'react';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';

/**
 * BGM アップロードモーダルの状態を管理するフック
 *
 * @returns モーダルの状態とフォームの値
 */
export function useBgmUploadModal() {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgmName, setBgmName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadBgm, isUploading, error: uploadError } = useUploadBgm();

  function reset() {
    setBgmName('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function selectFile(file: File) {
    setSelectedFile(file);
  }

  function submit() {
    if (!selectedFile) return;
    uploadBgm(selectedFile, bgmName, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  }

  const isDirty = selectedFile !== null || bgmName !== '';

  return {
    open,
    fileInputRef,
    bgmName,
    selectedFile,
    isUploading,
    uploadError,
    isDirty,

    setOpen,
    setBgmName,
    reset,
    openFilePicker,
    selectFile,
    submit,
  };
}
