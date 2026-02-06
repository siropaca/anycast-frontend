'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { Modal } from '@/components/utils/Modal/Modal';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  size?: Size;
  open?: boolean;
  submitDisabled?: boolean;
  submitDisabledReason?: string;
  isSubmitting?: boolean;

  onOpenChange?: (open: boolean) => void;
  onSubmit?: () => void;
}

export function FormModal({
  trigger,
  title,
  children,
  submitLabel = '保存',
  cancelLabel = 'キャンセル',
  size = 'md',
  open,
  submitDisabled = false,
  submitDisabledReason,
  isSubmitting = false,
  onOpenChange,
  onSubmit,
}: Props) {
  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Trigger>{trigger}</Modal.Trigger>

      <Modal.Content size={size}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body>{children}</Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button
              variant="outline"
              color="secondary"
              disabled={isSubmitting}
              disabledReason="処理中はキャンセルできません"
            >
              {cancelLabel}
            </Button>
          </Modal.Close>
          <Button
            disabled={submitDisabled || isSubmitting}
            disabledReason={
              isSubmitting ? '処理中...' : submitDisabledReason
            }
            onClick={onSubmit}
          >
            {isSubmitting ? '処理中...' : submitLabel}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
