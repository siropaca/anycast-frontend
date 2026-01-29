import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function ModalFooter({ className, children }: Props) {
  return (
    <div
      className={cn(
        'flex justify-end gap-3 border-t border-border px-6 py-4',
        className,
      )}
    >
      {children}
    </div>
  );
}
