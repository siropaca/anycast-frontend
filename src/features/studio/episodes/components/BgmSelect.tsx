'use client';

import { UploadSimpleIcon } from '@phosphor-icons/react';
import { useRef, useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Select } from '@/components/inputs/Select/Select';
import { useBgmOptions } from '@/features/studio/episodes/hooks/useBgmOptions';
import { useUploadBgm } from '@/features/studio/episodes/hooks/useUploadBgm';

interface Props {
  value: string | null;
  error?: boolean;

  onValueChange: (value: string | null) => void;
}

export function BgmSelect({ value, error, onValueChange }: Props) {
  const { userBgms, systemBgms } = useBgmOptions();
  const { uploadBgm, isUploading } = useUploadBgm();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bgmName, setBgmName] = useState('');

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadBgm(file, bgmName, {
      onSuccess: () => {
        setBgmName('');
      },
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  type BgmValue = string;

  const options: (
    | { label: string; value: BgmValue }
    | { label: string; options: { label: string; value: BgmValue }[] }
  )[] = [
    { label: 'BGMなし', value: 'none' },
    ...(userBgms.length > 0
      ? [
          {
            label: 'マイBGM',
            options: userBgms.map((bgm) => ({
              label: bgm.name,
              value: `user:${bgm.id}`,
            })),
          },
        ]
      : []),
    ...(systemBgms.length > 0
      ? [
          {
            label: 'システムBGM',
            options: systemBgms.map((bgm) => ({
              label: bgm.name,
              value: `system:${bgm.id}`,
            })),
          },
        ]
      : []),
  ];

  function handleSelectChange(newValue: string | null) {
    onValueChange(newValue === 'none' ? null : newValue);
  }

  return (
    <div className="space-y-3">
      <Select
        options={options}
        value={value ?? 'none'}
        onValueChange={handleSelectChange}
        placeholder="BGMを選択"
        error={error}
        className="w-full"
      />

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="BGM名（省略時はファイル名）"
          className="h-[var(--size-md)] flex-1 rounded-sm border border-border bg-bg-elevated px-3 text-sm text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary"
          value={bgmName}
          disabled={isUploading}
          onChange={(e) => setBgmName(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          color="secondary"
          size="sm"
          leftIcon={<UploadSimpleIcon size={14} />}
          loading={isUploading}
          onClick={handleUploadClick}
        >
          アップロード
        </Button>
      </div>
    </div>
  );
}
