'use client';

import { ListIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { HeaderLogo } from '@/components/navigation/Header/HeaderLogo';
import { Drawer } from '@/components/utils/Drawer/Drawer';

interface Props {
  children: React.ReactNode;
}

export function MobileMenu({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="md:hidden p-2 -ml-2">
        <ListIcon size={24} weight="bold" aria-label="メニューを開く" />
      </Drawer.Trigger>

      <Drawer.Content side="left" className="w-sidebar">
        <Drawer.Header>
          <Drawer.Close className="p-2 -ml-2">
            <XIcon size={24} weight="bold" aria-label="メニューを閉じる" />
          </Drawer.Close>
          <HeaderLogo />
        </Drawer.Header>

        <Drawer.Body>{children}</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
