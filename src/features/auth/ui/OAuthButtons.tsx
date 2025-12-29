'use client';

import { signIn } from 'next-auth/react';
import { Pages } from '@/libs/pages';

interface Props {
  redirectTo?: string;
}

// TODO: 仮コンポーネント
export function OAuthButtons({ redirectTo = Pages.home.path() }: Props) {
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
