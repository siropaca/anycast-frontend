'use client';

import { QueryClient } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { useState } from 'react';

/**
 * QueryClient インスタンスを生成・保持するカスタムフック
 *
 * @returns QueryClient インスタンス
 */
export function useQueryClient() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1min
            retry: (failureCount, error) => {
              // 認証エラー（401, 403）の場合はリトライしない
              if (error instanceof Error) {
                const message = error.message;
                if (
                  message.includes(String(StatusCodes.UNAUTHORIZED)) ||
                  message.includes(String(StatusCodes.FORBIDDEN))
                ) {
                  return false;
                }
              }

              // その他のエラーは3回までリトライ
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return queryClient;
}
