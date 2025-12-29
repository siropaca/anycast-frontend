import Link from 'next/link';
import { HeaderSearchInput } from '@/components/navigation/HeaderSearchInput';
import { AuthButton } from '@/features/auth/ui/AuthButton';
import { Pages } from '@/libs/pages';

interface Props {
  isLoggedIn: boolean;
}

export function Header({ isLoggedIn }: Props) {
  return (
    <header className="flex h-header items-center justify-between border-b px-4">
      <Link href={Pages.home.path()} className="text-xl font-bold">
        anycast
      </Link>

      <HeaderSearchInput />

      <div className="space-x-6">
        {isLoggedIn && (
          <Link href={Pages.studio.index.path()} className="underline">
            作成
          </Link>
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
