'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { useCreateCharacter } from '@/features/studio/characters/hooks/useCreateCharacter';
import {
  type CharacterFormInput,
  characterFormSchema,
} from '@/features/studio/characters/schemas/character';
import { VoiceSelect } from '@/features/studio/voices/components/VoiceSelect';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';
import { confirmDiscard } from '@/utils/confirmDiscard';

export function CharacterCreateModal() {
  const {
    voices,
    isCreating,
    error: createError,
    createCharacter,
  } = useCreateCharacter();
  const {
    uploadArtwork,
    isUploading: isArtworkUploading,
    error: artworkUploadError,
  } = useUploadArtwork();

  const [open, setOpen] = useState(false);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<CharacterFormInput>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: {
      name: '',
      voiceId: '',
      persona: '',
    },
  });

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    setOpen(isOpen);
    if (!isOpen) {
      reset();
      setAvatarPreviewUrl(undefined);
    }
  }

  function handleAvatarButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadArtwork(file, ({ id, url }) => {
      setValue('avatarImageId', id, { shouldDirty: true });
      setAvatarPreviewUrl(url);
    });
  }

  function handleAvatarRemove() {
    setValue('avatarImageId', undefined, { shouldDirty: true });
    setAvatarPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleFormSubmit(data: CharacterFormInput) {
    createCharacter(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
        setAvatarPreviewUrl(undefined);
      },
    });
  }

  return (
    <FormModal
      trigger={<Button leftIcon={<PlusIcon size={18} />}>新規追加</Button>}
      open={open}
      title="キャラクターを作成"
      size="lg"
      submitDisabled={isCreating || isArtworkUploading}
      submitDisabledReason={
        isArtworkUploading ? '画像アップロード中...' : undefined
      }
      isSubmitting={isCreating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="space-y-6">
        {/* アバター画像 */}
        <FormField label="アバター画像" error={artworkUploadError}>
          {() => (
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="shrink-0 cursor-pointer"
                disabled={isArtworkUploading}
                onClick={handleAvatarButtonClick}
              >
                {avatarPreviewUrl ? (
                  <Image
                    src={avatarPreviewUrl}
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
                onChange={handleFileChange}
              />

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  color="secondary"
                  disabled={isArtworkUploading}
                  onClick={handleAvatarButtonClick}
                >
                  {isArtworkUploading
                    ? 'アップロード中...'
                    : avatarPreviewUrl
                      ? '画像を変更'
                      : '画像を選択'}
                </Button>

                {avatarPreviewUrl && (
                  <Button
                    variant="outline"
                    color="secondary"
                    disabled={isArtworkUploading}
                    onClick={handleAvatarRemove}
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
              disabled={isCreating}
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
                  disabled={isCreating}
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
              disabled={isCreating}
              error={hasError}
              value={watch('persona')}
              {...register('persona')}
            />
          )}
        </FormField>

        {createError && <HelperText error>{createError}</HelperText>}
      </div>
    </FormModal>
  );
}
