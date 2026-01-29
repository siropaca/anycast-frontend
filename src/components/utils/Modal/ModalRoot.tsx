'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

interface Props {
  open?: boolean;
  defaultOpen?: boolean;
  children: ReactNode;

  onOpenChange?: (open: boolean) => void;
}

export function ModalRoot({
  open,
  onOpenChange,
  defaultOpen,
  children,
}: Props) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
    >
      {children}
    </Dialog.Root>
  );
}
