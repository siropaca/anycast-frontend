'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { StatusCodes } from 'http-status-codes';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  type EpisodeFormInput,
  episodeFormSchema,
} from '@/features/studio/episodes/schemas/episode';
import { usePostImages } from '@/libs/api/generated/images/images';

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: EpisodeFormInput;
  defaultArtworkUrl?: string;
  isSubmitting?: boolean;

  onSubmit: (data: EpisodeFormInput) => void;
}

export function EpisodeForm({
  mode,
  defaultValues,
  defaultArtworkUrl,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const isEditMode = mode === 'edit';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [artworkPreviewUrl, setArtworkPreviewUrl] = useState<
    string | undefined
  >(defaultArtworkUrl);
  const [uploadError, setUploadError] = useState<string | undefined>();
  const uploadMutation = usePostImages();

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

  function handleArtworkButtonClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(undefined);

    const response = await uploadMutation.mutateAsync({ data: { file } });
    if (response.status !== StatusCodes.CREATED) {
      setUploadError('画像のアップロードに失敗しました');
      return;
    }

    const { id, url } = response.data.data;
    setValue('artworkImageId', id, { shouldDirty: true });
    setArtworkPreviewUrl(url);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">タイトル</label>
        <input
          id="title"
          type="text"
          className="border w-full"
          {...register('title')}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          className="border w-full h-20"
          {...register('description')}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <span>アートワーク</span>
        <br />
        {artworkPreviewUrl && (
          <Image
            src={artworkPreviewUrl}
            alt="アートワーク"
            width={200}
            height={200}
            className="object-cover"
          />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="border"
          onClick={handleArtworkButtonClick}
          disabled={uploadMutation.isPending}
        >
          {uploadMutation.isPending
            ? 'アップロード中...'
            : artworkPreviewUrl
              ? 'アートワークを変更'
              : 'アートワークを登録'}
        </button>
        {uploadError && <p>{uploadError}</p>}
      </div>

      <button type="submit" className="border" disabled={isSubmitting}>
        {isSubmitting
          ? '保存中...'
          : isEditMode
            ? 'エピソードを更新'
            : 'エピソードを作成'}
      </button>
    </form>
  );
}
