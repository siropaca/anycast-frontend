'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { ArtworkImageField } from '@/features/studio/components/ArtworkImageField';
import {
  type EpisodeFormInput,
  episodeFormSchema,
} from '@/features/studio/episodes/schemas/episode';
import { useArtworkField } from '@/hooks/useArtworkField';

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: EpisodeFormInput;
  defaultArtworkUrl?: string;
  isSubmitting?: boolean;
  submitError?: string;

  onSubmit: (data: EpisodeFormInput) => void;
}

export function EpisodeForm({
  mode,
  defaultValues,
  defaultArtworkUrl,
  onSubmit,
  isSubmitting = false,
  submitError,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EpisodeFormInput>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
    },
  });

  const artwork = useArtworkField({
    onUpload: (id) => setValue('artworkImageId', id, { shouldDirty: true }),
    onRemove: () => setValue('artworkImageId', null, { shouldDirty: true }),
    initialPreviewUrl: defaultArtworkUrl,
  });

  const isEditMode = mode === 'edit';

  function handleOpenGenerateModal() {
    const title = getValues('title');
    const description = getValues('description');

    const parts: string[] = [];
    if (title)
      parts.push(`ポッドキャストエピソード「${title}」のアートワーク。`);
    if (description) parts.push(description);

    artwork.openGenerateModal(parts.join('\n'));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    artwork.upload(file);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        <FormField label="タイトル" required error={errors.title?.message}>
          {({ id, hasError }) => (
            <Input
              id={id}
              maxLength={255}
              error={hasError}
              {...register('title')}
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
      </div>

      <div className="space-y-4">
        {submitError && <HelperText error>{submitError}</HelperText>}

        <div className="flex justify-end">
          <Button type="submit" loading={isSubmitting}>
            {isEditMode ? 'エピソードを更新' : 'エピソードを作成'}
          </Button>
        </div>
      </div>
    </form>
  );
}
