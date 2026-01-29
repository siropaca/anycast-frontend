'use client';

import { Dialog } from '@base-ui/react/dialog';
import type { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export function DialogTrigger({ className, children }: Props) {
  return <Dialog.Trigger className={className}>{children}</Dialog.Trigger>;
}
