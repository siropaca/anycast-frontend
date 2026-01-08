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

export function EditEpisode({ channelId, episodeId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { defaultValues, defaultArtworkUrl, updateMutation } = useEditEpisode(
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
          artworkImageId: data.artworkImageId,
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

  return (
    <div>
      <h1>{Pages.studio.editEpisode.title}</h1>

      {error && <p>{error}</p>}

      <EpisodeForm
        mode="edit"
        defaultValues={defaultValues}
        defaultArtworkUrl={defaultArtworkUrl}
        isSubmitting={updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
