'use client';

import { Dialog } from '@base-ui/react/dialog';
import { ScrollArea } from '@base-ui/react/scroll-area';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export function MobileMenu({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="md:hidden p-2 -ml-2">
        <ListIcon size={24} weight="bold" aria-label="メニューを開く" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 transition-opacity duration-200" />

        <Dialog.Popup className="fixed inset-y-0 left-0 z-50 w-sidebar bg-bg-main flex flex-col data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full transition-transform duration-200">
          <div className="flex items-center h-header shrink-0 px-4 gap-2">
            <Dialog.Close className="p-2 -ml-2">
              <XIcon size={24} weight="bold" aria-label="メニューを閉じる" />
            </Dialog.Close>

            <span className="text-xl font-semibold text-primary">Anycast</span>
          </div>

          <ScrollArea.Root className="flex-1 min-h-0">
            <ScrollArea.Viewport className="h-full">
              {children}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar className="flex w-scrollbar justify-center bg-transparent p-0.5">
              <ScrollArea.Thumb className="w-full rounded-full bg-bg-elevated/75" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
