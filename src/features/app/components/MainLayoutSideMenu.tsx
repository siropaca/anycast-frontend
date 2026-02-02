'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  withActiveState,
  withProfileHref,
} from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { FeedbackDrawer } from '@/features/app/components/FeedbackDrawer';
import { createFeedbackSection } from '@/features/app/constants/feedbackMenu';
import {
  LIBRARY_SECTION,
  MAIN_MENU_SECTIONS,
  MY_PAGE_SECTION,
} from '@/features/app/constants/mainMenu';

interface Props {
  isLoggedIn: boolean;
  username?: string;
}

export function MainLayoutSideMenu({ isLoggedIn, username }: Props) {
  const pathname = usePathname();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const sections = isLoggedIn
    ? [...MAIN_MENU_SECTIONS, LIBRARY_SECTION, MY_PAGE_SECTION]
    : MAIN_MENU_SECTIONS;

  const sectionsWithProfile = username
    ? withProfileHref(sections, username)
    : sections;

  const sectionsWithActive = withActiveState(sectionsWithProfile, pathname);
  const feedbackSection = createFeedbackSection(() => setFeedbackOpen(true));

  return (
    <>
      <SideMenu
        sections={sectionsWithActive}
        bottomSections={[feedbackSection]}
      />
      <FeedbackDrawer open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
}
