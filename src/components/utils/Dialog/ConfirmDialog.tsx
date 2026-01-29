'use client';

import type { ReactNode } from 'react';
import { Button } from '@/components/inputs/buttons/Button/Button';
import type { ButtonColor } from '@/components/inputs/buttons/buttonVariants';
import { Dialog } from '@/components/utils/Dialog/Dialog';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  trigger: ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: ButtonColor;
  size?: Size;
  open?: boolean;

  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  confirmColor = 'primary',
  size = 'sm',
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content size={size}>
        <Dialog.Title>{title}</Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}

        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="outline" color="secondary">
              {cancelLabel}
            </Button>
          </Dialog.Close>

          <Button color={confirmColor} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
