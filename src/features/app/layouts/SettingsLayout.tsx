import { Sidebar } from '@/components/navigation/Sidebar';
import { SettingsLayoutSideMenu } from '@/features/app/components/SettingsLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <SettingsLayoutSideMenu />
        </Sidebar>

        <div className="flex-1 p-4 pt-0 flex">
          <main className="overflow-y-auto bg-surface rounded-md flex-1 p-4">
            {children}
          </main>
        </div>
      </div>

      <div className="h-bottom-player">プレイヤー</div>
    </div>
  );
}
