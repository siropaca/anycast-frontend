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
    <nav className="flex flex-col gap-1 p-4">
      {sections.map((section, index) => (
        <div
          key={section.title ?? index}
          className={cn('space-y-2', index > 0 && 'mt-4')}
        >
          {section.title && (
            <p className="px-3 py-2 text-sm">[{section.title}]</p>
          )}

          {section.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'px-3 py-2 flex gap-x-4 items-center transition-colors',
                item.isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white',
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
