'use client';

import { ImageIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import type { RefObject } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';

interface Props {
  previewUrl: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  error: string | undefined;

  onOpenFilePicker: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function HeaderImageField({
  previewUrl,
  fileInputRef,
  isUploading,
  error,
  onOpenFilePicker,
  onFileChange,
  onRemove,
}: Props) {
  return (
    <FormField label="ヘッダー画像" error={error}>
      {() => (
        <>
          <div className="relative h-32 w-full overflow-hidden rounded-md border border-border">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="ヘッダー"
                fill
                className="object-cover"
              />
            ) : (
              <button
                type="button"
                className="flex h-full w-full cursor-pointer items-center justify-center bg-bg-hover text-text-placeholder transition-colors hover:bg-bg-hover-strong"
                disabled={isUploading}
                onClick={onOpenFilePicker}
              >
                <ImageIcon size={32} />
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              color="secondary"
              disabled={isUploading}
              onClick={onOpenFilePicker}
            >
              {isUploading
                ? 'アップロード中...'
                : previewUrl
                  ? '画像を変更'
                  : '画像を選択'}
            </Button>
            {previewUrl && (
              <Button
                variant="outline"
                color="secondary"
                disabled={isUploading}
                onClick={onRemove}
              >
                削除
              </Button>
            )}
          </div>
        </>
      )}
    </FormField>
  );
}
