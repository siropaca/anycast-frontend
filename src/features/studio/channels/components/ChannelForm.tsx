'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { StepBar } from '@/components/navigation/StepBar/StepBar';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import { CharacterStep } from '@/features/studio/channels/components/CharacterStep';
import {
  type ChannelFormInput,
  channelBasicInfoSchema,
  channelFormSchema,
} from '@/features/studio/channels/schemas/channel';
import { ArtworkImageField } from '@/features/studio/components/ArtworkImageField';
import { useArtworkField } from '@/hooks/useArtworkField';
import type {
  ResponseCategoryResponse,
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

const STEPS = [{ label: '基本情報' }, { label: 'キャラクター設定' }] as const;

const BASIC_INFO_FIELDS = [
  'name',
  'description',
  'categoryId',
  'artworkImageId',
] as const;

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: ChannelFormInput;
  categories: ResponseCategoryResponse[];
  voices: ResponseVoiceResponse[];
  defaultArtworkUrl?: string;
  isSubmitting?: boolean;
  submitError?: string;
  myCharacters?: ResponseCharacterResponse[];

  onSubmit: (data: ChannelFormInput) => void;
}

export function ChannelForm({
  mode,
  defaultValues,
  categories,
  voices,
  defaultArtworkUrl,
  onSubmit,
  isSubmitting = false,
  submitError,
  myCharacters,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ChannelFormInput>({
    resolver: zodResolver(channelFormSchema),
    defaultValues: defaultValues ?? {
      name: '',
      description: '',
      categoryId: '',
      characters: [{ mode: 'create', name: '', voiceId: '', persona: '' }],
    },
  });

  const artwork = useArtworkField({
    onUpload: (id) => setValue('artworkImageId', id, { shouldDirty: true }),
    initialPreviewUrl: defaultArtworkUrl,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const isEditMode = mode === 'edit';

  function handleOpenGenerateModal() {
    const name = getValues('name');
    const description = getValues('description');
    const categoryId = getValues('categoryId');
    const categoryName =
      categories.find((c) => c.id === categoryId)?.name ?? '';

    const parts: string[] = [];
    if (name) parts.push(`ポッドキャストチャンネル「${name}」のアートワーク。`);
    if (categoryName) parts.push(`カテゴリ: ${categoryName}。`);
    if (description) parts.push(description);

    artwork.openGenerateModal(parts.join('\n'));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    artwork.upload(file);
  }

  function resetScroll() {
    document.getElementById(MAIN_SCROLL_VIEWPORT_ID)?.scrollTo(0, 0);
  }

  async function handleNextStep() {
    const values = getValues();
    const result = channelBasicInfoSchema.safeParse({
      name: values.name,
      description: values.description,
      categoryId: values.categoryId,
      artworkImageId: values.artworkImageId,
    });

    if (result.success) {
      setCurrentStep(2);
      resetScroll();
    } else {
      await trigger(BASIC_INFO_FIELDS as unknown as (keyof ChannelFormInput)[]);
    }
  }

  function handlePrevStep() {
    setCurrentStep(1);
    resetScroll();
  }

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'characters',
  });

  const watchedCharacters = useWatch({ control, name: 'characters' });

  const selectedCharacterIds = (watchedCharacters ?? []).map((c) =>
    c.mode === 'connect' ? c.characterId : '',
  );

  const categoryOptions = categories.map((category) => ({
    label: category.name ?? '',
    value: category.id ?? '',
  }));

  return (
    <div className="space-y-6">
      {!isEditMode && <StepBar steps={[...STEPS]} currentStep={currentStep} />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ステップ1: チャンネル基本情報 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <FormField
              label="チャンネル名"
              required
              error={errors.name?.message}
            >
              {({ id, hasError }) => (
                <Input
                  id={id}
                  maxLength={255}
                  error={hasError}
                  {...register('name')}
                />
              )}
            </FormField>

            <FormField label="説明" error={errors.description?.message}>
              {({ id, hasError }) => (
                <Textarea
                  id={id}
                  rows={6}
                  maxLength={2000}
                  showCounter
                  error={hasError}
                  {...register('description')}
                />
              )}
            </FormField>

            <ArtworkImageField
              previewUrl={artwork.previewUrl}
              fileInputRef={artwork.fileInputRef}
              isUploading={artwork.isUploading}
              isGenerating={artwork.isGenerating}
              uploadError={artwork.uploadError}
              generateError={artwork.generateError}
              generateModalOpen={artwork.generateModalOpen}
              generateModalDefaultPrompt={artwork.generateModalDefaultPrompt}
              onOpenFilePicker={artwork.openFilePicker}
              onFileChange={handleFileChange}
              onRemove={artwork.remove}
              onOpenGenerateModal={handleOpenGenerateModal}
              onCloseGenerateModal={artwork.closeGenerateModal}
              onSubmitGenerate={artwork.submitGenerate}
            />

            <FormField
              label="カテゴリ"
              required
              error={errors.categoryId?.message}
            >
              {({ hasError }) => (
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      name="categoryId"
                      options={categoryOptions}
                      value={field.value || null}
                      onValueChange={(value) => field.onChange(value ?? '')}
                      placeholder="選択してください"
                      error={hasError}
                    />
                  )}
                />
              )}
            </FormField>
          </div>
        )}

        {/* ステップ2: キャラクター設定（新規作成時のみ） */}
        {!isEditMode && currentStep === 2 && (
          <CharacterStep
            fields={fields}
            control={control}
            errors={errors}
            voices={voices}
            register={register}
            append={append}
            remove={remove}
            update={update}
            watchedCharacters={watchedCharacters}
            myCharacters={myCharacters}
            selectedCharacterIds={selectedCharacterIds}
          />
        )}

        {/* ナビゲーションボタン */}
        <div className="space-y-4">
          {submitError && <HelperText error>{submitError}</HelperText>}

          {!isEditMode && currentStep === 1 ? (
            <div className="flex justify-end">
              <Button
                type="button"
                rightIcon={<ArrowRightIcon />}
                onClick={handleNextStep}
              >
                次へ
              </Button>
            </div>
          ) : (
            <div className="flex justify-end gap-3">
              {!isEditMode && currentStep === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  color="secondary"
                  leftIcon={<ArrowLeftIcon />}
                  onClick={handlePrevStep}
                >
                  戻る
                </Button>
              )}
              <Button type="submit" loading={isSubmitting}>
                {isEditMode ? 'チャンネルを更新' : 'チャンネルを作成'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
