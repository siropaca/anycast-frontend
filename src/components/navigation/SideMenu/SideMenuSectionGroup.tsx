import { SideMenuItem } from '@/components/navigation/SideMenu/SideMenuItem';
import type { MenuSection } from '@/components/navigation/SideMenu/types';

interface Props {
  section: MenuSection;
}

export function SideMenuSectionGroup({ section }: Props) {
  return (
    <div className="space-y-2">
      {section.titleComponent ? (
        <div className="flex justify-center rounded-[9px] bg-white px-3 py-2 text-black">
          <section.titleComponent />
        </div>
      ) : (
        section.title && (
          <p className="text-sm text-text-subtle tracking-[1.5px]">
            {section.title}
          </p>
        )
      )}

      {section.items.map((item) => (
        <SideMenuItem key={item.label} item={item} />
      ))}
    </div>
  );
}
