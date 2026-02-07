'use client';

import { Toast } from '@base-ui/react/toast';
import type { ReactNode } from 'react';
import { ToastList } from '@/components/feedback/Toast/ToastList';

interface Props {
  children: ReactNode;
}

export function ToastProvider({ children }: Props) {
  return (
    <Toast.Provider timeout={3000} limit={3}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className="fixed top-4 right-4 z-(--z-toast) flex flex-col gap-3">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
