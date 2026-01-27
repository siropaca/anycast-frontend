'use client';

import { Menu } from '@base-ui/react/menu';
import { GearIcon, PlusIcon, SignOutIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { Button } from '@/components/inputs/Button/Button';
import { HeaderSearchInput } from '@/components/navigation/Header/HeaderSearchInput';
import { MobileMenu } from '@/components/navigation/MobileMenu/MobileMenu';
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

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Button
            href={Pages.studio.index.path()}
            leftIcon={<PlusIcon size={16} />}
          >
            作成
          </Button>
        )}

        {isLoggedIn ? (
          <Menu.Root>
            <Menu.Trigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Avatar fallback="U" />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={8}>
                <Menu.Popup className="min-w-40 rounded-lg border border-border bg-bg-elevated p-1 shadow-lg">
                  <Menu.Item
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-white/10 focus:bg-white/10"
                    render={<Link href={Pages.settings.index.path()} />}
                  >
                    <GearIcon size={16} />
                    設定
                  </Menu.Item>
                  <Menu.Item
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-white/10 focus:bg-white/10"
                    onClick={() => signOut({ callbackUrl: Pages.home.path() })}
                  >
                    <SignOutIcon size={16} />
                    ログアウト
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="text" href={Pages.signup.path()}>
              サインアップ
            </Button>
            <Button href={Pages.login.path()}>ログイン</Button>
          </div>
        )}
      </div>
    </header>
  );
}
