import Link from 'next/link';
import type { MenuSection } from '@/components/navigation/SideMenu/types';
import { cn } from '@/utils/cn';

export type {
  MenuItem,
  MenuSection,
} from '@/components/navigation/SideMenu/types';

interface Props {
  sections: MenuSection[];
}

const DEFAULT_ICON_SIZE = 24;

export function SideMenu({ sections }: Props) {
  return (
    <nav className="flex flex-col p-4 md:pt-0 space-y-2">
      {sections.map((section, index) => (
        <div key={section.title ?? index} className="space-y-2">
          {/* セクションタイトル */}
          {section.title && (
            <p className="text-sm text-text-subtle">{section.title}</p>
          )}

          {/* メニューアイテム */}
          {section.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'px-3 py-2.5 flex gap-x-4 items-center transition-colors rounded-md cursor-pointer text-sm',
                item.isActive ? 'bg-bg-elevated' : 'hover:bg-bg-surface',
              )}
            >
              <item.icon size={item.iconSize ?? DEFAULT_ICON_SIZE} />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
