'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { useUpdateUsername } from '@/features/settings/account/hooks/useUpdateUsername';
import {
  type UsernameFormInput,
  usernameFormSchema,
} from '@/features/settings/account/schemas/username';

export function UsernameSection() {
  const { currentUsername, isUpdating, error, updateUsername, clearError } =
    useUpdateUsername();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UsernameFormInput>({
    resolver: zodResolver(usernameFormSchema),
    values: { username: currentUsername },
  });

  function handleFormSubmit(data: UsernameFormInput) {
    clearError();
    updateUsername(data.username);
  }

  return (
    <section className="space-y-4">
      <SectionTitle
        title="ユーザー名"
        description="プロフィールページの URL に使用されます"
        level="h3"
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField label="ユーザー名" error={errors.username?.message}>
          {({ id, hasError }) => (
            <Input
              id={id}
              maxLength={20}
              showCounter
              error={hasError}
              {...register('username')}
            />
          )}
        </FormField>

        {error && <HelperText error>{error}</HelperText>}

        <Button
          type="submit"
          disabled={!isDirty}
          disabledReason="変更がありません"
          loading={isUpdating}
        >
          保存
        </Button>
      </form>
    </section>
  );
}
