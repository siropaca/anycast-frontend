'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { PasswordToggleButton } from '@/components/inputs/buttons/PasswordToggleButton/PasswordToggleButton';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { DEV_LOGIN_CREDENTIALS } from '@/features/auth/constants';
import { type LoginInput, loginSchema } from '@/features/auth/schemas/auth';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = Pages.home.path() }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

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

  if (!showEmailForm) {
    return (
      <Button
        type="button"
        color="secondary"
        variant="outline"
        size="lg"
        className="w-full"
        leftIcon={<EnvelopeIcon />}
        onClick={() => setShowEmailForm(true)}
      >
        メールアドレスでログイン
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {error && (
        <HelperText error className="text-center">
          {error}
        </HelperText>
      )}

      <div className="flex flex-col gap-2.5">
        <FormLabel htmlFor="email">メールアドレス</FormLabel>
        <Input
          id="email"
          type="email"
          size="lg"
          autoComplete="email"
          placeholder="mail@example.com"
          error={!!errors.email}
          {...register('email')}
        />
        {errors.email && <HelperText error>{errors.email.message}</HelperText>}
      </div>

      <div className="flex flex-col gap-2.5">
        <FormLabel htmlFor="password">パスワード</FormLabel>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          size="lg"
          autoComplete="current-password"
          placeholder="パスワードを入力"
          error={!!errors.password}
          rightIcon={
            <PasswordToggleButton
              visible={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
            />
          }
          {...register('password')}
        />
        {errors.password && (
          <HelperText error>{errors.password.message}</HelperText>
        )}
      </div>

      <Button
        type="submit"
        color="primary"
        variant="solid"
        size="lg"
        className="mt-2 w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
}
