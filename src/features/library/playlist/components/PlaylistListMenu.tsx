'use client';

import { DotsThreeIcon, PlusIcon } from '@phosphor-icons/react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { PlaylistCreateModal } from '@/features/library/playlist/components/PlaylistCreateModal';
import { useCreatePlaylistModal } from '@/features/library/playlist/hooks/useCreatePlaylistModal';

export function PlaylistListMenu() {
  const createModal = useCreatePlaylistModal();

  function handleCreate() {
    createModal.open();
  }

  return (
    <>
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
        <DropdownMenuItem icon={<PlusIcon size={16} />} onClick={handleCreate}>
          新規作成
        </DropdownMenuItem>
      </DropdownMenu>

      <PlaylistCreateModal createModal={createModal} />
    </>
  );
}
