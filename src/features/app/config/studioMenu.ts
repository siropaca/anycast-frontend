import {
  SquaresFourIcon,
  UserSoundIcon,
  VideoIcon,
} from '@phosphor-icons/react';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';
import { Pages } from '@/libs/pages';

export const STUDIO_MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        label: Pages.studio.dashboard.title,
        href: Pages.studio.dashboard.path(),
        icon: SquaresFourIcon,
        matchPaths: [Pages.studio.index.path()],
      },
      {
        label: Pages.studio.channels.title,
        href: Pages.studio.channels.path(),
        icon: VideoIcon,
        matchPrefix: ['/studio/channels/'],
      },
      {
        label: Pages.studio.characters.title,
        href: Pages.studio.characters.path(),
        icon: UserSoundIcon,
      },
    ],
  },
];
