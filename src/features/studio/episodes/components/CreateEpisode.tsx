'use client';

import { useRouter } from 'next/navigation';
import { EpisodeForm } from '@/features/studio/episodes/components/EpisodeForm';
import { useCreateEpisode } from '@/features/studio/episodes/hooks/useCreateEpisode';
import type { EpisodeFormInput } from '@/features/studio/episodes/schemas/episode';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function CreateEpisode({ channelId }: Props) {
  const router = useRouter();
  const { createEpisode, isCreating, error } = useCreateEpisode(channelId);

  function handleSubmit(data: EpisodeFormInput) {
    createEpisode(
      {
        title: data.title,
        description: data.description,
        artworkImageId: data.artworkImageId,
      },
      {
        onSuccess: (episodeId) => {
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
        isSubmitting={isCreating}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
