'use client';

import { useRouter } from 'next/navigation';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
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

  const {
    episode,
    defaultValues,
    defaultArtworkUrl,
    isUpdating,
    error,
    updateEpisode,
  } = useEditEpisode(channelId, episodeId);

  function handleSubmit(data: EpisodeFormInput) {
    updateEpisode(data, {
      onSuccess: () => {
        router.push(Pages.studio.episode.path({ id: channelId, episodeId }));
      },
    });
  }

  if (!episode || !defaultValues) {
    return <p>{'エピソードが見つかりません'}</p>;
  }

  return (
    <div className="space-y-4">
      <SectionTitle
        title="エピソード編集"
        backHref={Pages.studio.episode.path({ id: channelId, episodeId })}
      />
      <EpisodeForm
        mode="edit"
        defaultValues={defaultValues}
        defaultArtworkUrl={defaultArtworkUrl}
        isSubmitting={isUpdating}
        submitError={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
