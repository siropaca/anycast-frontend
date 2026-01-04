'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  type EpisodeFormInput,
  episodeFormSchema,
} from '@/features/studio/episodes/schemas/episode';

interface Props {
  defaultValues?: EpisodeFormInput;
  isSubmitting?: boolean;

  onSubmit: (data: EpisodeFormInput) => void;
}

export function EpisodeForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: Props) {
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

      {/* TODO: artworkImageId, bgmAudioId の実装 */}

      <button type="submit" className="border" disabled={isSubmitting}>
        {isSubmitting ? '保存中...' : '保存'}
      </button>
    </form>
  );
}
