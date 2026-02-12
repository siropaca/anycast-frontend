'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';
import {
  DEFAULT_DURATION_MINUTES,
  EPISODE_DURATION_OPTIONS,
  type ScriptGenerateFormInput,
  scriptGenerateFormSchema,
} from '@/features/studio/episodes/schemas/scriptGenerate';

interface Props {
  open: boolean;
  restoredPrompt: string | null;
  restoredDurationMinutes: number | null;

  onClose: () => void;
  onSubmit: (data: ScriptGenerateFormInput) => void;
}

const DURATION_SELECT_OPTIONS = EPISODE_DURATION_OPTIONS.map((duration) => ({
  label: `${duration}分`,
  value: String(duration),
}));

export function ScriptGenerateModal({
  open,
  restoredPrompt,
  restoredDurationMinutes,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ScriptGenerateFormInput>({
    resolver: zodResolver(scriptGenerateFormSchema),
    defaultValues: {
      prompt: restoredPrompt ?? '',
      durationMinutes: restoredDurationMinutes ?? DEFAULT_DURATION_MINUTES,
    },
  });

  // 非同期取得した最新完了ジョブのプロンプトをフォームに反映
  useEffect(() => {
    if (isDirty) return;
    if (restoredPrompt == null && restoredDurationMinutes == null) return;

    resetForm({
      prompt: restoredPrompt ?? '',
      durationMinutes: restoredDurationMinutes ?? DEFAULT_DURATION_MINUTES,
    });
  }, [restoredPrompt, restoredDurationMinutes, isDirty, resetForm]);

  function handleFormSubmit(data: ScriptGenerateFormInput) {
    onSubmit(data);
  }

  function handleDurationChange(value: string | null) {
    if (value) {
      setValue('durationMinutes', Number(value), { shouldDirty: true });
    }
  }

  const durationMinutes = watch('durationMinutes');

  return (
    <Modal.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Content size="lg">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Modal.Header>
            <Modal.Title>台本を作成</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body className="space-y-4">
            <FormField label="台本プロンプト" error={errors.prompt?.message}>
              {({ id, hasError }) => (
                <Textarea
                  id={id}
                  placeholder="どんな内容のポッドキャストを作成しますか？"
                  rows={8}
                  error={hasError}
                  maxLength={2000}
                  showCounter
                  value={watch('prompt')}
                  {...register('prompt')}
                />
              )}
            </FormField>

            <FormField
              label="エピソードの長さ（目安）"
              error={errors.durationMinutes?.message}
            >
              {() => (
                <Select
                  options={DURATION_SELECT_OPTIONS}
                  value={String(durationMinutes)}
                  onValueChange={handleDurationChange}
                />
              )}
            </FormField>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              variant="outline"
              color="secondary"
              onClick={onClose}
            >
              キャンセル
            </Button>
            <Button type="submit">台本を作成</Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
