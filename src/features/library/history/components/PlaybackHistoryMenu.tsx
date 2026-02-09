'use client';

import { DotsThreeIcon, TrashIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';

interface Props {
  onDelete: () => void;
}

export function PlaybackHistoryMenu({ onDelete }: Props) {
  return (
    <DropdownMenu
      trigger={
        <IconButton
          icon={<DotsThreeIcon size={26} weight="bold" />}
          aria-label="メニュー"
          color="secondary"
          variant="text"
        />
      }
    >
      <DropdownMenuItem
        icon={<TrashIcon size={16} />}
        variant="danger"
        onClick={onDelete}
      >
        削除
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
