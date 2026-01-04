'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  type EpisodeFormInput,
  episodeFormSchema,
} from '@/features/studio/episodes/schemas/episode';

interface Props {
  mode: 'create' | 'edit';
  defaultValues?: EpisodeFormInput;
  isSubmitting?: boolean;

  onSubmit: (data: EpisodeFormInput) => void;
}

export function EpisodeForm({
  mode,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const isEditMode = mode === 'edit';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EpisodeFormInput>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      publishedAt: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">タイトル</label>
        <br />
        <input
          id="title"
          type="text"
          className="border"
          {...register('title')}
        />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description">説明</label>
        <br />
        <textarea
          id="description"
          className="border"
          {...register('description')}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      {isEditMode && (
        <div>
          <label htmlFor="publishedAt">公開日時</label>
          <br />
          <input
            id="publishedAt"
            type="datetime-local"
            className="border"
            {...register('publishedAt')}
          />
          {errors.publishedAt && <p>{errors.publishedAt.message}</p>}
        </div>
      )}

      {/* TODO: artworkImageId, bgmAudioId の実装 */}

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
