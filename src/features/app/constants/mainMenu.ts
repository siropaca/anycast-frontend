import {
  BookmarkSimpleIcon,
  CheckSquareOffsetIcon,
  ClockCounterClockwiseIcon,
  CompassIcon,
  HeartIcon,
  HouseIcon,
  UserIcon,
  VideoIcon,
} from '@phosphor-icons/react';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';
import { Pages } from '@/libs/pages';

export const MAIN_MENU_SECTIONS: MenuSection[] = [
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
        icon: CompassIcon,
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
        icon: BookmarkSimpleIcon,
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

export const MY_PAGE_SECTION: MenuSection = {
  title: 'マイページ',
  items: [
    {
      label: 'プロフィール',
      href: '#', // コンポーネント側で書き換え
      icon: UserIcon,
    },
    {
      label: '作成したチャンネル',
      href: Pages.studio.channels.path(),
      icon: VideoIcon,
    },
  ],
};
