import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import { usePostChannels } from '@/libs/api/generated/channels/channels';
import type {
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { trimFullWidth } from '@/utils/trim';

interface CreateOptions {
  onSuccess?: (channelId: string) => void;
}

/**
 * チャンネル作成に必要なデータと操作を提供する
 *
 * @returns カテゴリ一覧、ボイス一覧、作成関数
 */
export function useCreateChannel() {
  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const mutation = usePostChannels();

  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  const [error, setError] = useState<string>();

  /**
   * チャンネルを作成する
   *
   * @param data - フォーム入力データ
   * @param options - オプション（成功時コールバック）
   */
  function createChannel(data: ChannelFormInput, options?: CreateOptions) {
    setError(undefined);

    mutation.mutate(
      {
        data: {
          name: trimFullWidth(data.name),
          description: trimFullWidth(data.description),
          userPrompt: trimFullWidth(data.userPrompt),
          categoryId: data.categoryId,
          artworkImageId: data.artworkImageId,
          characters: {
            create: data.characters.map((c) => ({
              name: c.name,
              voiceId: c.voiceId,
              persona: c.persona,
            })),
            connect: [],
          },
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError(
              response.data.error?.message ?? 'チャンネルの作成に失敗しました',
            );
            return;
          }

          options?.onSuccess?.(response.data.data.id);
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'チャンネルの作成に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    categories,
    voices,
    isCreating: mutation.isPending,
    error,

    createChannel,
  };
}
