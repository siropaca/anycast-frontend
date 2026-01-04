'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import { useEditChannel } from '@/features/studio/channels/hooks/useEditChannel';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { Pages } from '@/libs/pages';

interface Props {
  channelId: string;
}

export function EditChannel({ channelId }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { channel, defaultValues, categories, voices, updateMutation } =
    useEditChannel(channelId);

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - フォームの入力値
   */
  async function handleSubmit(data: ChannelFormInput) {
    setError(null);

    try {
      const response = await updateMutation.mutateAsync({
        channelId,
        data: {
          name: data.name,
          description: data.description,
          scriptPrompt: data.scriptPrompt,
          categoryId: data.categoryId,
          artworkImageId: undefined, // TODO: 画像アップロード機能実装
        },
      });

      if (response.status !== StatusCodes.OK) {
        setError(
          response.data.error?.message ?? 'チャンネルの更新に失敗しました',
        );
        return;
      }

      router.push(Pages.studio.channel.path({ id: channelId }));
    } catch {
      setError('チャンネルの更新に失敗しました');
    }
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
        isSubmitting={updateMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
