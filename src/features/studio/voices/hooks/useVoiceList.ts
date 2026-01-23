import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * ボイス一覧を取得する
 *
 * @returns ボイス一覧
 */
export function useVoiceList() {
  const { data } = useGetVoicesSuspense();
  const voices = unwrapResponse<ResponseVoiceResponse[]>(data, []);

  return {
    voices,
  };
}
