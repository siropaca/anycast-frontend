'use client';

import { useGetMeFollowsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseFollowListWithPaginationResponse } from '@/libs/api/generated/schemas/responseFollowListWithPaginationResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 100;

/**
 * フォロー中のユーザー一覧を取得する
 *
 * @returns フォロー中のユーザー一覧
 */
export function useFollowing() {
  const { data } = useGetMeFollowsSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseFollowListWithPaginationResponse>(data);

  return {
    items: response.data,
  };
}
