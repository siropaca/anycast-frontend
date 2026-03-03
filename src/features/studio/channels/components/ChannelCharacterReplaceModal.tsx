'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from '@/components/feedback/Spinner/Spinner';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { SegmentedControl } from '@/components/inputs/SegmentedControl/SegmentedControl';
import { Modal } from '@/components/utils/Modal/Modal';
import { CharacterFormFields } from '@/features/studio/characters/components/CharacterFormFields';
import { CharacterSelect } from '@/features/studio/characters/components/CharacterSelect';
import { useCreateCharacter } from '@/features/studio/characters/hooks/useCreateCharacter';
import {
  type CharacterFormInput,
  characterFormSchema,
} from '@/features/studio/characters/schemas/character';
import { useArtworkField } from '@/hooks/useArtworkField';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

const TAB_OPTIONS = [
  { label: '既存から選択', value: 'select' as const },
  { label: '新規追加', value: 'create' as const },
];

const AVATAR_SYSTEM_PROMPT =
  '画像に文字・テキスト・ロゴ・タイトル・ラベル・キャプションを一切含めないでください。No text, no letters, no words in the image. キャラクターのアバター画像を生成してください。バストアップのポートレート。写真のようにリアルなスタイル。';

interface Props {
  characters: ResponseCharacterResponse[];
  voices: ResponseVoiceResponse[];
  excludeIds: string[];
  open: boolean;
  isSubmitting: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (characterId: string) => void;
}

export function ChannelCharacterReplaceModal({
  characters,
  voices,
  excludeIds,
  open,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: Props) {
  const [tab, setTab] = useState<'select' | 'create'>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    voices: createVoices,
    isVoicesLoading,
    isCreating,
    error: createError,
    createCharacter,
  } = useCreateCharacter(open && tab === 'create');

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
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

  const filteredCharacters = characters.filter(
    (c) => !excludeIds.includes(c.id),
  );

  function handleOpenChange(isOpen: boolean) {
    onOpenChange(isOpen);
    if (!isOpen) {
      setSelectedId(null);
      setTab('select');
      reset();
      artwork.resetPreview(undefined);
    }
  }

  function handleSelectSubmit() {
    if (selectedId) {
      onSubmit(selectedId);
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
    if (name) parts.push(`${name}というキャラクターのアバター画像。`);
    if (persona) parts.push(persona);

    artwork.openGenerateModal(parts.join('\n'));
  }

  function handleCreateSubmit(data: CharacterFormInput) {
    createCharacter(data, {
      onSuccess: (characterId) => {
        onSubmit(characterId);
        reset();
        artwork.resetPreview(undefined);
      },
    });
  }

  const isProcessing =
    isCreating || isSubmitting || artwork.isUploading || artwork.isGenerating;

  return (
    <Modal.Root open={open} onOpenChange={handleOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>キャラクターを変更</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            <SegmentedControl
              options={TAB_OPTIONS}
              value={tab}
              onValueChange={setTab}
            />

            {tab === 'select' ? (
              <CharacterSelect
                characters={filteredCharacters}
                voices={voices}
                value={selectedId}
                onValueChange={setSelectedId}
                placeholder="キャラクターを選択"
              />
            ) : isVoicesLoading ? (
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
                voices={createVoices}
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
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button
              variant="outline"
              color="secondary"
              disabled={isProcessing}
              disabledReason="処理中はキャンセルできません"
            >
              キャンセル
            </Button>
          </Modal.Close>

          {tab === 'select' ? (
            <Button
              disabled={!selectedId || isSubmitting}
              disabledReason={
                isSubmitting ? '変更中...' : 'キャラクターを選択してください'
              }
              onClick={handleSelectSubmit}
            >
              {isSubmitting ? '変更中...' : '変更'}
            </Button>
          ) : (
            <Button
              disabled={isProcessing || isVoicesLoading}
              disabledReason={
                artwork.isUploading
                  ? '画像アップロード中...'
                  : artwork.isGenerating
                    ? '画像生成中...'
                    : isCreating
                      ? '作成中...'
                      : undefined
              }
              onClick={handleSubmit(handleCreateSubmit)}
            >
              {isCreating ? '作成中...' : '作成して変更'}
            </Button>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
