'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
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
        <SessionGuard>{children}</SessionGuard>
      </SessionProvider>
    </QueryClientProvider>
  );
}
