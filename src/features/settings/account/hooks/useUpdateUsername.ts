import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MESSAGES } from '@/constants/messages';
import { useToast } from '@/hooks/useToast';
import {
  getGetMeQueryKey,
  useGetMeSuspense,
  usePatchMeUsername,
} from '@/libs/api/generated/me/me';

/**
 * ユーザー名の取得と更新を提供する
 *
 * @returns 現在のユーザー名、更新関数、ローディング状態、エラー
 */
export function useUpdateUsername() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState<string>();

  const { data: meResponse } = useGetMeSuspense();
  const mutation = usePatchMeUsername();

  const currentUsername =
    meResponse.status === StatusCodes.OK ? meResponse.data.data.username : '';

  /**
   * ユーザー名を更新する
   *
   * @param username - 新しいユーザー名
   */
  function updateUsername(username: string) {
    setError(undefined);

    mutation.mutate(
      { data: { username } },
      {
        onSuccess: async (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(response.data.error.message);
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeQueryKey(),
          });

          // Route Handler で JWT クッキーを直接更新する
          await fetch('/api/auth/update-session', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
          });

          // サーバーコンポーネントを再レンダリングして新しいクッキーを反映
          router.refresh();
          toast.success({ title: MESSAGES.account.usernameUpdateSuccess });
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : MESSAGES.account.usernameUpdateError;
          setError(message);
        },
      },
    );
  }

  return {
    currentUsername,
    isUpdating: mutation.isPending,
    error,

    updateUsername,
    clearError: () => setError(undefined),
  };
}
