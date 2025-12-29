import Link from 'next/link';
import { Sidebar } from '@/components/navigation/Sidebar';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

interface Props {
  children: React.ReactNode;
}

const menuItems = [
  { label: Pages.home.title, href: Pages.home.path() },
  { label: Pages.explore.title, href: Pages.explore.path() },
];

const libraryItems = [
  {
    label: Pages.library.following.title,
    href: Pages.library.following.path(),
  },
  {
    label: Pages.library.bookmarks.title,
    href: Pages.library.bookmarks.path(),
  },
  {
    label: Pages.library.favorites.title,
    href: Pages.library.favorites.path(),
  },
];

const myPageItems = [
  { label: '作成したチャンネル', href: Pages.studio.channels.path() },
  { label: Pages.settings.index.title, href: Pages.settings.index.path() },
];

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <Sidebar>
        <nav className="flex flex-col gap-1 p-4">
          {/* メニューアイテム */}
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} className="px-3 py-2">
              {item.label}
            </Link>
          ))}

          {/* ライブラリ */}
          <div className="mt-4">
            <p className="px-3 py-2 text-sm">[ライブラリ]</p>
            {libraryItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* マイページ */}
          {isLoggedIn && (
            <div className="mt-4">
              <p className="px-3 py-2 text-sm">[マイページ]</p>
              {myPageItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </Sidebar>

      {/* コンテンツ */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
