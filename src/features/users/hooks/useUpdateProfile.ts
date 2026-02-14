import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import type { ProfileFormInput } from '@/features/users/schemas/profile';
import { useToast } from '@/hooks/useToast';
import { getGetMeQueryKey, usePatchMe } from '@/libs/api/generated/me/me';
import { getGetUsersUsernameQueryKey } from '@/libs/api/generated/users/users';
import { trimFullWidth } from '@/utils/trim';

/**
 * プロフィール更新ミューテーションを提供する
 *
 * @returns 更新関数、更新中フラグ、エラー
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const mutation = usePatchMe();

  const [error, setError] = useState<string>();

  /**
   * プロフィールを更新する
   *
   * @param username - 現在のユーザー名（キャッシュ無効化用）
   * @param data - フォーム入力データ
   * @returns 更新が成功したかどうか
   */
  async function updateProfile(
    username: string,
    data: ProfileFormInput,
  ): Promise<boolean> {
    setError(undefined);

    try {
      const response = await mutation.mutateAsync({
        data: {
          displayName: trimFullWidth(data.displayName),
          bio: data.bio ? trimFullWidth(data.bio) : undefined,
          avatarImageId: data.avatarImageId,
          headerImageId: data.headerImageId,
        },
      });

      if (response.status !== StatusCodes.OK) {
        setError(response.data.error.message);
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: getGetMeQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: getGetUsersUsernameQueryKey(username),
      });
      router.refresh();
      toast.success({ title: 'プロフィールを更新しました' });
      return true;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'プロフィールの更新に失敗しました';
      setError(message);
      toast.error({ title: message });
      return false;
    }
  }

  /**
   * エラー状態をクリアする
   */
  function clearError() {
    setError(undefined);
  }

  return {
    isUpdating: mutation.isPending,
    error,

    updateProfile,
    clearError,
  };
}
