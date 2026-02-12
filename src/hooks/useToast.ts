import { Toast } from '@base-ui/react/toast';
import type { ToastData } from '@/components/feedback/Toast/types';

interface ToastParams {
  title: string;
  description?: string;
}

/**
 * トースト通知を表示するためのフック
 *
 * @returns success / error メソッドを持つオブジェクト
 *
 * @example
 * const toast = useToast()
 * toast.success({ title: '保存しました' })
 * toast.error({ title: 'エラーが発生しました', description: '再度お試しください' })
 */
export function useToast() {
  const manager = Toast.useToastManager();

  /**
   * 成功トーストを表示する
   *
   * @param params - タイトルと説明（任意）
   */
  function success({ title, description }: ToastParams) {
    manager.add<ToastData>({ title, description, data: { type: 'success' } });
  }

  /**
   * エラートーストを表示する
   *
   * @param params - タイトルと説明（任意）
   */
  function error({ title, description }: ToastParams) {
    manager.add<ToastData>({
      title,
      description,
      data: { type: 'error' },
      priority: 'high',
    });
  }

  /**
   * 情報トーストを表示する
   *
   * @param params - タイトルと説明（任意）
   */
  function info({ title, description }: ToastParams) {
    manager.add<ToastData>({ title, description, data: { type: 'info' } });
  }

  return {
    success,
    error,
    info,
  };
}
