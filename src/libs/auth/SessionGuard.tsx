'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Pages } from '@/libs/pages';

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      signOut({ callbackUrl: Pages.login.path() });
    }
  }, [session?.error]);

  return <>{children}</>;
}
