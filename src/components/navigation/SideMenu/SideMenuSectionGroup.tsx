import { SideMenuItem } from '@/components/navigation/SideMenu/SideMenuItem';
import type { MenuSection } from '@/components/navigation/SideMenu/types';

interface Props {
  section: MenuSection;
}

export function SideMenuSectionGroup({ section }: Props) {
  return (
    <div className="space-y-2">
      {section.title && (
        <p className="text-sm text-text-subtle tracking-[1.5px]">
          {section.title}
        </p>
      )}

      {section.items.map((item) => (
        <SideMenuItem key={item.label} item={item} />
      ))}
    </div>
  );
}
