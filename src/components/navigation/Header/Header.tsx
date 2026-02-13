import { PlusIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { TextLogo } from '@/components/dataDisplay/TextLogo/TextLogo';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { HeaderAvatarMenu } from '@/components/navigation/Header/HeaderAvatarMenu';
import { HeaderMobileSearch } from '@/components/navigation/Header/HeaderMobileSearch';
import { HeaderSearchInput } from '@/components/navigation/Header/HeaderSearchInput';
import { MobileMenu } from '@/components/navigation/MobileMenu/MobileMenu';
import { HeaderNotificationButton } from '@/features/notification/components/HeaderNotificationButton';
import { Pages } from '@/libs/pages';

interface Props {
  isLoggedIn: boolean;
  sideMenu?: React.ReactNode;
}

export function Header({ isLoggedIn, sideMenu }: Props) {
  return (
    <header className="flex h-header shrink-0 items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-2">
        {sideMenu && <MobileMenu>{sideMenu}</MobileMenu>}

        <Link href={Pages.home.path()} aria-label="Anycast ホーム">
          <TextLogo className="h-5 w-auto md:ml-1" />
        </Link>
      </div>

      <div className="hidden md:block">
        <HeaderSearchInput />
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <HeaderMobileSearch />

        {isLoggedIn && (
          <>
            <IconButton
              icon={<PlusIcon size={20} />}
              aria-label="作成"
              href={Pages.studio.channels.path()}
              className="md:hidden"
            />
            <Button
              href={Pages.studio.channels.path()}
              leftIcon={<PlusIcon size={18} />}
              className="hidden md:inline-flex"
            >
              作成
            </Button>
          </>
        )}

        {isLoggedIn ? (
          <>
            <HeaderNotificationButton />
            <HeaderAvatarMenu />
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="text" color="secondary" href={Pages.signup.path()}>
              新規登録
            </Button>

            <Button href={Pages.login.path()}>ログイン</Button>
          </div>
        )}
      </div>
    </header>
  );
}
