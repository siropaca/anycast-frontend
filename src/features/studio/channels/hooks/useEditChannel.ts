import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import {
  useGetChannelsChannelIdSuspense,
  usePatchChannelsChannelId,
} from '@/libs/api/generated/channels/channels';
import { getGetMeChannelsChannelIdQueryKey } from '@/libs/api/generated/me/me';
import type {
  ResponseCategoryResponse,
  ResponseChannelResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { trimFullWidth } from '@/utils/trim';

interface UpdateOptions {
  onSuccess?: () => void;
}

/**
 * チャンネル編集に必要なデータと操作を提供する
 *
 * @param channelId - チャンネル ID
 * @returns チャンネルデータ、フォームデータ、カテゴリ一覧、ボイス一覧、更新関数
 */
export function useEditChannel(channelId: string) {
  const queryClient = useQueryClient();
  const { data: channelData } = useGetChannelsChannelIdSuspense(channelId);
  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const mutation = usePatchChannelsChannelId();

  const [error, setError] = useState<string>();

  const channel = unwrapResponse<ResponseChannelResponse>(channelData);
  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  const defaultValues: ChannelFormInput = {
    name: channel.name,
    description: channel.description,
    categoryId: channel.category.id,
    artworkImageId: channel.artwork?.id,
    characters: channel.characters.map((c) => ({
      mode: 'create' as const,
      name: c.name,
      voiceId: c.voice.id,
      persona: c.persona ?? '',
    })),
  };

  /**
   * チャンネルを更新する
   *
   * @param data - フォーム入力データ
   * @param options - オプション（成功時コールバック）
   */
  function updateChannel(data: ChannelFormInput, options?: UpdateOptions) {
    setError(undefined);

    mutation.mutate(
      {
        channelId,
        data: {
          name: trimFullWidth(data.name),
          description: trimFullWidth(data.description),
          categoryId: data.categoryId,
          artworkImageId: data.artworkImageId,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ?? 'チャンネルの更新に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
          });
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'チャンネルの更新に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    channel,
    defaultValues,
    defaultArtworkUrl: channel.artwork?.url,
    categories,
    voices,
    isUpdating: mutation.isPending,
    error,

    updateChannel,
  };
}
