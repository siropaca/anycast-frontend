'use client';

import {
  DotsThreeIcon,
  DownloadSimpleIcon,
  TrashIcon,
  UploadSimpleIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';

interface Props {
  scriptLineCount: number;
  isExporting: boolean;

  onImport: () => void;
  onExport: () => void;
  onDeleteAll: () => void;
}

export function ScriptSectionMenu({
  scriptLineCount,
  isExporting,
  onImport,
  onExport,
  onDeleteAll,
}: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleDeleteAllClick() {
    setIsConfirmOpen(true);
  }

  function handleConfirm() {
    onDeleteAll();
    setIsConfirmOpen(false);
  }

  return (
    <>
      <DropdownMenu
        trigger={
          <IconButton
            icon={<DotsThreeIcon size={24} weight="bold" />}
            aria-label="台本メニュー"
            color="secondary"
            variant="text"
          />
        }
      >
        <DropdownMenuItem
          icon={<DownloadSimpleIcon size={16} />}
          onClick={onImport}
        >
          インポート
        </DropdownMenuItem>

        <DropdownMenuItem
          icon={<UploadSimpleIcon size={16} />}
          disabled={isExporting || scriptLineCount === 0}
          onClick={onExport}
        >
          エクスポート
        </DropdownMenuItem>

        <DropdownMenuItem
          icon={<TrashIcon size={16} />}
          variant="danger"
          disabled={scriptLineCount === 0}
          onClick={handleDeleteAllClick}
        >
          台本を全削除
        </DropdownMenuItem>
      </DropdownMenu>

      <ConfirmDialog
        trigger={<span className="hidden" />}
        title="台本を全削除しますか？"
        description="この操作は取り消せません。すべての台本行が削除されます。"
        confirmLabel="全削除"
        confirmColor="danger"
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleConfirm}
      />
    </>
  );
}
