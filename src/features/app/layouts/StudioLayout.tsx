import { Sidebar } from '@/components/navigation/Sidebar';
import { SideMenu } from '@/components/navigation/SideMenu';
import { STUDIO_MENU_SECTIONS } from '@/features/app/config/studioMenu';

interface Props {
  children: React.ReactNode;
}

export function StudioLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <SideMenu sections={STUDIO_MENU_SECTIONS} />
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
