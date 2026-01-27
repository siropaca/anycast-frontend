import { ScrollArea } from '@base-ui/react/scroll-area';
import { Sidebar } from '@/components/navigation/Sidebar';

interface Props {
  sideMenu: React.ReactNode;
  children: React.ReactNode;
}

export function LayoutBody({ sideMenu, children }: Props) {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>{sideMenu}</Sidebar>

      <div className="flex-1 p-4 pt-0 flex">
        <ScrollArea.Root className="bg-bg-surface rounded-md flex-1">
          <ScrollArea.Viewport className="h-full p-4">
            <main>{children}</main>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent p-0.5">
            <ScrollArea.Thumb className="w-full rounded-full bg-bg-elevated/75" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}
