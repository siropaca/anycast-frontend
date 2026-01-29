'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function DialogDescription({ className, children }: Props) {
  return (
    <Dialog.Description
      className={cn('mt-2 text-sm text-text-subtle', className)}
    >
      {children}
    </Dialog.Description>
  );
}
