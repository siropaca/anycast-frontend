'use client';

import { PlusIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '@/components/inputs/Button/Button';
import { HeaderSearchInput } from '@/components/navigation/Header/HeaderSearchInput';
import { MobileMenu } from '@/components/navigation/MobileMenu/MobileMenu';
import { AuthButton } from '@/features/auth/components/AuthButton';
import { Pages } from '@/libs/pages';

interface Props {
  isLoggedIn: boolean;
  sideMenu?: React.ReactNode;
}

export function Header({ isLoggedIn, sideMenu }: Props) {
  return (
    <header className="flex h-header shrink-0 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {sideMenu && <MobileMenu>{sideMenu}</MobileMenu>}

        <Link
          href={Pages.home.path()}
          className="text-xl font-bold text-primary"
        >
          Anycast
        </Link>
      </div>

      <HeaderSearchInput />

      <div className="flex items-center gap-6">
        {isLoggedIn && (
          <Button
            href={Pages.studio.index.path()}
            leftIcon={<PlusIcon size={16} />}
          >
            作成
          </Button>
        )}

        {isLoggedIn && (
          <Link href={Pages.settings.index.path()} className="underline">
            設定
          </Link>
        )}

        <AuthButton isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
