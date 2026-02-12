'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import {
  type EpisodeFormInput,
  episodeFormSchema,
} from '@/features/studio/episodes/schemas/episode';
import { useUploadArtwork } from '@/hooks/useUploadArtwork';

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
    uploadArtwork,
    isUploading: isArtworkUploading,
    error: artworkUploadError,
  } = useUploadArtwork();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<
    string | undefined
  >(defaultArtworkUrl);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EpisodeFormInput>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
    },
  });

  const isEditMode = mode === 'edit';

  function handleArtworkButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadArtwork(file, ({ id, url }) => {
      setValue('artworkImageId', id, { shouldDirty: true });
      setArtworkPreviewUrl(url);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

        <FormField label="アートワーク" error={artworkUploadError}>
          {() => (
            <>
              {artworkPreviewUrl && (
                <Image
                  src={artworkPreviewUrl}
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
                onChange={handleFileChange}
              />
              <div>
                <Button
                  type="button"
                  variant="outline"
                  color="secondary"
                  loading={isArtworkUploading}
                  onClick={handleArtworkButtonClick}
                >
                  {artworkPreviewUrl
                    ? 'アートワークを変更'
                    : 'アートワークを登録'}
                </Button>
              </div>
            </>
          )}
        </FormField>
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
