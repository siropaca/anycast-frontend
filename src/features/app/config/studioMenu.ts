import { SquaresFourIcon, VideoIcon } from '@phosphor-icons/react/ssr';
import type { MenuSection } from '@/components/navigation/SideMenu';
import { Pages } from '@/libs/pages';

export const STUDIO_MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        label: Pages.studio.dashboard.title,
        href: Pages.studio.dashboard.path(),
        icon: SquaresFourIcon,
      },
      {
        label: Pages.studio.channels.title,
        href: Pages.studio.channels.path(),
        icon: VideoIcon,
      },
    ],
  },
];
