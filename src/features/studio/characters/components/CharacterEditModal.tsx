'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { useUpdateCharacter } from '@/features/studio/characters/hooks/useUpdateCharacter';
import {
  type CharacterFormInput,
  characterFormSchema,
} from '@/features/studio/characters/schemas/character';
import { VoiceSelect } from '@/features/studio/voices/components/VoiceSelect';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';
import type {
  ResponseCharacterWithChannelsResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { confirmDiscard } from '@/utils/confirmDiscard';

interface Props {
  character: ResponseCharacterWithChannelsResponse | null;
  voices: ResponseVoiceResponse[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterEditModal({
  character,
  voices,
  open,
  onOpenChange,
}: Props) {
  const {
    isUpdating,
    error: updateError,
    updateCharacter,
  } = useUpdateCharacter();
  const {
    uploadArtwork,
    isUploading: isArtworkUploading,
    error: artworkUploadError,
  } = useUploadArtwork();

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

  useEffect(() => {
    if (character) {
      reset({
        name: character.name,
        voiceId: character.voice.id,
        persona: character.persona || '',
        avatarImageId: character.avatar?.id,
      });
      setAvatarPreviewUrl(character.avatar?.url);
    }
  }, [character, reset]);

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    onOpenChange(isOpen);
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

  async function handleFormSubmit(data: CharacterFormInput) {
    if (!character) return;

    const success = await updateCharacter(character.id, data);
    if (success) {
      onOpenChange(false);
    }
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={open}
      title="キャラクターを編集"
      size="lg"
      submitLabel="保存"
      submitDisabled={!isDirty || isUpdating || isArtworkUploading}
      submitDisabledReason={
        isArtworkUploading ? '画像アップロード中...' : '変更がありません'
      }
      isSubmitting={isUpdating}
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
              disabled={isUpdating}
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
                  disabled={isUpdating}
                />
              )}
            />
          )}
        </FormField>

        {/* ペルソナ */}
        <FormField label="ペルソナ" error={errors.persona?.message}>
          {({ id, hasError }) => (
            <Textarea
              id={id}
              placeholder="キャラクターの性格や特徴を入力"
              rows={6}
              maxLength={2000}
              showCounter
              disabled={isUpdating}
              error={hasError}
              value={watch('persona')}
              {...register('persona')}
            />
          )}
        </FormField>

        {updateError && <HelperText error>{updateError}</HelperText>}
      </div>
    </FormModal>
  );
}
