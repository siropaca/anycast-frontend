'use client';

import { usePathname } from 'next/navigation';
import {
  withActiveState,
  withProfileHref,
} from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import {
  MAIN_MENU_SECTIONS,
  MY_PAGE_SECTION,
} from '@/features/app/constants/mainMenu';

interface Props {
  isLoggedIn: boolean;
  username?: string;
}

export function MainLayoutSideMenu({ isLoggedIn, username }: Props) {
  const pathname = usePathname();

  const sections = isLoggedIn
    ? [...MAIN_MENU_SECTIONS, MY_PAGE_SECTION]
    : MAIN_MENU_SECTIONS;

  const sectionsWithProfile = username
    ? withProfileHref(sections, username)
    : sections;

  const sectionsWithActive = withActiveState(sectionsWithProfile, pathname);

  return <SideMenu sections={sectionsWithActive} />;
}
