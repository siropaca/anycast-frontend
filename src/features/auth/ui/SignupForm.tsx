'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { type SignupInput, signupSchema } from '@/features/auth/schemas/auth';
import { usePostAuthRegister } from '@/libs/api/generated/auth/auth';
import { Paths } from '@/libs/paths';

interface Props {
  redirectTo?: string;
}

// TODO: 仮コンポーネント
export function SignupForm({ redirectTo = Paths.home() }: Props) {
  const router = useRouter();
  const registerMutation = usePostAuthRegister();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(data: SignupInput) {
    setError(null);

    try {
      const response = await registerMutation.mutateAsync({
        data: {
          displayName: data.displayName,
          email: data.email,
          password: data.password,
        },
      });

      if (response.status !== 201) {
        setError(response.data.error?.message ?? 'ユーザー登録に失敗しました');
        return;
      }

      const signInResponse = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        router.push(Paths.login());
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('ユーザー登録に失敗しました');
    }
  }

  const isLoading = registerMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}

      <div>
        <label htmlFor="displayName">表示名（20文字以内）</label>
        <br />
        <input
          id="displayName"
          type="text"
          autoComplete="name"
          {...register('displayName')}
          className="border"
        />
        {errors.displayName && <p>{errors.displayName.message}</p>}
      </div>

      <div>
        <label htmlFor="email">メールアドレス</label>
        <br />
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="border"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">パスワード（8文字以上）</label>
        <br />
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          className="border"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">パスワード（確認）</label>
        <br />
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="border"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" disabled={isLoading} className="border">
        {isLoading ? '登録中...' : '新規登録'}
      </button>
    </form>
  );
}
