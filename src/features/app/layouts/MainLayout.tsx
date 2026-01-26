import { ScrollArea } from '@base-ui/react/scroll-area';
import { Sidebar } from '@/components/navigation/Sidebar';
import { MainLayoutSideMenu } from '@/features/app/components/MainLayoutSideMenu';
import { auth } from '@/libs/auth/auth';

interface Props {
  children: React.ReactNode;
}

export async function MainLayout({ children }: Props) {
  const { isLoggedIn } = await auth();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <MainLayoutSideMenu isLoggedIn={isLoggedIn} />
        </Sidebar>

        <div className="flex-1 p-4 pt-0 flex">
          <ScrollArea.Root className="bg-surface rounded-md flex-1">
            <ScrollArea.Viewport className="h-full p-4">
              <main>{children}</main>
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar className="flex w-2 justify-center bg-transparent p-0.5">
              <ScrollArea.Thumb className="w-full rounded-full bg-subtle/50" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </div>

      <div className="h-bottom-player">プレイヤー</div>
    </div>
  );
}
