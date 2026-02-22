'use client';

import { TrashIcon } from '@phosphor-icons/react';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { ApiKeyDeleteDialog } from '@/features/settings/apiKeys/components/ApiKeyDeleteDialog';
import { useApiKeyDeleteDialog } from '@/features/settings/apiKeys/hooks/useApiKeyDeleteDialog';
import { useApiKeyList } from '@/features/settings/apiKeys/hooks/useApiKeyList';
import type { ResponseAPIKeyResponse } from '@/libs/api/generated/schemas';
import { formatDate } from '@/utils/date';

export function ApiKeyList() {
  const { apiKeys } = useApiKeyList();
  const deleteDialog = useApiKeyDeleteDialog();

  const columns = [
    {
      key: 'name',
      header: 'キー名',
      accessor: (apiKey: ResponseAPIKeyResponse) => <span>{apiKey.name}</span>,
    },
    {
      key: 'prefix',
      header: 'キー',
      accessor: (apiKey: ResponseAPIKeyResponse) => (
        <code className="text-sm text-text-subtle">{apiKey.prefix}...</code>
      ),
    },
    {
      key: 'lastUsedAt',
      header: '最終使用日',
      accessor: (apiKey: ResponseAPIKeyResponse) => (
        <span className="text-sm text-text-secondary">
          {apiKey.lastUsedAt
            ? formatDate(new Date(apiKey.lastUsedAt))
            : '未使用'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: '作成日',
      accessor: (apiKey: ResponseAPIKeyResponse) => (
        <span className="text-sm text-text-secondary">
          {formatDate(new Date(apiKey.createdAt))}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-0 px-4 py-3',
      accessor: (apiKey: ResponseAPIKeyResponse) => (
        <div className="flex items-center justify-end gap-2">
          <IconButton
            icon={<TrashIcon size={18} />}
            aria-label="削除"
            color="danger"
            variant="text"
            onClick={() => deleteDialog.open(apiKey)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={apiKeys}
        emptyMessage="APIキーがありません"
        keyExtractor={(apiKey) => apiKey.id}
      />

      <ApiKeyDeleteDialog
        apiKeyName={deleteDialog.deleteTarget?.name}
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={deleteDialog.confirm}
      />
    </div>
  );
}
