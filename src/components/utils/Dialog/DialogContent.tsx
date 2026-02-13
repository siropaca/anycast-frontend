'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Size = 'sm' | 'md' | 'lg';

interface Props {
  size?: Size;
  className?: string;
  children: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function DialogContent({ size = 'md', className, children }: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-(--z-backdrop) bg-black/50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />

      <Dialog.Popup
        className={cn(
          'fixed top-1/2 left-1/2 z-(--z-modal) w-[calc(100%-32px)] max-h-[calc(100dvh-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border border-border bg-bg-surface p-6 shadow-xl',
          'transition-all duration-200',
          'data-starting-style:scale-95 data-starting-style:opacity-0',
          'data-ending-style:scale-95 data-ending-style:opacity-0',
          sizeClasses[size],
          className,
        )}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
