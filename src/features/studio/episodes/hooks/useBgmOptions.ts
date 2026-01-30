import { useGetMeBgmsSuspense } from '@/libs/api/generated/me/me';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * BGM選択肢を取得する
 *
 * ユーザーBGMとシステムBGMを分けて返す。
 *
 * @returns ユーザーBGM、システムBGM、全BGMの配列
 */
export function useBgmOptions() {
  const { data } = useGetMeBgmsSuspense({ include_system: true });

  const allBgms = unwrapResponse<ResponseBgmWithEpisodesResponse[]>(data, []);

  const userBgms = allBgms.filter((bgm) => !bgm.isSystem);
  const systemBgms = allBgms.filter((bgm) => bgm.isSystem);

  return {
    allBgms,
    userBgms,
    systemBgms,
  };
}
