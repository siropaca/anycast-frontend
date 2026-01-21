'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDeleteScriptLine } from '@/features/studio/episodes/hooks/useDeleteScriptLine';
import { useUpdateScriptLine } from '@/features/studio/episodes/hooks/useUpdateScriptLine';
import {
  type ScriptLineFormInput,
  scriptLineFormSchema,
} from '@/features/studio/episodes/schemas/scriptLine';
import type { ResponseScriptLineResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  episodeId: string;
  line: ResponseScriptLineResponse;
}

export function ScriptLineItem({ channelId, episodeId, line }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ScriptLineFormInput>({
    resolver: zodResolver(scriptLineFormSchema),
    defaultValues: {
      emotion: line.emotion,
      text: line.text,
    },
  });

  const {
    updateLine,
    isUpdating,
    error: updateError,
  } = useUpdateScriptLine(channelId, episodeId);

  const {
    deleteLine,
    isDeleting,
    error: deleteError,
  } = useDeleteScriptLine(channelId, episodeId);

  function onSubmit(data: ScriptLineFormInput) {
    updateLine(line.id, data);
  }

  function handleDeleteClick() {
    deleteLine(line.id);
  }

  const error = updateError ?? deleteError;

  return (
    <li>
      <div>
        {line.speaker.name} ({line.speaker.voice.name}):
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <input
            placeholder="感情を入力"
            className="border"
            {...register('emotion')}
          />
          <input
            placeholder="台本を入力"
            className="border grow"
            {...register('text')}
          />
        </div>
        {errors.text && <p>{errors.text.message}</p>}

        <div>
          <button
            type="submit"
            className="border"
            disabled={isUpdating || !isDirty}
          >
            {isUpdating ? '更新中...' : '更新'}
          </button>

          <button
            type="button"
            className="border"
            disabled={isDeleting}
            onClick={handleDeleteClick}
          >
            {isDeleting ? '削除中...' : '削除'}
          </button>

          <button type="button" className="border">
            上に移動
          </button>

          <button type="button" className="border">
            下に移動
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}
    </li>
  );
}
