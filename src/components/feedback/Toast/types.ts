import type { ToastObject as BaseToastObject } from '@base-ui/react/toast';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastData {
  type: ToastType;
}

export type ToastObject = BaseToastObject<ToastData>;
