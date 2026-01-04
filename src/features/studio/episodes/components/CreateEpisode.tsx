'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EpisodeForm } from '@/features/studio/episodes/components/EpisodeForm';
import { useCreateEpisode } from '@/features/studio/episodes/hooks/useCreateEpisode';
import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function CreateEpisode({ channelId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { createMutation } = useCreateEpisode();

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - フォームの入力値
   */
  async function handleSubmit(data: EpisodeFormInput) {
    setError(null);

    try {
      const response = await createMutation.mutateAsync({
        channelId,
        data: {
          title: data.title,
          description: data.description,
          artworkImageId: undefined, // TODO: 画像アップロード機能実装
          bgmAudioId: undefined, // TODO: BGM アップロード機能実装
        },
      });

      if (response.status !== StatusCodes.CREATED) {
        setError(
          response.data.error?.message ?? 'エピソードの作成に失敗しました',
        );
        return;
      }

      const episodeId = response.data.data.id;
      router.push(Pages.studio.episode.path({ id: channelId, episodeId }));
    } catch {
      setError('エピソードの作成に失敗しました');
    }
  }

  return (
    <div>
      <h1>{Pages.studio.newEpisode.title}</h1>

      {error && <p>{error}</p>}

      <EpisodeForm
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
