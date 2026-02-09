import { UserIcon, WalletIcon } from '@phosphor-icons/react';
import type { MenuSection } from '@/components/navigation/SideMenu/SideMenu';
import { Pages } from '@/libs/pages';

export const SETTINGS_MENU_SECTIONS: MenuSection[] = [
  {
    title: '設定',
    items: [
      {
        label: Pages.settings.account.title,
        href: Pages.settings.account.path(),
        icon: UserIcon,
        matchPaths: [Pages.settings.index.path()],
      },
      {
        label: Pages.settings.subscription.title,
        href: Pages.settings.subscription.path(),
        icon: WalletIcon,
      },
    ],
  },
];
