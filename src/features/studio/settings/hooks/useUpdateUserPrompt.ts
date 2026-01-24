import { useQueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';
import {
  getGetMeQueryKey,
  useGetMe,
  usePatchMePrompt,
} from '@/libs/api/generated/me/me';

interface UpdateOptions {
  onSuccess?: () => void;
}

/**
 * ユーザーのマスタープロンプトの取得と更新を提供する
 *
 * @returns マスタープロンプト、更新関数、ローディング状態、エラー
 */
export function useUpdateUserPrompt() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const { data: meResponse, isLoading } = useGetMe();
  const mutation = usePatchMePrompt();

  const currentUserPrompt =
    meResponse?.status === StatusCodes.OK
      ? meResponse.data.data.userPrompt
      : '';

  /**
   * マスタープロンプトを更新する
   *
   * @param userPrompt - 新しいマスタープロンプト
   * @param options - オプション（成功時コールバック）
   */
  function updateUserPrompt(userPrompt: string, options?: UpdateOptions) {
    setError(undefined);

    mutation.mutate(
      {
        data: { userPrompt },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.OK) {
            setError(
              response.data.error?.message ??
                'マスタープロンプトの更新に失敗しました',
            );
            return;
          }

          queryClient.invalidateQueries({
            queryKey: getGetMeQueryKey(),
          });
          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'マスタープロンプトの更新に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    currentUserPrompt,
    isLoading,
    isUpdating: mutation.isPending,
    error,

    updateUserPrompt,
  };
}
