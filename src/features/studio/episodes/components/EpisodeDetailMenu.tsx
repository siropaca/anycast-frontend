'use client';

import {
  DotsThreeIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';

interface Props {
  isPublished: boolean;
  disabled: boolean;
  canPublish: boolean;

  onPublish: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
}

export function EpisodeDetailMenu({
  isPublished,
  disabled,
  canPublish,
  onPublish,
  onUnpublish,
  onDelete,
}: Props) {
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
      disabled={disabled}
    >
      {isPublished ? (
        <DropdownMenuItem
          icon={<EyeSlashIcon size={16} />}
          onClick={onUnpublish}
        >
          非公開にする
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          icon={<EyeIcon size={16} />}
          disabled={!canPublish}
          onClick={onPublish}
        >
          公開する
        </DropdownMenuItem>
      )}

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
