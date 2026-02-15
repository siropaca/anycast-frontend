'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { CharacterFormFields } from '@/features/studio/characters/components/CharacterFormFields';
import { useUpdateCharacter } from '@/features/studio/characters/hooks/useUpdateCharacter';
import {
  type CharacterFormInput,
  characterFormSchema,
} from '@/features/studio/characters/schemas/character';
import { useArtworkField } from '@/hooks/useArtworkField';
import type {
  ResponseCharacterWithChannelsResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { confirmDiscard } from '@/utils/confirmDiscard';

const AVATAR_SYSTEM_PROMPT =
  'キャラクターのアバター画像を生成してください。バストアップのポートレート。写真のようにリアルなスタイル。画像に文字やテキストを含めないでください。';

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
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
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

  const artwork = useArtworkField({
    systemPrompt: AVATAR_SYSTEM_PROMPT,
    onUpload: (id) => setValue('avatarImageId', id, { shouldDirty: true }),
    onRemove: () => setValue('avatarImageId', undefined, { shouldDirty: true }),
  });

  useEffect(() => {
    if (character) {
      reset({
        name: character.name,
        voiceId: character.voice.id,
        persona: character.persona || '',
        avatarImageId: character.avatar?.id,
      });
      artwork.resetPreview(character.avatar?.url);
    }
  }, [character, reset, artwork.resetPreview]);

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    onOpenChange(isOpen);
    if (!isOpen) {
      reset();
      artwork.resetPreview(undefined);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    artwork.upload(file);
  }

  function handleOpenGenerateModal() {
    const name = getValues('name');
    const persona = getValues('persona');

    const parts: string[] = [];
    if (name) parts.push(`キャラクター「${name}」のアバター画像。`);
    if (persona) parts.push(persona);

    artwork.openGenerateModal(parts.join('\n'));
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
      submitDisabled={
        !isDirty || isUpdating || artwork.isUploading || artwork.isGenerating
      }
      submitDisabledReason={
        artwork.isUploading
          ? '画像アップロード中...'
          : artwork.isGenerating
            ? '画像生成中...'
            : '変更がありません'
      }
      isSubmitting={isUpdating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <CharacterFormFields
        previewUrl={artwork.previewUrl}
        fileInputRef={artwork.fileInputRef}
        isUploading={artwork.isUploading}
        isGenerating={artwork.isGenerating}
        uploadError={artwork.uploadError}
        generateError={artwork.generateError}
        generateModalOpen={artwork.generateModalOpen}
        generateModalDefaultPrompt={artwork.generateModalDefaultPrompt}
        register={register}
        control={control}
        errors={errors}
        watch={watch}
        voices={voices}
        disabled={isUpdating}
        error={updateError}
        onOpenFilePicker={artwork.openFilePicker}
        onFileChange={handleFileChange}
        onRemove={artwork.remove}
        onOpenGenerateModal={handleOpenGenerateModal}
        onCloseGenerateModal={artwork.closeGenerateModal}
        onSubmitGenerate={artwork.submitGenerate}
      />
    </FormModal>
  );
}
