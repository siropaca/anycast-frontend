'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { PasswordToggleButton } from '@/components/inputs/buttons/PasswordToggleButton/PasswordToggleButton';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { useChangePassword } from '@/features/settings/account/hooks/useChangePassword';
import {
  type PasswordFormInput,
  passwordFormSchema,
} from '@/features/settings/account/schemas/password';

export function PasswordSection() {
  const { hasPassword, isChanging, error, changePassword, clearError } =
    useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormInput>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function handleFormSubmit(data: PasswordFormInput) {
    clearError();
    changePassword(data.currentPassword ?? '', data.newPassword, () => {
      reset();
    });
  }

  return (
    <section className="space-y-4">
      <SectionTitle
        title="パスワード"
        description={
          hasPassword
            ? 'パスワードを変更します'
            : '新しいパスワードを設定します'
        }
        level="h3"
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {hasPassword && (
          <FormField
            label="現在のパスワード"
            error={errors.currentPassword?.message}
          >
            {({ id, hasError }) => (
              <Input
                id={id}
                type={showCurrentPassword ? 'text' : 'password'}
                autoComplete="current-password"
                error={hasError}
                rightIcon={
                  <PasswordToggleButton
                    visible={showCurrentPassword}
                    onToggle={() => setShowCurrentPassword((prev) => !prev)}
                  />
                }
                {...register('currentPassword')}
              />
            )}
          </FormField>
        )}

        <FormField label="新しいパスワード" error={errors.newPassword?.message}>
          {({ id, hasError }) => (
            <Input
              id={id}
              type={showNewPassword ? 'text' : 'password'}
              autoComplete="new-password"
              error={hasError}
              rightIcon={
                <PasswordToggleButton
                  visible={showNewPassword}
                  onToggle={() => setShowNewPassword((prev) => !prev)}
                />
              }
              {...register('newPassword')}
            />
          )}
        </FormField>

        <FormField
          label="パスワード（確認）"
          error={errors.confirmPassword?.message}
        >
          {({ id, hasError }) => (
            <Input
              id={id}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              error={hasError}
              rightIcon={
                <PasswordToggleButton
                  visible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword((prev) => !prev)}
                />
              }
              {...register('confirmPassword')}
            />
          )}
        </FormField>

        {error && <HelperText error>{error}</HelperText>}

        <Button type="submit" loading={isChanging}>
          {hasPassword ? 'パスワードを変更' : 'パスワードを設定'}
        </Button>
      </form>
    </section>
  );
}
