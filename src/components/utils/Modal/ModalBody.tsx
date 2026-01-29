import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: ReactNode;
}

export function ModalBody({ className, children }: Props) {
  return <div className={cn('p-6', className)}>{children}</div>;
}
