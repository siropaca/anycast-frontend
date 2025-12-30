import {
  BookmarkIcon,
  CheckSquareOffsetIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  HeartIcon,
  HouseIcon,
  RocketLaunchIcon,
  VideoIcon,
} from '@phosphor-icons/react/ssr';
import { Sidebar } from '@/components/navigation/Sidebar';
import type { MenuSection } from '@/components/navigation/SideMenu';
import { SideMenu } from '@/components/navigation/SideMenu';
import { auth } from '@/libs/auth/auth';
import { Pages } from '@/libs/pages';

interface Props {
  children: React.ReactNode;
}

const MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        label: Pages.home.title,
        href: Pages.home.path(),
        icon: HouseIcon,
      },
      {
        label: Pages.explore.title,
        href: Pages.explore.path(),
        icon: RocketLaunchIcon,
      },
    ],
  },
  {
    title: 'ライブラリ',
    items: [
      {
        label: Pages.library.following.title,
        href: Pages.library.following.path(),
        icon: CheckSquareOffsetIcon,
      },
      {
        label: Pages.library.bookmarks.title,
        href: Pages.library.bookmarks.path(),
        icon: BookmarkIcon,
      },
      {
        label: Pages.library.favorites.title,
        href: Pages.library.favorites.path(),
        icon: HeartIcon,
      },
      {
        label: Pages.library.history.title,
        href: Pages.library.history.path(),
        icon: ClockCounterClockwiseIcon,
      },
    ],
  },
];

const MY_PAGE_SECTION: MenuSection = {
  title: 'マイページ',
  items: [
    {
      label: '作成したチャンネル',
      href: Pages.studio.channels.path(),
      icon: VideoIcon,
    },
    {
      label: Pages.settings.index.title,
      href: Pages.settings.index.path(),
      icon: GearIcon,
    },
  ],
};

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  const sections = isLoggedIn
    ? [...MENU_SECTIONS, MY_PAGE_SECTION]
    : MENU_SECTIONS;

  return (
    <div className="flex flex-1">
      <Sidebar>
        <SideMenu sections={sections} />
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
