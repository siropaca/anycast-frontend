'use client';

import { ScrollArea } from '@base-ui/react/scroll-area';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
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
  const pathname = usePathname();
  const viewportRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally used to trigger scroll reset on route change
  useEffect(() => {
    viewportRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>{sideMenu}</Sidebar>

      <div
        className={cn('min-w-0 flex-1 md:pr-4 flex', !hasPlayer && 'md:pb-4')}
      >
        <ScrollArea.Root className="relative bg-bg-surface rounded-none md:rounded-md flex-1 min-w-0">
          <ScrollArea.Viewport
            ref={viewportRef}
            id={MAIN_SCROLL_VIEWPORT_ID}
            className="h-full md:p-6 md:pt-5 p-4 pt-3"
          >
            <main>{children}</main>

            <div className="text-center pb-4 pt-8 space-y-4 mt-6">
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
