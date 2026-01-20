'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGenerateScriptForm } from '@/features/studio/episodes/hooks/useGenerateScriptForm';
import {
  EPISODE_DURATION_OPTIONS,
  type ScriptGenerateFormInput,
  scriptGenerateFormSchema,
} from '@/features/studio/episodes/schemas/scriptGenerate';

interface Props {
  channelId: string;
  episodeId: string;
}

export function ScriptGenerateForm({ channelId, episodeId }: Props) {
  const {
    generateScript,
    isGenerating: isSubmitting,
    error,
  } = useGenerateScriptForm(channelId, episodeId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScriptGenerateFormInput>({
    resolver: zodResolver(scriptGenerateFormSchema),
    defaultValues: {
      prompt: '',
      durationMinutes: 10,
    },
  });

  function onSubmit(data: ScriptGenerateFormInput) {
    generateScript({
      prompt: data.prompt,
      durationMinutes: data.durationMinutes,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea
          placeholder="どんな内容のポッドキャストを作成しますか？"
          disabled={isSubmitting}
          className="border w-full h-20"
          {...register('prompt')}
        />
        {errors.prompt && <p>{errors.prompt.message}</p>}
      </div>

      <div>
        <label htmlFor="durationMinutes">エピソードの長さ</label>
        <br />
        <select
          id="durationMinutes"
          className="border"
          disabled={isSubmitting}
          {...register('durationMinutes', { valueAsNumber: true })}
        >
          {EPISODE_DURATION_OPTIONS.map((duration) => (
            <option key={duration} value={duration}>
              {duration}分
            </option>
          ))}
        </select>
        {errors.durationMinutes && <p>{errors.durationMinutes.message}</p>}
      </div>

      {error && <p>{error}</p>}

      <button type="submit" className="border" disabled={isSubmitting}>
        {isSubmitting ? '生成中...' : '台本を作成'}
      </button>
    </form>
  );
}
