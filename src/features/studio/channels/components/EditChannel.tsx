'use client';

import { useRouter } from 'next/navigation';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import { useEditChannel } from '@/features/studio/channels/hooks/useEditChannel';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function EditChannel({ channelId }: Props) {
  const router = useRouter();

  const {
    channel,
    defaultValues,
    defaultArtworkUrl,
    defaultBgm,
    categories,
    voices,
    updateChannel,
    isUpdating,
    error,
  } = useEditChannel(channelId);

  function handleSubmit(data: ChannelFormInput) {
    updateChannel(
      {
        name: data.name,
        description: data.description,
        userPrompt: data.userPrompt,
        categoryId: data.categoryId,
        artworkImageId: data.artworkImageId,
        defaultBgmId: data.defaultBgmId,
        defaultSystemBgmId: data.defaultSystemBgmId,
      },
      {
        onSuccess: () => {
          router.push(Pages.studio.channel.path({ id: channelId }));
        },
      },
    );
  }

  if (!channel || !defaultValues) {
    return <p>チャンネルが見つかりません</p>;
  }

  return (
    <div>
      <h1>{Pages.studio.editChannel.title}</h1>

      {error && <p>{error}</p>}

      <ChannelForm
        mode="edit"
        defaultValues={defaultValues}
        categories={categories}
        voices={voices}
        defaultArtworkUrl={defaultArtworkUrl}
        defaultBgm={defaultBgm}
        isSubmitting={isUpdating}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
