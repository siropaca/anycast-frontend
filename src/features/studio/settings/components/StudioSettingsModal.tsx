'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';
import { useUpdateUserPrompt } from '@/features/studio/settings/hooks/useUpdateUserPrompt';
import {
  type StudioSettingsFormInput,
  studioSettingsFormSchema,
} from '@/features/studio/settings/schemas/studioSettings';
import { useDiscardGuard } from '@/hooks/useDiscardGuard';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function StudioSettingsModal({ open, onOpenChange }: Props) {
  const { currentUserPrompt, isLoading, isUpdating, error, updateUserPrompt } =
    useUpdateUserPrompt();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, errors },
  } = useForm<StudioSettingsFormInput>({
    resolver: zodResolver(studioSettingsFormSchema),
    values: {
      userPrompt: currentUserPrompt,
    },
  });

  const guardedOnOpenChange = useDiscardGuard(onOpenChange, isDirty);

  function onSubmit() {
    handleSubmit((data) => {
      updateUserPrompt(data.userPrompt, {
        onSuccess: () => onOpenChange(false),
      });
    })();
  }

  return (
    <Modal.Root open={open} onOpenChange={guardedOnOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>スタジオ設定</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>
          {isLoading ? (
            <p>読み込み中...</p>
          ) : (
            <div className="space-y-4">
              <FormLabel
                htmlFor="userPrompt"
                helpText="すべてのチャンネルとエピソードで適用されるプロンプトです。"
              >
                共通プロンプト
              </FormLabel>
              <Textarea
                id="userPrompt"
                rows={8}
                className="w-full"
                maxLength={2000}
                showCounter
                error={!!errors.userPrompt}
                value={watch('userPrompt')}
                {...register('userPrompt')}
              />
              {errors.userPrompt && (
                <p className="text-sm text-text-danger">
                  {errors.userPrompt.message}
                </p>
              )}
              {error && <p className="text-sm text-text-danger">{error}</p>}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary" disabled={isUpdating}>
              キャンセル
            </Button>
          </Modal.Close>

          <Button disabled={!isDirty || isUpdating} onClick={onSubmit}>
            {isUpdating ? '処理中...' : '保存'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
