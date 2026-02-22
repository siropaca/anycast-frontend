'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';
import type { useCreateApiKeyModal } from '@/features/settings/apiKeys/hooks/useCreateApiKeyModal';
import {
  type CreateApiKeyInput,
  createApiKeySchema,
} from '@/features/settings/apiKeys/schemas/apiKey';

interface Props {
  createModal: ReturnType<typeof useCreateApiKeyModal>;
}

export function ApiKeyCreateModal({ createModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateApiKeyInput>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: { name: '' },
  });

  useEffect(() => {
    if (createModal.isOpen) {
      reset({ name: '' });
    }
  }, [createModal.isOpen, reset]);

  const name = watch('name');

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      createModal.close();
    }
  }

  const error = errors.name?.message || createModal.error;

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={createModal.isOpen}
      title="APIキーを作成"
      submitLabel="作成"
      submitDisabled={!name.trim()}
      submitDisabledReason="キー名を入力してください"
      isSubmitting={createModal.isCreating}
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit((data) => createModal.submit(data.name))}
    >
      <div className="space-y-6">
        <FormField label="キー名" required error={error}>
          {({ id, hasError }) => (
            <Input
              id={id}
              placeholder="キー名を入力"
              maxLength={100}
              showCounter
              error={hasError}
              disabled={createModal.isCreating}
              value={name}
              {...register('name')}
            />
          )}
        </FormField>
      </div>
    </FormModal>
  );
}
