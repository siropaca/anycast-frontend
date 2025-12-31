import { Sidebar } from '@/components/navigation/Sidebar';
import { SideMenu } from '@/components/navigation/SideMenu';
import { SETTINGS_MENU_SECTIONS } from '@/features/app/config/settingsMenu';

interface Props {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <SideMenu sections={SETTINGS_MENU_SECTIONS} />
      </Sidebar>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
