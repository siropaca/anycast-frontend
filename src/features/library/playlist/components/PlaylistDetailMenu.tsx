'use client';

import { Menu } from '@base-ui/react/menu';
import {
  DotsThreeIcon,
  PencilSimpleIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';

interface Props {
  disabled?: boolean;
  disabledReason?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function PlaylistDetailMenu({
  disabled,
  disabledReason,
  onEdit,
  onDelete,
}: Props) {
  if (disabled) {
    return (
      <IconButton
        icon={<DotsThreeIcon size={26} weight="bold" />}
        aria-label="メニュー"
        color="secondary"
        variant="text"
        disabled
        disabledReason={disabledReason}
      />
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          <IconButton
            icon={<DotsThreeIcon size={26} weight="bold" />}
            aria-label="メニュー"
            color="secondary"
            variant="text"
          />
        }
      />

      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="min-w-36 rounded-md border border-border bg-bg-elevated p-1 shadow-lg">
            <Menu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong"
              onClick={onEdit}
            >
              <PencilSimpleIcon size={16} />
              編集
            </Menu.Item>

            <Menu.Item
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-danger outline-none hover:bg-bg-hover-strong focus:bg-bg-hover-strong"
              onClick={onDelete}
            >
              <TrashIcon size={16} />
              削除
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
