'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEV_LOGIN_CREDENTIALS } from '@/features/auth/constants';
import { type LoginInput, loginSchema } from '@/features/auth/schemas/auth';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

// TODO: 仮コンポーネント
export function LoginForm({ redirectTo = Pages.home.path() }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? DEV_LOGIN_CREDENTIALS
        : undefined,
  });

  async function onSubmit(data: LoginInput) {
    setError(null);

    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      setError('メールアドレスまたはパスワードが正しくありません');
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}

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
        <label htmlFor="password">パスワード</label>
        <br />
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          className="border"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="border">
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
}
