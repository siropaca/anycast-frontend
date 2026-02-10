'use client';

import { useRouter } from 'next/navigation';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import { useCreateChannel } from '@/features/studio/channels/hooks/useCreateChannel';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { useMyCharacterOptions } from '@/features/studio/characters/hooks/useMyCharacterOptions';
import { Pages } from '@/libs/pages';

export function CreateChannel() {
  const router = useRouter();

  const { categories, voices, createChannel, isCreating, error } =
    useCreateChannel();
  const { characters: myCharacters } = useMyCharacterOptions();

  function handleSubmit(data: ChannelFormInput) {
    createChannel(data, {
      onSuccess: (channelId) => {
        router.push(Pages.studio.channel.path({ id: channelId }));
      },
    });
  }

  return (
    <div className="space-y-4">
      <SectionTitle title="チャンネル作成" />
      <ChannelForm
        mode="create"
        categories={categories}
        voices={voices}
        isSubmitting={isCreating}
        submitError={error}
        myCharacters={myCharacters}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
