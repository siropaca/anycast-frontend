'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Pages } from '@/libs/pages';

interface Props {
  isLoggedIn: boolean;
}

// TODO: 仮コンポーネント
export function AuthButton({ isLoggedIn }: Props) {
  if (isLoggedIn) {
    return (
      <button
        type="button"
        className="border"
        onClick={() => signOut({ callbackUrl: Pages.home.path() })}
      >
        ログアウト
      </button>
    );
  }

  return (
    <Link href={Pages.login.path()} className="underline">
      ログイン
    </Link>
  );
}
