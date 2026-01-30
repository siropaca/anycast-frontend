import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import type { SignupInput } from '@/features/auth/schemas/auth';
import { usePostAuthRegister } from '@/libs/api/generated/auth/auth';
import { Pages } from '@/libs/pages';

/**
 * ユーザー登録ミューテーションを提供する
 *
 * 登録成功後、自動的にログインしてリダイレクトする。
 *
 * @param redirectTo - 登録成功後のリダイレクト先（デフォルト: ホーム）
 * @returns 登録関数、ローディング状態、エラー
 */
export function useSignup(redirectTo: string = Pages.home.path()) {
  const router = useRouter();
  const registerMutation = usePostAuthRegister();

  const [error, setError] = useState<string | null>(null);

  /**
   * ユーザー登録を実行する
   *
   * @param data - 登録フォームの入力データ
   */
  function signup(data: SignupInput) {
    setError(null);

    registerMutation.mutate(
      {
        data: {
          displayName: data.displayName,
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: async (response) => {
          if (response.status !== 201) {
            setError(
              response.data.error?.message ?? 'ユーザー登録に失敗しました',
            );
            return;
          }

          const signInResponse = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          if (signInResponse?.error) {
            // 登録は成功したがログインに失敗した場合、ログイン画面へ
            router.push(Pages.login.path());
            return;
          }

          router.push(redirectTo);
          router.refresh();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error ? err.message : 'ユーザー登録に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isLoading: registerMutation.isPending,
    error,

    signup,
  };
}
