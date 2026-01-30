import { useState } from 'react';
import { useGetMeBgmsSuspense } from '@/libs/api/generated/me/me';
import type {
  ResponseBgmListWithPaginationResponse,
  ResponsePaginationResponse,
} from '@/libs/api/generated/schemas';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_LIMIT = 20;

const DEFAULT_PAGINATION: ResponsePaginationResponse = {
  limit: DEFAULT_LIMIT,
  offset: 0,
  total: 0,
};

const DEFAULT_RESPONSE: ResponseBgmListWithPaginationResponse = {
  data: [],
  pagination: DEFAULT_PAGINATION,
};

/**
 * 自分の BGM 一覧を取得する
 *
 * @returns BGM 一覧とページネーション情報
 */
export function useMyBgmList() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useGetMeBgmsSuspense({
    include_system: true,
    limit: DEFAULT_LIMIT,
    offset: (currentPage - 1) * DEFAULT_LIMIT,
  });

  const response =
    unwrapPaginatedResponse<ResponseBgmListWithPaginationResponse>(
      data,
      DEFAULT_RESPONSE,
    );

  const totalPages = Math.ceil(response.pagination.total / DEFAULT_LIMIT);

  return {
    bgms: response.data,
    pagination: response.pagination,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
