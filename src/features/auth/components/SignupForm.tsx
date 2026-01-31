'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { PasswordToggleButton } from '@/components/inputs/buttons/PasswordToggleButton/PasswordToggleButton';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { useSignup } from '@/features/auth/hooks/useSignup';
import { type SignupInput, signupSchema } from '@/features/auth/schemas/auth';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

export function SignupForm({ redirectTo = Pages.home.path() }: Props) {
  const { signup, isLoading, error } = useSignup(redirectTo);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data: SignupInput) {
    signup(data);
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
        メールアドレスで登録
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
        <FormLabel htmlFor="displayName">表示名</FormLabel>
        <Input
          id="displayName"
          type="text"
          size="lg"
          autoComplete="name"
          placeholder="表示名を入力（20文字以内）"
          error={!!errors.displayName}
          {...register('displayName')}
        />
        {errors.displayName && (
          <HelperText error>{errors.displayName.message}</HelperText>
        )}
      </div>

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
          autoComplete="new-password"
          placeholder="8文字以上で入力"
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

      <div className="flex flex-col gap-2.5">
        <FormLabel htmlFor="confirmPassword">パスワード（確認）</FormLabel>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          size="lg"
          autoComplete="new-password"
          placeholder="パスワードを再入力"
          error={!!errors.confirmPassword}
          rightIcon={
            <PasswordToggleButton
              visible={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((prev) => !prev)}
            />
          }
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <HelperText error>{errors.confirmPassword.message}</HelperText>
        )}
      </div>

      <Button
        type="submit"
        color="primary"
        variant="solid"
        size="lg"
        className="mt-2 w-full"
        disabled={isLoading}
      >
        {isLoading ? '登録中...' : '新規登録'}
      </Button>
    </form>
  );
}
