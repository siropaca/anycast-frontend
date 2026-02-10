'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';
import {
  type GenerateAudioFormInput,
  generateAudioFormSchema,
} from '@/features/studio/episodes/schemas/generateAudio';

interface Props {
  open: boolean;
  defaultVoiceStyle: string;
  hasScriptLines: boolean;

  onClose: () => void;
  onSubmit: (data: GenerateAudioFormInput) => void;
}

export function GenerateAudioModal({
  open,
  defaultVoiceStyle,
  hasScriptLines,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<GenerateAudioFormInput>({
    resolver: zodResolver(generateAudioFormSchema),
    defaultValues: {
      voiceStyle: defaultVoiceStyle,
    },
  });

  function handleFormSubmit(data: GenerateAudioFormInput) {
    onSubmit(data);
  }

  return (
    <Modal.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Content size="lg">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Modal.Header>
            <Modal.Title>音声を生成</Modal.Title>
            <Modal.Close />
          </Modal.Header>

          <Modal.Body className="space-y-4">
            <FormField label="音声スタイル" error={errors.voiceStyle?.message}>
              {({ id, hasError }) => (
                <Textarea
                  id={id}
                  placeholder="音声のスタイルを指定（例: 明るくテンポよく）"
                  rows={5}
                  error={hasError}
                  maxLength={500}
                  showCounter
                  value={watch('voiceStyle')}
                  {...register('voiceStyle')}
                />
              )}
            </FormField>

            {!hasScriptLines && (
              <p className="text-sm text-text-subtle">
                台本がないため、音声を生成できません。先に台本を作成してください。
              </p>
            )}
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
            <Button type="submit" disabled={!hasScriptLines}>
              音声を生成
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
