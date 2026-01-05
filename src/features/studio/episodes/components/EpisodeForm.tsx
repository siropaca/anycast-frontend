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
    },
  });

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
