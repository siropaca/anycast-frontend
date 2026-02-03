'use client';

import type { ResponseUserResponse } from '@/libs/api/generated/schemas';
import { useGetUsersUsernameSuspense } from '@/libs/api/generated/users/users';
import { unwrapResponse } from '@/libs/api/unwrapResponse';

/**
 * ユーザーを取得する
 *
 * @param username - ユーザー名
 * @returns ユーザー情報
 */
export function useUser(username: string) {
  const { data } = useGetUsersUsernameSuspense(username);

  const user = unwrapResponse<ResponseUserResponse>(data);

  return {
    user,
  };
}
