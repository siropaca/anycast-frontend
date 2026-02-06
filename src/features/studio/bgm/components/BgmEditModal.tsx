'use client';

import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { Input } from '@/components/inputs/Input/Input';
import { FormModal } from '@/components/utils/Modal/FormModal';
import type { useBgmEditModal } from '@/features/studio/bgm/hooks/useBgmEditModal';

interface BgmEditModalProps {
  editModal: ReturnType<typeof useBgmEditModal>;
}

export function BgmEditModal({ editModal }: BgmEditModalProps) {
  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      editModal.close();
    }
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      open={editModal.isOpen}
      title="BGMを編集"
      submitLabel="保存"
      submitDisabled={!editModal.bgmName.trim() || !editModal.isDirty}
      submitDisabledReason={
        !editModal.bgmName.trim()
          ? 'BGM名を入力してください'
          : '変更がありません'
      }
      isSubmitting={editModal.isUpdating}
      onOpenChange={handleOpenChange}
      onSubmit={editModal.submit}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <FormLabel htmlFor="bgm-edit-name" required>
            BGM名
          </FormLabel>
          <Input
            id="bgm-edit-name"
            value={editModal.bgmName}
            placeholder="BGM名を入力"
            disabled={editModal.isUpdating}
            onChange={(e) => editModal.setBgmName(e.target.value)}
          />
        </div>

        {editModal.error && <HelperText error>{editModal.error}</HelperText>}
      </div>
    </FormModal>
  );
}
