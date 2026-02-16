'use client';

import { SparkleIcon, UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import type { RefObject } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { ArtworkGenerateModal } from '@/components/utils/Modal/ArtworkGenerateModal';
import type { CharacterFormInput } from '@/features/studio/characters/schemas/character';
import { VoiceSelect } from '@/features/studio/voices/components/VoiceSelect';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';

interface Props {
  previewUrl: string | undefined;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  isGenerating: boolean;
  uploadError: string | undefined;
  generateError: string | undefined;
  generateModalOpen: boolean;
  generateModalDefaultPrompt: string;

  register: UseFormRegister<CharacterFormInput>;
  control: Control<CharacterFormInput>;
  errors: FieldErrors<CharacterFormInput>;
  watch: UseFormWatch<CharacterFormInput>;

  voices: ResponseVoiceResponse[];
  disabled: boolean;
  error: string | undefined;

  onOpenFilePicker: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  onOpenGenerateModal: () => void;
  onCloseGenerateModal: () => void;
  onSubmitGenerate: (prompt: string) => void;
}

export function CharacterFormFields({
  previewUrl,
  fileInputRef,
  isUploading,
  isGenerating,
  uploadError,
  generateError,
  generateModalOpen,
  generateModalDefaultPrompt,
  register,
  control,
  errors,
  watch,
  voices,
  disabled,
  error,
  onOpenFilePicker,
  onFileChange,
  onRemove,
  onOpenGenerateModal,
  onCloseGenerateModal,
  onSubmitGenerate,
}: Props) {
  return (
    <>
      <div className="space-y-6">
        {/* アバター画像 */}
        <FormField label="アバター画像" error={uploadError ?? generateError}>
          {() => (
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="shrink-0 cursor-pointer"
                disabled={isUploading}
                onClick={onOpenFilePicker}
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="アバター"
                    width={80}
                    height={80}
                    className="size-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-20 items-center justify-center rounded-full bg-bg-hover text-text-placeholder transition-colors hover:bg-bg-hover-strong">
                    <UserIcon size={32} />
                  </div>
                )}
              </button>

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
                  disabled={isUploading || isGenerating}
                  onClick={onOpenFilePicker}
                >
                  {isUploading
                    ? 'アップロード中...'
                    : previewUrl
                      ? '画像を変更'
                      : '画像を選択'}
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
                    variant="outline"
                    color="secondary"
                    disabled={isUploading || isGenerating}
                    onClick={onRemove}
                  >
                    削除
                  </Button>
                )}
              </div>
            </div>
          )}
        </FormField>

        {/* 名前 */}
        <FormField label="名前" required error={errors.name?.message}>
          {({ id, hasError }) => (
            <Input
              id={id}
              placeholder="キャラクター名を入力"
              maxLength={255}
              disabled={disabled}
              error={hasError}
              {...register('name')}
            />
          )}
        </FormField>

        {/* ボイス */}
        <FormField label="ボイス" required error={errors.voiceId?.message}>
          {({ hasError }) => (
            <Controller
              name="voiceId"
              control={control}
              render={({ field }) => (
                <VoiceSelect
                  voices={voices}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? '')}
                  placeholder="ボイスを選択"
                  error={hasError}
                  disabled={disabled}
                />
              )}
            />
          )}
        </FormField>

        {/* 特徴 */}
        <FormField
          label="特徴"
          helpText="台本作成時にこの特徴が考慮されます"
          error={errors.persona?.message}
        >
          {({ id, hasError }) => (
            <Textarea
              id={id}
              placeholder="例: 明るくポジティブな性格。語尾に「〜だよ」をつける"
              rows={6}
              maxLength={2000}
              showCounter
              disabled={disabled}
              error={hasError}
              value={watch('persona')}
              {...register('persona')}
            />
          )}
        </FormField>

        {error && <HelperText error>{error}</HelperText>}
      </div>

      <ArtworkGenerateModal
        open={generateModalOpen}
        defaultPrompt={generateModalDefaultPrompt}
        onClose={onCloseGenerateModal}
        onSubmit={onSubmitGenerate}
      />
    </>
  );
}
