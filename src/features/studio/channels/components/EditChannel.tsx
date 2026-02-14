'use client';

import { useRouter } from 'next/navigation';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
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
    categories,
    voices,
    isUpdating,
    error,
    updateChannel,
  } = useEditChannel(channelId);

  function handleSubmit(data: ChannelFormInput) {
    updateChannel(data, {
      onSuccess: () => {
        router.push(Pages.studio.channel.path({ id: channelId }));
      },
    });
  }

  if (!channel || !defaultValues) {
    return <p>{'チャンネルが見つかりません'}</p>;
  }

  return (
    <div className="space-y-4">
      <SectionTitle
        title="チャンネル編集"
        backHref={Pages.studio.channel.path({ id: channelId })}
      />
      <ChannelForm
        mode="edit"
        defaultValues={defaultValues}
        categories={categories}
        voices={voices}
        defaultArtworkUrl={defaultArtworkUrl}
        isSubmitting={isUpdating}
        submitError={error}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
