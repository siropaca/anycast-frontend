import { Sidebar } from '@/components/navigation/Sidebar';
import { SettingsLayoutSideMenu } from '@/features/app/components/SettingsLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-1">
      <Sidebar>
        <SettingsLayoutSideMenu />
      </Sidebar>

      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
}
