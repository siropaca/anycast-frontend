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
  const { createMutation } = useCreateEpisode(channelId);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(data: EpisodeFormInput) {
    setError(null);

    createMutation.mutate(
      {
        channelId,
        data: {
          title: data.title,
          description: data.description,
          artworkImageId: data.artworkImageId,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError(
              response.data.error?.message ?? 'エピソードの作成に失敗しました',
            );
            return;
          }

          const episodeId = response.data.data.id;
          router.push(Pages.studio.episode.path({ id: channelId, episodeId }));
        },
      },
    );
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
