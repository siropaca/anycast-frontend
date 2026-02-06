'use client';

import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';
import type { usePlaylistEditModal } from '@/features/library/playlist/hooks/usePlaylistEditModal';

interface Props {
  editModal: ReturnType<typeof usePlaylistEditModal>;
}

export function PlaylistEditModal({ editModal }: Props) {
  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      editModal.close();
    }
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={editModal.isOpen}
      title="再生リストを編集"
      submitLabel="保存"
      submitDisabled={!editModal.name.trim() || !editModal.isDirty}
      submitDisabledReason={
        !editModal.name.trim()
          ? '再生リスト名を入力してください'
          : '変更がありません'
      }
      isSubmitting={editModal.isUpdating}
      onOpenChange={handleOpenChange}
      onSubmit={editModal.submit}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel htmlFor="playlist-edit-name" required>
            再生リスト名
          </FormLabel>
          <Input
            id="playlist-edit-name"
            value={editModal.name}
            placeholder="再生リスト名を入力"
            disabled={editModal.isUpdating}
            onChange={(e) => editModal.setName(e.target.value)}
          />

          {editModal.error && <HelperText error>{editModal.error}</HelperText>}
        </div>
      </div>
    </FormModal>
  );
}
