import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function ModalHeader({ className, children }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-border px-6 py-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
