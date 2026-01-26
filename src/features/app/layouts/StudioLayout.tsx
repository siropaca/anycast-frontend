import { Sidebar } from '@/components/navigation/Sidebar';
import { StudioLayoutSideMenu } from '@/features/app/components/StudioLayoutSideMenu';

interface Props {
  children: React.ReactNode;
}

export function StudioLayout({ children }: Props) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <StudioLayoutSideMenu />
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
