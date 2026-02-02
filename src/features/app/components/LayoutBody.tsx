'use client';

import { ScrollArea } from '@base-ui/react/scroll-area';
import { Copyright } from '@/components/navigation/Copyright/Copyright';
import { FooterLinks } from '@/components/navigation/FooterLinks/FooterLinks';
import { Sidebar } from '@/components/navigation/Sidebar/Sidebar';
import { useBottomPlayer } from '@/features/player/hooks/useBottomPlayer';
import { cn } from '@/utils/cn';

export const MAIN_SCROLL_VIEWPORT_ID = 'main-scroll-viewport';

interface Props {
  sideMenu: React.ReactNode;
  children: React.ReactNode;
}

export function LayoutBody({ sideMenu, children }: Props) {
  const { hasPlayer } = useBottomPlayer();

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>{sideMenu}</Sidebar>

      <div
        className={cn('min-w-0 flex-1 px-4 md:pl-0 flex', !hasPlayer && 'pb-4')}
      >
        <ScrollArea.Root className="bg-bg-surface rounded-md flex-1 min-w-0">
          <ScrollArea.Viewport
            id={MAIN_SCROLL_VIEWPORT_ID}
            className="h-full p-6 pt-5"
          >
            <main>{children}</main>

            <div className="text-center pb-6 pt-10 space-y-4 mt-6">
              <FooterLinks />
              <Copyright />
            </div>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent pl-1 py-2">
            <ScrollArea.Thumb className="w-full rounded-full bg-bg-elevated/75" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}
