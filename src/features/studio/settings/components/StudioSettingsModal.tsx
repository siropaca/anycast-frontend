'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Modal } from '@/components/utils/Modal/Modal';
import { FooterSkeleton } from '@/features/studio/settings/components/FooterSkeleton';
import { GeneralTabContent } from '@/features/studio/settings/components/GeneralTabContent';
import { GeneralTabContentSkeleton } from '@/features/studio/settings/components/GeneralTabContentSkeleton';
import { useUpdateUserPrompt } from '@/features/studio/settings/hooks/useUpdateUserPrompt';
import {
  type StudioSettingsFormInput,
  studioSettingsFormSchema,
} from '@/features/studio/settings/schemas/studioSettings';
import { useDiscardGuard } from '@/hooks/useDiscardGuard';
import { useToast } from '@/hooks/useToast';

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;
}

export function StudioSettingsModal({ open, onOpenChange }: Props) {
  const toast = useToast();
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
        onSuccess: () => {
          onOpenChange(false);
          toast.success({ title: '設定を保存しました' });
        },
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
            <GeneralTabContentSkeleton />
          ) : (
            <GeneralTabContent
              registration={register('userPrompt')}
              value={watch('userPrompt')}
              errors={errors}
              serverError={error}
            />
          )}
        </Modal.Body>

        <Modal.Footer>
          {isLoading ? (
            <FooterSkeleton />
          ) : (
            <>
              <Modal.Close>
                <Button
                  variant="outline"
                  color="secondary"
                  disabled={isUpdating}
                  disabledReason="保存中はキャンセルできません"
                >
                  キャンセル
                </Button>
              </Modal.Close>

              <Button
                disabled={!isDirty || isUpdating}
                disabledReason={isUpdating ? '保存中...' : '変更がありません'}
                onClick={onSubmit}
              >
                {isUpdating ? '処理中...' : '保存'}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
