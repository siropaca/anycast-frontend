'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { withActiveState } from '@/components/navigation/SideMenu/helper';
import { SideMenu } from '@/components/navigation/SideMenu/SideMenu';
import { FeedbackDrawer } from '@/features/app/components/FeedbackDrawer';
import { createFeedbackSection } from '@/features/app/constants/feedbackMenu';
import { createStudioMenuSections } from '@/features/app/constants/studioMenu';

export function StudioLayoutSideMenu() {
  const pathname = usePathname();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { sections, bottomSections } = createStudioMenuSections();
  const feedbackSection = createFeedbackSection(() => setFeedbackOpen(true));

  return (
    <>
      <SideMenu
        sections={withActiveState(sections, pathname)}
        bottomSections={[
          ...withActiveState(bottomSections, pathname),
          feedbackSection,
        ]}
      />
      <FeedbackDrawer open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
}
