import { useGetMeApiKeysSuspense } from '@/libs/api/generated/api-keys/api-keys';
import type { ResponseAPIKeyResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * APIキー一覧を取得する
 *
 * @returns APIキーの配列
 */
export function useApiKeyList() {
  const { data } = useGetMeApiKeysSuspense();
  const apiKeys = unwrapResponse<ResponseAPIKeyResponse[]>(data, []);

  return {
    apiKeys,
  };
}
