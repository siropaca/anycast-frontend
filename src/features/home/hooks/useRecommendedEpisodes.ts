'use client';

import { useGetRecommendationsEpisodesSuspense } from '@/libs/api/generated/recommendations/recommendations';
import type { ResponseRecommendedEpisodeListResponse } from '@/libs/api/generated/schemas/responseRecommendedEpisodeListResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

/**
 * おすすめエピソード一覧を取得する
 *
 * @returns おすすめエピソード一覧
 */
export function useRecommendedEpisodes() {
  const { data } = useGetRecommendationsEpisodesSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseRecommendedEpisodeListResponse>(data);

  return {
    episodes: response.data,
  };
}
