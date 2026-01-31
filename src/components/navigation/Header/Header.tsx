import { PlusIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { HeaderAvatarMenu } from '@/components/navigation/Header/HeaderAvatarMenu';
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

        <Link
          href={Pages.home.path()}
          className="text-xl font-semibold text-primary"
        >
          Anycast
        </Link>
      </div>

      <HeaderSearchInput />

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Button
            href={Pages.studio.channels.path()}
            leftIcon={<PlusIcon size={18} />}
          >
            作成
          </Button>
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
