import { useGetMeCharactersSuspense } from '@/libs/api/generated/me/me';
import type { ResponseCharacterWithChannelsResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * 自分のキャラクター一覧を取得する
 *
 * @returns キャラクター一覧
 */
export function useMyCharacterList() {
  const { data } = useGetMeCharactersSuspense();

  const characters = unwrapResponse<ResponseCharacterWithChannelsResponse[]>(
    data,
    [],
  );

  return { characters };
}
