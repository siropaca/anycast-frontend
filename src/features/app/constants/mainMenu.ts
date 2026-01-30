import {
  CheckSquareOffsetIcon,
  ClockCounterClockwiseIcon,
  CompassIcon,
  HouseIcon,
  PlaylistIcon,
  ThumbsUpIcon,
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
        label: Pages.library.playList.title,
        href: Pages.library.playList.path(),
        icon: PlaylistIcon,
      },
      {
        label: Pages.library.likes.title,
        href: Pages.library.likes.path(),
        icon: ThumbsUpIcon,
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
