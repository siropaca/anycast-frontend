import { UserIcon, WalletIcon } from '@phosphor-icons/react/ssr';
import type { MenuSection } from '@/components/navigation/SideMenu';
import { Pages } from '@/libs/pages';

export const SETTINGS_MENU_SECTIONS: MenuSection[] = [
  {
    items: [
      {
        label: Pages.settings.account.title,
        href: Pages.settings.account.path(),
        icon: UserIcon,
      },
      {
        label: Pages.settings.subscription.title,
        href: Pages.settings.subscription.path(),
        icon: WalletIcon,
      },
    ],
  },
];
