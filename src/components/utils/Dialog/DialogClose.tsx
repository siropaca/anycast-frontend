'use client';

import { Dialog } from '@base-ui/react/dialog';
import { XIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children?: ReactNode;
}

export function DialogClose({ className, children }: Props) {
  const isIconButton = !children;

  return (
    <Dialog.Close
      className={cn(
        isIconButton &&
          'absolute top-4 right-4 cursor-pointer text-text-subtle transition-colors hover:text-text-main',
        className,
      )}
    >
      {children ?? <XIcon size={20} aria-label="閉じる" />}
    </Dialog.Close>
  );
}
