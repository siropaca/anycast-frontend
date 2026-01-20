'use client';

import { useRouter } from 'next/navigation';
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

  const { defaultValues, defaultArtworkUrl, updateEpisode, isUpdating, error } =
    useEditEpisode(channelId, episodeId);

  function handleSubmit(data: EpisodeFormInput) {
    updateEpisode(
      {
        title: data.title,
        description: data.description,
        artworkImageId: data.artworkImageId,
      },
      {
        onSuccess: () => {
          router.push(Pages.studio.channel.path({ id: channelId }));
        },
      },
    );
  }

  return (
    <div>
      <h1>{Pages.studio.editEpisode.title}</h1>

      {error && <p>{error}</p>}

      <EpisodeForm
        mode="edit"
        defaultValues={defaultValues}
        defaultArtworkUrl={defaultArtworkUrl}
        isSubmitting={isUpdating}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
