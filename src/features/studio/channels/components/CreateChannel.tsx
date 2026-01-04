'use client';

import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChannelForm } from '@/features/studio/channels/components/ChannelForm';
import { useCreateChannel } from '@/features/studio/channels/hooks/useCreateChannel';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { Pages } from '@/libs/pages';

export function CreateChannel() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { categories, voices, createMutation } = useCreateChannel();

  /**
   * フォーム送信時のハンドラ
   *
   * @param data - フォームの入力値
   */
  async function handleSubmit(data: ChannelFormInput) {
    setError(null);

    try {
      const response = await createMutation.mutateAsync({
        data: {
          name: data.name,
          description: data.description,
          scriptPrompt: data.scriptPrompt,
          categoryId: data.categoryId,
          characters: data.characters.map((c) => ({
            name: c.name,
            voiceId: c.voiceId,
            persona: c.persona,
          })),
          artworkImageId: undefined, // TODO: 画像アップロード機能実装
        },
      });

      if (response.status !== StatusCodes.CREATED) {
        setError(
          response.data.error?.message ?? 'チャンネルの作成に失敗しました',
        );
        return;
      }

      const channelId = response.data.data.id;
      router.push(Pages.studio.channel.path({ id: channelId }));
    } catch {
      setError('チャンネルの作成に失敗しました');
    }
  }

  return (
    <div>
      <h1>{Pages.studio.newChannel.title}</h1>

      {error && <p>{error}</p>}

      <ChannelForm
        mode="create"
        categories={categories}
        voices={voices}
        isSubmitting={createMutation.isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
