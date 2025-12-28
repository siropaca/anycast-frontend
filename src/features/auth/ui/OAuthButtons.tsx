'use client';

import { signIn } from 'next-auth/react';
import { Paths } from '@/libs/paths';

interface Props {
  redirectTo?: string;
}

// TODO: 仮コンポーネント
export function OAuthButtons({ redirectTo = Paths.home() }: Props) {
  return (
    <div>
      <button
        type="button"
        className="border"
        onClick={() => signIn('google', { callbackUrl: redirectTo })}
      >
        Google でログイン
      </button>
    </div>
  );
}
