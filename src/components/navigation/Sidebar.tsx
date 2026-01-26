import { ScrollArea } from '@base-ui/react/scroll-area';

interface Props {
  children: React.ReactNode;
}

export function Sidebar({ children }: Props) {
  return (
    <ScrollArea.Root className="w-sidebar shrink-0">
      <ScrollArea.Viewport className="h-full" render={<aside />}>
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent p-0.5">
        <ScrollArea.Thumb className="w-full rounded-full bg-elevated/75" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
