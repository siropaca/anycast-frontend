'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { CharacterFormFields } from '@/features/studio/characters/components/CharacterFormFields';
import { useCreateCharacter } from '@/features/studio/characters/hooks/useCreateCharacter';
import {
  type CharacterFormInput,
  characterFormSchema,
} from '@/features/studio/characters/schemas/character';
import { useArtworkField } from '@/hooks/useArtworkField';
import { confirmDiscard } from '@/utils/confirmDiscard';

const AVATAR_SYSTEM_PROMPT =
  'キャラクターのアバター画像を生成してください。バストアップのポートレート。写真のようにリアルなスタイル。画像に文字やテキストを含めないでください。';

export function CharacterCreateModal() {
  const [open, setOpen] = useState(false);

  const {
    voices,
    isVoicesLoading,
    isCreating,
    error: createError,
    createCharacter,
  } = useCreateCharacter(open);

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

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !confirmDiscard(isDirty)) return;

    setOpen(isOpen);
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

  function handleFormSubmit(data: CharacterFormInput) {
    createCharacter(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
        artwork.resetPreview(undefined);
      },
    });
  }

  return (
    <FormModal
      trigger={<Button leftIcon={<PlusIcon size={18} />}>新規追加</Button>}
      open={open}
      title="キャラクターを作成"
      size="lg"
      submitDisabled={
        isCreating ||
        artwork.isUploading ||
        artwork.isGenerating ||
        isVoicesLoading
      }
      submitDisabledReason={
        artwork.isUploading
          ? '画像アップロード中...'
          : artwork.isGenerating
            ? '画像生成中...'
            : undefined
      }
      isSubmitting={isCreating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {isVoicesLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : (
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
          disabled={isCreating}
          error={createError}
          onOpenFilePicker={artwork.openFilePicker}
          onFileChange={handleFileChange}
          onRemove={artwork.remove}
          onOpenGenerateModal={handleOpenGenerateModal}
          onCloseGenerateModal={artwork.closeGenerateModal}
          onSubmitGenerate={artwork.submitGenerate}
        />
      )}
    </FormModal>
  );
}
