'use client';

import { useGetRecommendationsChannelsSuspense } from '@/libs/api/generated/recommendations/recommendations';
import type { ResponseRecommendedChannelListResponse } from '@/libs/api/generated/schemas/responseRecommendedChannelListResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

/**
 * おすすめチャンネル一覧を取得する
 *
 * @returns おすすめチャンネル一覧
 */
export function useRecommendedChannels() {
  const { data } = useGetRecommendationsChannelsSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseRecommendedChannelListResponse>(data);

  return {
    channels: response.data,
  };
}
