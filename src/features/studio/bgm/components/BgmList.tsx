'use client';

import {
  PauseIcon,
  PencilSimpleIcon,
  PlayIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { Pagination } from '@/components/navigation/Pagination/Pagination';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import { useBgmDeleteDialog } from '@/features/studio/bgm/hooks/useBgmDeleteDialog';
import { useBgmPlayer } from '@/features/studio/bgm/hooks/useBgmPlayer';
import { useMyBgmList } from '@/features/studio/bgm/hooks/useMyBgmList';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';

export function BgmList() {
  const { bgms, currentPage, totalPages, setCurrentPage } = useMyBgmList();
  const { isBgmPlaying, playBgm, pauseBgm } = useBgmPlayer();
  const deleteDialog = useBgmDeleteDialog();

  function handlePageChange(page: number) {
    setCurrentPage(page);
    document
      .getElementById(MAIN_SCROLL_VIEWPORT_ID)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePlayClick(
    e: React.MouseEvent<HTMLButtonElement>,
    bgm: ResponseBgmWithEpisodesResponse,
  ) {
    e.stopPropagation();

    if (isBgmPlaying(bgm)) {
      pauseBgm();
    } else {
      playBgm(bgm, bgms);
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'BGM名',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) => (
        <span>{bgm.name}</span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-0 px-4 py-3',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) => (
        <div className="flex items-center justify-end gap-2">
          <IconButton
            icon={
              isBgmPlaying(bgm) ? (
                <PauseIcon size={16} weight="fill" />
              ) : (
                <PlayIcon size={16} weight="fill" />
              )
            }
            aria-label={isBgmPlaying(bgm) ? '一時停止' : '再生'}
            size="sm"
            color="secondary"
            variant="solid"
            className="transition-transform hover:scale-105 mr-2"
            onClick={(e) => handlePlayClick(e, bgm)}
          />
          <IconButton
            icon={<PencilSimpleIcon size={18} />}
            aria-label="編集"
            color="secondary"
            variant="text"
          />
          <IconButton
            icon={<TrashIcon size={18} />}
            aria-label="削除"
            color="danger"
            variant="text"
            onClick={() => deleteDialog.open(bgm)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={bgms}
        emptyMessage="BGMがありません"
        keyExtractor={(bgm) => bgm.id}
      />

      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmDialog
        trigger={<span className="hidden" />}
        open={deleteDialog.isOpen}
        title="BGMを削除"
        description={`「${deleteDialog.deleteTarget?.name}」を削除しますか？この操作は取り消せません。`}
        confirmLabel="削除"
        confirmColor="danger"
        onOpenChange={(open) => !open && deleteDialog.close()}
        onConfirm={deleteDialog.confirm}
      />
    </div>
  );
}
