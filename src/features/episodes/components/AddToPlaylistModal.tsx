'use client';

import { PlusIcon, SpinnerGapIcon } from '@phosphor-icons/react';

import { Button } from '@/components/inputs/buttons/Button/Button';
import { Checkbox } from '@/components/inputs/Checkbox/Checkbox';
import { Modal } from '@/components/utils/Modal/Modal';
import { CreatePlaylistForm } from '@/features/episodes/components/CreatePlaylistForm';
import { useAddToPlaylistForm } from '@/features/episodes/hooks/useAddToPlaylistForm';

interface Props {
  open: boolean;
  episodeId: string;
  currentPlaylistIds: string[];

  onOpenChange: (open: boolean) => void;
}

export function AddToPlaylistModal({
  open,
  episodeId,
  currentPlaylistIds,
  onOpenChange,
}: Props) {
  const {
    playlists,
    isLoading,
    selectedIds,
    isCreatingNew,
    isPending,
    error,
    setIsCreatingNew,
    handleCheckboxChange,
    handleCreatePlaylist,
    handleSave,
  } = useAddToPlaylistForm({
    episodeId,
    currentPlaylistIds,
    open,
    onClose: () => onOpenChange(false),
  });

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content size="sm">
        <Modal.Header>
          <Modal.Title>プレイリストに追加</Modal.Title>
          <Modal.Close />
        </Modal.Header>

        <Modal.Body className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <SpinnerGapIcon
                size={24}
                className="animate-spin text-text-subtle"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {playlists.map((playlist) => (
                <Checkbox
                  key={playlist.id}
                  label={playlist.name}
                  checked={selectedIds.has(playlist.id)}
                  onChange={(e) =>
                    handleCheckboxChange(playlist.id, e.target.checked)
                  }
                />
              ))}
            </div>
          )}

          {isCreatingNew ? (
            <CreatePlaylistForm
              isPending={isPending}
              serverError={error}
              onSubmit={handleCreatePlaylist}
            />
          ) : (
            // プレイリスト作成ボタン
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary-hover"
              onClick={() => setIsCreatingNew(true)}
            >
              <PlusIcon size={16} />
              新しいプレイリストを作成
            </button>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Modal.Close>
            <Button variant="outline" color="secondary">
              キャンセル
            </Button>
          </Modal.Close>

          <Button loading={isPending} onClick={handleSave}>
            保存
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
