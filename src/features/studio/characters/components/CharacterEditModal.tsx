'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { useUpdateCharacter } from '@/features/studio/characters/hooks/useUpdateCharacter';
import {
  type CharacterFormInput,
  characterFormSchema,
} from '@/features/studio/characters/schemas/character';
import { getGenderLabel } from '@/features/studio/voices/utils/voiceLabels';
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

  const voiceOptions = voices.map((v) => ({
    label: `${v.name} (${getGenderLabel(v.gender)})`,
    value: v.id,
  }));

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
        <div className="space-y-2">
          <FormLabel>アバター画像</FormLabel>
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
          {artworkUploadError && (
            <HelperText error>{artworkUploadError}</HelperText>
          )}
        </div>

        {/* 名前 */}
        <div className="space-y-2">
          <FormLabel htmlFor="character-edit-name" required>
            名前
          </FormLabel>
          <Input
            id="character-edit-name"
            placeholder="キャラクター名を入力"
            maxLength={255}
            disabled={isUpdating}
            error={!!errors.name}
            {...register('name')}
          />
          {errors.name && <HelperText error>{errors.name.message}</HelperText>}
        </div>

        {/* ボイス */}
        <div className="space-y-2">
          <FormLabel htmlFor="character-edit-voice" required>
            ボイス
          </FormLabel>
          <Controller
            name="voiceId"
            control={control}
            render={({ field }) => (
              <Select
                options={voiceOptions}
                value={field.value || null}
                onValueChange={(value) => field.onChange(value ?? '')}
                placeholder="ボイスを選択"
                error={!!errors.voiceId}
                disabled={isUpdating}
              />
            )}
          />
          {errors.voiceId && (
            <HelperText error>{errors.voiceId.message}</HelperText>
          )}
        </div>

        {/* ペルソナ */}
        <div className="space-y-2">
          <FormLabel htmlFor="character-edit-persona">ペルソナ</FormLabel>
          <Textarea
            id="character-edit-persona"
            placeholder="キャラクターの性格や特徴を入力"
            rows={6}
            maxLength={2000}
            showCounter
            disabled={isUpdating}
            error={!!errors.persona}
            value={watch('persona')}
            {...register('persona')}
          />
          {errors.persona && (
            <HelperText error>{errors.persona.message}</HelperText>
          )}
        </div>

        {updateError && <HelperText error>{updateError}</HelperText>}
      </div>
    </FormModal>
  );
}
