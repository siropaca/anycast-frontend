'use client';

import { useRouter } from 'next/navigation';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import { useCreateChannel } from '@/features/studio/channels/hooks/useCreateChannel';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { Pages } from '@/libs/pages';

export function CreateChannel() {
  const router = useRouter();

  const { categories, voices, createChannel, isCreating, error } =
    useCreateChannel();

  function handleSubmit(data: ChannelFormInput) {
    createChannel(
      {
        name: data.name,
        description: data.description,
        userPrompt: data.userPrompt,
        categoryId: data.categoryId,
        characters: {
          create: data.characters.map((c) => ({
            name: c.name,
            voiceId: c.voiceId,
            persona: c.persona,
          })),
          connect: [],
        },
        artworkImageId: data.artworkImageId,
      },
      {
        onSuccess: (channelId) => {
          router.push(Pages.studio.channel.path({ id: channelId }));
        },
      },
    );
  }

  return (
    <div>
      <h1>{Pages.studio.newChannel.title}</h1>

      <ChannelForm
        mode="create"
        categories={categories}
        voices={voices}
        isSubmitting={isCreating}
        submitError={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
