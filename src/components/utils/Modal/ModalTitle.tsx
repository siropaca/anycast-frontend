'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function ModalTitle({ className, children }: Props) {
  return (
    <Dialog.Title
      className={cn('text-lg font-semibold text-text-main', className)}
    >
      {children}
    </Dialog.Title>
  );
}
