'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { FeedbackDrawer } from '@/features/app/components/FeedbackDrawer';
import { createFeedbackSection } from '@/features/app/constants/feedbackMenu';
import { SETTINGS_MENU_SECTIONS } from '@/features/app/constants/settingsMenu';

export function SettingsLayoutSideMenu() {
  const pathname = usePathname();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const sectionsWithActive = withActiveState(SETTINGS_MENU_SECTIONS, pathname);
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
