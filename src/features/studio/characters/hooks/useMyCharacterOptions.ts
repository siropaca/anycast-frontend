import { useGetMeCharactersSuspense } from '@/libs/api/generated/me/me';
import type {
  ResponseCharacterListWithPaginationResponse,
  ResponsePaginationResponse,
} from '@/libs/api/generated/schemas';
import { unwrapPaginatedResponse } from '@/libs/api/unwrapResponse';

const DEFAULT_PAGINATION: ResponsePaginationResponse = {
  limit: 100,
  offset: 0,
  total: 0,
};

const DEFAULT_RESPONSE: ResponseCharacterListWithPaginationResponse = {
  data: [],
  pagination: DEFAULT_PAGINATION,
};

/**
 * 自分のキャラクター一覧をセレクト用に取得する
 *
 * @returns キャラクター一覧
 */
export function useMyCharacterOptions() {
  const { data } = useGetMeCharactersSuspense({ limit: 100 });

  const response =
    unwrapPaginatedResponse<ResponseCharacterListWithPaginationResponse>(
      data,
      DEFAULT_RESPONSE,
    );

  return {
    characters: response.data,
  };
}
