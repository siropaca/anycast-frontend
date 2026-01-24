import { useGetMeChannelsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseChannelResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * 自分のチャンネル一覧を取得する
 *
 * @returns チャンネル一覧
 */
export function useMyChannelList() {
  const { data } = useGetMeChannelsSuspense();

  const channels = unwrapResponse<ResponseChannelResponse[]>(data, []);

  return {
    channels,
  };
}
