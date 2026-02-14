'use client';

import { useRouter } from 'next/navigation';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
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
    createEpisode(data, {
      onSuccess: (episodeId) => {
        router.push(Pages.studio.episode.path({ id: channelId, episodeId }));
      },
    });
  }

  return (
    <div className="space-y-4">
      <SectionTitle
        title="エピソード作成"
        backHref={Pages.studio.channel.path({ id: channelId })}
      />
      <EpisodeForm
        mode="create"
        isSubmitting={isCreating}
        submitError={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
