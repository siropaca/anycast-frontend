import { useGetMeBgmsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseBgmResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * BGM選択肢を取得する
 *
 * ユーザーBGMとデフォルトBGMを分けて返す。
 *
 * @returns ユーザーBGM、デフォルトBGM、全BGMの配列
 */
export function useBgmOptions() {
  const { data } = useGetMeBgmsSuspense({ include_default: true });
  const bgms = unwrapResponse<ResponseBgmResponse[]>(data, []);

  const userBgms = bgms.filter((bgm) => !bgm.isDefault);
  const defaultBgms = bgms.filter((bgm) => bgm.isDefault);

  return {
    userBgms,
    defaultBgms,
    allBgms: bgms,
  };
}
