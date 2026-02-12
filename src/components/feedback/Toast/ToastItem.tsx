'use client';

import { Toast } from '@base-ui/react/toast';
import { CheckCircleIcon, InfoIcon, XCircleIcon } from '@phosphor-icons/react';
import { ToastClose } from '@/components/feedback/Toast/ToastClose';
import type { ToastObject, ToastType } from '@/components/feedback/Toast/types';
import { cn } from '@/utils/cn';

const iconMap: Record<ToastType, typeof CheckCircleIcon> = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  info: InfoIcon,
};

const iconColorMap: Record<ToastType, string> = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
};

interface Props {
  toast: ToastObject;
}

export function ToastItem({ toast }: Props) {
  const type = toast.data?.type ?? 'success';
  const Icon = iconMap[type];
  const iconColor = iconColorMap[type];

  return (
    <Toast.Root
      toast={toast}
      swipeDirection="right"
      className={cn(
        'relative flex w-80 items-center gap-3 rounded-md border border-border bg-bg-elevated p-4 shadow-lg',
        '[transition:transform_0.4s_cubic-bezier(0.22,1,0.36,1),opacity_0.4s]',
        'data-[starting-style]:translate-x-[calc(100%+1rem)] data-[starting-style]:opacity-0',
        'data-[ending-style]:translate-x-[calc(100%+1rem)] data-[ending-style]:opacity-0',
      )}
    >
      <Icon size={20} weight="fill" className={cn('shrink-0', iconColor)} />

      <Toast.Content className="flex-1 overflow-hidden">
        <Toast.Title className="text-sm font-medium text-text-main" />
        <Toast.Description className="mt-1 text-sm text-text-subtle" />
      </Toast.Content>

      <ToastClose />
    </Toast.Root>
  );
}
