'use client';

import { GearIcon, SignOutIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { Pages } from '@/libs/pages';

export function HeaderAvatarMenu() {
  function handleSignOut() {
    signOut({ callbackUrl: Pages.home.path() });
  }

  return (
    <DropdownMenu
      trigger={
        <button
          type="button"
          className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Avatar fallback="U" />
        </button>
      }
    >
      <DropdownMenuItem
        icon={<GearIcon size={16} />}
        render={<Link href={Pages.settings.index.path()} />}
      >
        設定
      </DropdownMenuItem>

      <DropdownMenuItem
        icon={<SignOutIcon size={16} />}
        onClick={handleSignOut}
      >
        ログアウト
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
