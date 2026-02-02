import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

import type { FeedbackInput } from '@/features/app/schemas/feedback';
import { usePostFeedbacks } from '@/libs/api/generated/feedbacks/feedbacks';

interface SubmitOptions {
  screenshot?: Blob;
  onSuccess?: () => void;
}

/**
 * フィードバック送信に必要なデータと操作を提供する
 *
 * @returns 送信関数、送信中フラグ、エラー
 */
export function useSubmitFeedback() {
  const mutation = usePostFeedbacks();

  const [error, setError] = useState<string>();

  /**
   * フィードバックを送信する
   *
   * @param data - フォーム入力データ
   * @param options - オプション（スクリーンショット、成功時コールバック）
   */
  function submitFeedback(data: FeedbackInput, options?: SubmitOptions) {
    setError(undefined);

    mutation.mutate(
      {
        data: {
          content: data.content,
          screenshot: options?.screenshot,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        },
      },
      {
        onSuccess: (response) => {
          if (response.status !== StatusCodes.CREATED) {
            setError(
              response.data.error?.message ??
                'フィードバックの送信に失敗しました',
            );
            return;
          }

          options?.onSuccess?.();
        },
        onError: (err: unknown) => {
          const message =
            err instanceof Error
              ? err.message
              : 'フィードバックの送信に失敗しました';
          setError(message);
        },
      },
    );
  }

  return {
    isSubmitting: mutation.isPending,
    error,

    submitFeedback,
  };
}
