import { useGetCategoriesSuspense } from '@/libs/api/generated/categories/categories';
import { usePostChannels } from '@/libs/api/generated/channels/channels';
import type {
  ResponseCategoryResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * チャンネル作成に必要なデータと操作を提供する
 *
 * @returns カテゴリ一覧、ボイス一覧、作成ミューテーション
 */
export function useCreateChannel() {
  const { data: categoriesData } = useGetCategoriesSuspense();
  const { data: voicesData } = useGetVoicesSuspense();
  const createMutation = usePostChannels();

  const categories = unwrapResponse<ResponseCategoryResponse[]>(
    categoriesData,
    [],
  );
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  return {
    categories,
    voices,
    createMutation,
  };
}
