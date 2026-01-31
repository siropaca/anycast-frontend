'use client';

import { useGetRecommendationsChannelsSuspense } from '@/libs/api/generated/recommendations/recommendations';
import type { ResponseRecommendedChannelListResponse } from '@/libs/api/generated/schemas/responseRecommendedChannelListResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 50;

/**
 * チャンネル一覧を取得する
 *
 * @returns チャンネル一覧
 */
export function useChannels() {
  const { data } = useGetRecommendationsChannelsSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseRecommendedChannelListResponse>(data);

  return {
    channels: response.data,
  };
}
