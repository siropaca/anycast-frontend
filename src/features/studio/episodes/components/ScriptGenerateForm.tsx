'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGenerateScriptAsync } from '@/features/studio/episodes/hooks/useGenerateScriptAsync';
import {
  DEFAULT_DURATION_MINUTES,
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
    isGenerating,
    isCancelable,
    isCanceling,
    status,
    progress,
    error,
    restoredPrompt,
    restoredDurationMinutes,
    generateScript,
    cancelScript,
    reset,
  } = useGenerateScriptAsync(channelId, episodeId);

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isDirty },
  } = useForm<ScriptGenerateFormInput>({
    resolver: zodResolver(scriptGenerateFormSchema),
    defaultValues: {
      prompt: restoredPrompt ?? '',
      durationMinutes: restoredDurationMinutes ?? DEFAULT_DURATION_MINUTES,
    },
  });

  // 非同期取得した最新完了ジョブのプロンプトをフォームに反映
  useEffect(() => {
    if (isDirty || isGenerating) return;
    if (restoredPrompt == null && restoredDurationMinutes == null) return;

    resetForm({
      prompt: restoredPrompt ?? '',
      durationMinutes: restoredDurationMinutes ?? DEFAULT_DURATION_MINUTES,
    });
  }, [
    restoredPrompt,
    restoredDurationMinutes,
    isDirty,
    isGenerating,
    resetForm,
  ]);

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
          disabled={isGenerating}
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
          disabled={isGenerating}
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

      {isGenerating && (
        <div className="my-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">
              {status === 'pending' && 'キュー待機中...'}
              {status === 'processing' && '台本生成中...'}
              {status === 'canceling' && 'キャンセル中...'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{progress}%</span>
              {isCancelable && (
                <button
                  type="button"
                  className="text-sm text-red-600 underline"
                  onClick={cancelScript}
                  disabled={isCanceling}
                >
                  キャンセル
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-bg-elevated rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status === 'completed' && (
        <div className="my-2 p-2 bg-green-100 text-green-800 rounded">
          台本生成が完了しました
          <button
            type="button"
            className="ml-2 text-sm underline"
            onClick={reset}
          >
            閉じる
          </button>
        </div>
      )}

      {status === 'canceled' && (
        <div className="my-2 p-2 bg-gray-100 text-gray-800 rounded">
          台本生成がキャンセルされました
          <button
            type="button"
            className="ml-2 text-sm underline"
            onClick={reset}
          >
            閉じる
          </button>
        </div>
      )}

      {error && <p>{error}</p>}

      <button type="submit" className="border" disabled={isGenerating}>
        {isGenerating ? '生成中...' : '台本を作成'}
      </button>
    </form>
  );
}
