'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import {
  type CreatePlaylistInput,
  createPlaylistSchema,
} from '@/features/episodes/schemas/playlist';

interface Props {
  isPending: boolean;
  serverError?: string;

  onSubmit: (name: string) => void;
}

export function CreatePlaylistForm({
  isPending,
  serverError,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePlaylistInput>({
    resolver: zodResolver(createPlaylistSchema),
  });

  const error = errors.name?.message || serverError;

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.name))}
      className="space-y-3"
    >
      <div className="flex items-start gap-3">
        <Input
          size="sm"
          placeholder="プレイリスト名"
          maxLength={100}
          autoFocus
          showCounter
          error={!!errors.name}
          className="flex-1"
          value={watch('name')}
          {...register('name')}
        />
        <Button type="submit" size="sm" loading={isPending}>
          作成
        </Button>
      </div>

      {error && <HelperText error>{error}</HelperText>}
    </form>
  );
}
