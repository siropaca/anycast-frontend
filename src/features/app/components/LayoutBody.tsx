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

      <div className="min-w-0 flex-1 pr-4 flex">
        <ScrollArea.Root className="bg-bg-surface rounded-md flex-1 min-w-0">
          <ScrollArea.Viewport className="h-full p-6">
            <main>{children}</main>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent pl-1">
            <ScrollArea.Thumb className="w-full rounded-full bg-bg-elevated/75" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}
