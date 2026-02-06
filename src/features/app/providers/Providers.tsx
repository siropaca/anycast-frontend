'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/components/feedback/Toast/ToastProvider';
import { BottomPlayer } from '@/features/player/components/BottomPlayer';
import { useQueryClient } from '@/libs/api/useQueryClient';
import { SessionGuard } from '@/libs/auth/SessionGuard';

/** セッション再取得の間隔（秒） */
const SESSION_REFETCH_INTERVAL_SECONDS = 4 * 60; // 4min

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider
        refetchInterval={SESSION_REFETCH_INTERVAL_SECONDS}
        refetchOnWindowFocus
      >
        <ToastProvider>
          <SessionGuard>
            <div className="flex flex-col h-screen">
              <div className="flex-1 min-h-0">{children}</div>
              <BottomPlayer />
            </div>
          </SessionGuard>
        </ToastProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
