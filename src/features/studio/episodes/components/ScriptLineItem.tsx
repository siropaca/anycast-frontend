'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateScriptLine } from '@/features/studio/episodes/hooks/useCreateScriptLine';
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
  isFirst: boolean;
  isLast: boolean;
  isReordering: boolean;
  onMoveUp: (lineId: string) => void;
  onMoveDown: (lineId: string) => void;
}

export function ScriptLineItem({
  channelId,
  episodeId,
  line,
  isFirst,
  isLast,
  isReordering,
  onMoveUp,
  onMoveDown,
}: Props) {
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

  const {
    createLine,
    isCreating,
    error: createError,
  } = useCreateScriptLine(channelId, episodeId);

  function onSubmit(data: ScriptLineFormInput) {
    updateLine(line.id, data);
  }

  function handleDeleteClick() {
    deleteLine(line.id);
  }

  function handleMoveUpClick() {
    onMoveUp(line.id);
  }

  function handleMoveDownClick() {
    onMoveDown(line.id);
  }

  function handleAddLineClick() {
    createLine({
      afterLineId: line.id,
      speakerId: line.speaker.id,
      text: '',
    });
  }

  const error = updateError ?? deleteError ?? createError;

  return (
    <li>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>{line.speaker.name}:</div>

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

          <button
            type="button"
            className="border"
            disabled={isFirst || isReordering}
            onClick={handleMoveUpClick}
          >
            {isReordering ? '移動中...' : '上に移動'}
          </button>

          <button
            type="button"
            className="border"
            disabled={isLast || isReordering}
            onClick={handleMoveDownClick}
          >
            {isReordering ? '移動中...' : '下に移動'}
          </button>
        </div>
      </form>

      {error && <p>{error}</p>}

      <button
        type="button"
        className="border"
        disabled={isCreating}
        onClick={handleAddLineClick}
      >
        {isCreating ? '追加中...' : '＋行を追加'}
      </button>
    </li>
  );
}
