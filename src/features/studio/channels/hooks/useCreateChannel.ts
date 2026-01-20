import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import { usePostChannels } from '@/libs/api/generated/channels/channels';
import type {
  RequestCreateChannelRequest,
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

interface CreateOptions {
  onSuccess?: (channelId: string) => void;
}

/**
 * チャンネル作成に必要なデータと操作を提供する
 *
 * @returns カテゴリ一覧、ボイス一覧、作成関数
 */
export function useCreateChannel() {
  const [error, setError] = useState<string>();

  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const mutation = usePostChannels();

  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  /**
   * チャンネルを作成する
   *
   * @param data - チャンネル作成リクエスト
   * @param options - オプション（成功時コールバック）
   */
  function createChannel(
    data: RequestCreateChannelRequest,
    options?: CreateOptions,
  ) {
    setError(undefined);

    mutation.mutate(
      { data },
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
      },
    );
  }

  return {
    categories,
    voices,
    createChannel,
    isCreating: mutation.isPending,
    error,
  };
}
