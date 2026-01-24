import { useGetMeBgmsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * 自分のBGM一覧を取得する
 *
 * @returns BGM一覧
 */
export function useMyBgmList() {
  const { data } = useGetMeBgmsSuspense();

  const bgms = unwrapResponse<ResponseBgmWithEpisodesResponse[]>(data, []);

  return {
    bgms,
  };
}
