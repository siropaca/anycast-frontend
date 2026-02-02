'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Side = 'left' | 'right';

interface Props {
  side?: Side;
  hidden?: boolean;
  className?: string;
  children: ReactNode;
}

const positionClasses: Record<Side, string> = {
  left: 'left-0 data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full',
  right:
    'right-0 data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full',
};

export function DrawerContent({
  side = 'left',
  hidden = false,
  className,
  children,
}: Props) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
          hidden && 'invisible',
        )}
      />

      <Dialog.Popup
        className={cn(
          'fixed inset-y-0 z-50 bg-bg-main flex flex-col',
          'transition-transform duration-200',
          positionClasses[side],
          hidden && 'invisible',
          className,
        )}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}
