'use client';

import { SideMenuSectionGroup } from '@/components/navigation/SideMenu/SideMenuSectionGroup';
import type { MenuSection } from '@/components/navigation/SideMenu/types';
import { useBottomPlayer } from '@/features/player/hooks/useBottomPlayer';
import { cn } from '@/utils/cn';

export type {
  MenuItem,
  MenuSection,
} from '@/components/navigation/SideMenu/types';

interface Props {
  sections: MenuSection[];
  bottomSections?: MenuSection[];
}

export function SideMenu({ sections, bottomSections }: Props) {
  const { hasPlayer } = useBottomPlayer();

  return (
    <nav
      className={cn(
        'flex h-full flex-col justify-between p-4 md:pt-0',
        hasPlayer ? 'md:pb-0' : 'md:pb-4',
      )}
    >
      {/* 通常メニュー */}
      <div className="space-y-2">
        {sections.map((section, index) => (
          <SideMenuSectionGroup
            key={section.title ?? index}
            section={section}
          />
        ))}
      </div>

      {/* ボトムメニュー */}
      {bottomSections && bottomSections.length > 0 && (
        <div className="space-y-2">
          {bottomSections.map((section, index) => (
            <SideMenuSectionGroup
              key={section.title ?? index}
              section={section}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
