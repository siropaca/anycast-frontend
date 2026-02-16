'use client';

import { SparkleIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import type { RefObject } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { ArtworkGenerateModal } from '@/components/utils/Modal/ArtworkGenerateModal';

interface Props {
  previewUrl: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  isGenerating: boolean;
  uploadError: string | undefined;
  generateError: string | undefined;
  generateModalOpen: boolean;
  generateModalDefaultPrompt: string;

  onOpenFilePicker: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onOpenGenerateModal: () => void;
  onCloseGenerateModal: () => void;
  onSubmitGenerate: (prompt: string) => void;
}

export function ArtworkImageField({
  previewUrl,
  fileInputRef,
  isUploading,
  isGenerating,
  uploadError,
  generateError,
  generateModalOpen,
  generateModalDefaultPrompt,
  onOpenFilePicker,
  onFileChange,
  onRemove,
  onOpenGenerateModal,
  onCloseGenerateModal,
  onSubmitGenerate,
}: Props) {
  return (
    <>
      <FormField label="アートワーク" error={uploadError ?? generateError}>
        {() => (
          <>
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="アートワーク"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                color="secondary"
                loading={isUploading}
                disabled={isGenerating}
                onClick={onOpenFilePicker}
              >
                {previewUrl ? '画像を変更' : '画像を選択'}
              </Button>

              <Button
                type="button"
                variant="outline"
                color="secondary"
                leftIcon={<SparkleIcon />}
                loading={isGenerating}
                disabled={isUploading}
                onClick={onOpenGenerateModal}
              >
                AIで生成
              </Button>

              {previewUrl && (
                <Button
                  type="button"
                  variant="outline"
                  color="secondary"
                  disabled={isUploading || isGenerating}
                  onClick={onRemove}
                >
                  削除
                </Button>
              )}
            </div>
          </>
        )}
      </FormField>

      <ArtworkGenerateModal
        open={generateModalOpen}
        defaultPrompt={generateModalDefaultPrompt}
        onClose={onCloseGenerateModal}
        onSubmit={onSubmitGenerate}
      />
    </>
  );
}
