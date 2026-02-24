'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Pages } from '@/libs/pages';

export function ProfilePageLink() {
  const { data: session } = useSession();
  const username = session?.user?.username;

  if (!username) {
    return null;
  }

  return (
    <p className="text-sm text-text-subtle">
      表示名やアバターなどの基本的な情報は
      <Link
        href={Pages.user.path({ username })}
        className="text-text-link hover:underline"
      >
        プロフィールページ
      </Link>
      から変更できます。
    </p>
  );
}
