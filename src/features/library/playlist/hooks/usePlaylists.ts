'use client';

import { useGetMePlaylistsSuspense } from '@/libs/api/generated/me/me';
import type { ResponsePlaylistListWithPaginationResponse } from '@/libs/api/generated/schemas/responsePlaylistListWithPaginationResponse';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 100;

/**
 * プレイリスト一覧を取得する
 *
 * @returns プレイリスト一覧
 */
export function usePlaylists() {
  const { data } = useGetMePlaylistsSuspense({
    limit: DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponsePlaylistListWithPaginationResponse>(data);

  return {
    items: response.data,
  };
}
