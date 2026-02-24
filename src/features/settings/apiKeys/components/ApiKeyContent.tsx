'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { Suspense } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { ApiKeyCreatedBanner } from '@/features/settings/apiKeys/components/ApiKeyCreatedBanner';
import { ApiKeyCreateModal } from '@/features/settings/apiKeys/components/ApiKeyCreateModal';
import { ApiKeyList } from '@/features/settings/apiKeys/components/ApiKeyList';
import { ApiKeyListSkeleton } from '@/features/settings/apiKeys/components/ApiKeyListSkeleton';
import { useCreateApiKeyModal } from '@/features/settings/apiKeys/hooks/useCreateApiKeyModal';

export function ApiKeyContent() {
  const createModal = useCreateApiKeyModal();

  return (
    <div className="space-y-8">
      <SectionTitle
        title="APIキー"
        description="外部アプリケーションから Anycast にアクセスするための APIキーを管理します"
        level="h2"
        action={
          <Button leftIcon={<PlusIcon size={18} />} onClick={createModal.open}>
            APIキーを作成
          </Button>
        }
      />

      {createModal.createdKey && (
        <ApiKeyCreatedBanner
          apiKey={createModal.createdKey.key}
          onDismiss={createModal.closeCreatedDialog}
        />
      )}

      <Suspense fallback={<ApiKeyListSkeleton />}>
        <ApiKeyList />
      </Suspense>

      <ApiKeyCreateModal createModal={createModal} />
    </div>
  );
}
