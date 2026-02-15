import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function DrawerHeader({ className, children }: Props) {
  return (
    <div
      className={cn(
        'flex items-center h-header-mobile md:h-header-desktop shrink-0 px-4 gap-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
