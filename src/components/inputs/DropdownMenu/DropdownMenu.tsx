'use client';

import { Menu } from '@base-ui/react/menu';
import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { Tooltip } from '@/components/dataDisplay/Tooltip/Tooltip';

interface Props {
  children: ReactNode;
  trigger: ReactElement;
  disabled?: boolean;
  disabledReason?: string;
}

export function DropdownMenu({
  children,
  trigger,
  disabled,
  disabledReason,
}: Props) {
  if (disabled) {
    const disabledTrigger = cloneElement(trigger, { disabled: true });

    if (disabledReason) {
      return <Tooltip label={disabledReason}>{disabledTrigger}</Tooltip>;
    }

    return disabledTrigger;
  }

  return (
    <Menu.Root>
      <Menu.Trigger render={trigger} />

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="min-w-36 rounded-md border border-border bg-bg-elevated p-1 shadow-lg">
            {children}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
