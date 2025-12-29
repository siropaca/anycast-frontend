import Link from 'next/link';
import { Sidebar } from '@/features/app/ui/Sidebar';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

interface Props {
  children: React.ReactNode;
}

const menuItems = [
  { label: Pages.home.title, href: Pages.home.path() },
  { label: Pages.search.title, href: Pages.search.path() },
];

const libraryItems = [
  {
    label: Pages.library.favorites.title,
    href: Pages.library.favorites.path(),
  },
  {
    label: Pages.library.following.title,
    href: Pages.library.following.path(),
  },
];

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-1">
      {/* サイドバー */}
      <Sidebar>
        <nav className="flex flex-col gap-1 p-4">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} className="px-3 py-2">
              {item.label}
            </Link>
          ))}

          {isLoggedIn && (
            <div className="mt-2">
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
          )}
        </nav>
      </Sidebar>

      {/* コンテンツ */}
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
