'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import { Modal } from '@/components/utils/Modal/Modal';

interface Props {
  open: boolean;
  defaultPrompt: string;
  isGenerating: boolean;

  onClose: () => void;
  onSubmit: (prompt: string) => void;
}

export function ArtworkGenerateModal({
  open,
  defaultPrompt,
  isGenerating,
  onClose,
  onSubmit,
}: Props) {
  const [prompt, setPrompt] = useState(defaultPrompt);

  useEffect(() => {
    if (open) {
      setPrompt(defaultPrompt);
    }
  }, [open, defaultPrompt]);

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && !isGenerating) {
      onClose();
    }
  }

  function handleSubmit() {
    onSubmit(prompt);
  }

  return (
    <Modal.Root open={open} onOpenChange={handleOpenChange}>
      <Modal.Content size="lg">
        <Modal.Header>
          <Modal.Title>アートワークを生成</Modal.Title>
          {!isGenerating && <Modal.Close />}
        </Modal.Header>

        <Modal.Body className="space-y-4">
          <FormField label="プロンプト">
            {({ id }) => (
              <Textarea
                id={id}
                placeholder="どんなアートワークを生成しますか？"
                rows={6}
                maxLength={2000}
                showCounter
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            )}
          </FormField>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            variant="outline"
            color="secondary"
            disabled={isGenerating}
            onClick={onClose}
          >
            キャンセル
          </Button>
          <Button
            type="button"
            loading={isGenerating}
            disabled={!prompt.trim()}
            onClick={handleSubmit}
          >
            生成
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
