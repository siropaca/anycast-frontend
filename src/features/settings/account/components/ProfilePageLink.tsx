'use client';

import { StatusCodes } from 'http-status-codes';
import Link from 'next/link';
import { useGetMeSuspense } from '@/libs/api/generated/me/me';
import { Pages } from '@/libs/pages';

export function ProfilePageLink() {
  const { data: meResponse } = useGetMeSuspense();

  if (meResponse.status !== StatusCodes.OK) {
    return null;
  }

  const username = meResponse.data.data.username;

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
