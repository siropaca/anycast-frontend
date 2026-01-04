'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EpisodeForm } from '@/features/studio/episodes/components/EpisodeForm';
import { useEditEpisode } from '@/features/studio/episodes/hooks/useEditEpisode';
import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
  episodeId: string;
}

/**
 * datetime-local 形式を ISO 8601 形式に変換する
 *
 * @param dateTimeLocal - datetime-local 形式の日時文字列
 * @returns ISO 8601 形式の日時文字列、または空の場合は undefined
 *
 * @example
 * toISOString('2024-01-01T12:00') // => '2024-01-01T12:00:00.000Z'
 */
function toISOString(dateTimeLocal: string | undefined): string | undefined {
  if (!dateTimeLocal) return undefined;
  return new Date(dateTimeLocal).toISOString();
}

export function EditEpisode({ channelId, episodeId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { episode, defaultValues, updateMutation } = useEditEpisode(
    channelId,
    episodeId,
  );

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - フォームの入力値
   */
  async function handleSubmit(data: EpisodeFormInput) {
    setError(null);

    try {
      const response = await updateMutation.mutateAsync({
        channelId,
        episodeId,
        data: {
          title: data.title,
          description: data.description,
          publishedAt: toISOString(data.publishedAt),
          artworkImageId: undefined, // TODO: 画像アップロード機能実装
          bgmAudioId: undefined, // TODO: BGM アップロード機能実装
        },
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? 'エピソードの更新に失敗しました',
        );
        return;
      }

      router.push(Pages.studio.channel.path({ id: channelId }));
    } catch {
      setError('エピソードの更新に失敗しました');
    }
  }

  if (!episode || !defaultValues) {
    return <p>エピソードが見つかりません</p>;
  }

  return (
    <div>
      <h1>{Pages.studio.editEpisode.title}</h1>

      {error && <p>{error}</p>}

      <EpisodeForm
        mode="edit"
        defaultValues={defaultValues}
        isSubmitting={updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
