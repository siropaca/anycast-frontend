'use client';

import { signOut } from 'next-auth/react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';
import { useDeleteAccount } from '@/features/settings/account/hooks/useDeleteAccount';
import { Pages } from '@/libs/pages';

export function DeleteAccountSection() {
  const { isDeleting, error, deleteAccount } = useDeleteAccount();

  function handleConfirm() {
    deleteAccount(() => {
      signOut({ callbackUrl: Pages.home.path() });
    });
  }

  return (
    <section className="space-y-4">
      <SectionTitle
        title="アカウントの削除"
        description="アカウントを削除すると、すべてのデータが完全に削除されます。この操作は取り消せません。"
        level="h3"
      />

      <ConfirmDialog
        trigger={
          <Button variant="outline" color="danger" loading={isDeleting}>
            アカウントを削除
          </Button>
        }
        title="アカウントを削除"
        description={
          '本当にアカウントを削除しますか？\nすべてのデータが完全に削除され、この操作は取り消せません。'
        }
        error={error}
        confirmLabel="削除"
        confirmColor="danger"
        onConfirm={handleConfirm}
      />
    </section>
  );
}
