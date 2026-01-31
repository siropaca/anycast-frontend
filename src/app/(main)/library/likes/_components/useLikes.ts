'use client';

import { useGetMeLikesSuspense } from '@/libs/api/generated/me/me';
import type { ResponseLikeListWithPaginationResponse } from '@/libs/api/generated/schemas/responseLikeListWithPaginationResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 100;

/**
 * 高評価一覧を取得する
 *
 * @returns 高評価一覧
 */
export function useLikes() {
  const { data } = useGetMeLikesSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseLikeListWithPaginationResponse>(data);

  return {
    items: response.data,
  };
}
