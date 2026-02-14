'use client';

import {
  PauseIcon,
  PencilSimpleIcon,
  PlayIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { Tag } from '@/components/dataDisplay/Tag/Tag';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { Pagination } from '@/components/navigation/Pagination/Pagination';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import { BgmDeleteDialog } from '@/features/studio/bgm/components/BgmDeleteDialog';
import { BgmEditModal } from '@/features/studio/bgm/components/BgmEditModal';
import { BgmUsageDialog } from '@/features/studio/bgm/components/BgmUsageDialog';
import { useBgmDeleteDialog } from '@/features/studio/bgm/hooks/useBgmDeleteDialog';
import { useBgmEditModal } from '@/features/studio/bgm/hooks/useBgmEditModal';
import { useBgmPlayer } from '@/features/studio/bgm/hooks/useBgmPlayer';
import { useMyBgmList } from '@/features/studio/bgm/hooks/useMyBgmList';
import type { ResponseBgmWithEpisodesResponse } from '@/libs/api/generated/schemas';
import { Pages } from '@/libs/pages';

interface DialogState {
  type: 'channels' | 'episodes';
  items: { label: string; href: string }[];
}

export function BgmList() {
  const { bgms, currentPage, totalPages, setCurrentPage } = useMyBgmList();
  const { isBgmPlaying, playBgm, pauseBgm } = useBgmPlayer();
  const deleteDialog = useBgmDeleteDialog();
  const editModal = useBgmEditModal();
  const [dialogState, setDialogState] = useState<DialogState | null>(null);

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
      key: 'type',
      header: '種別',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) => (
        <Tag
          label={bgm.isSystem ? 'システム' : 'マイBGM'}
          color={bgm.isSystem ? 'gray' : 'blue'}
        />
      ),
    },
    {
      key: 'channels',
      header: '使用チャンネル',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) =>
        bgm.channels.length > 0 ? (
          <button
            type="button"
            className="text-sm text-primary hover:underline cursor-pointer"
            onClick={() =>
              setDialogState({
                type: 'channels',
                items: bgm.channels.map((channel) => ({
                  label: channel.name,
                  href: Pages.studio.channel.path({ id: channel.id }),
                })),
              })
            }
          >
            {bgm.channels.length} チャンネル
          </button>
        ) : (
          <span className="text-sm text-text-secondary">—</span>
        ),
    },
    {
      key: 'episodes',
      header: '使用エピソード',
      accessor: (bgm: ResponseBgmWithEpisodesResponse) =>
        bgm.episodes.length > 0 ? (
          <button
            type="button"
            className="text-sm text-primary hover:underline cursor-pointer"
            onClick={() =>
              setDialogState({
                type: 'episodes',
                items: bgm.episodes.map((episode) => ({
                  label: episode.title,
                  href: Pages.studio.episode.path({
                    id: episode.channel.id,
                    episodeId: episode.id,
                  }),
                })),
              })
            }
          >
            {bgm.episodes.length} エピソード
          </button>
        ) : (
          <span className="text-sm text-text-secondary">—</span>
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
            disabled={bgm.isSystem}
            disabledReason="システムBGMは編集できません"
            onClick={() => editModal.open(bgm)}
          />
          <IconButton
            icon={<TrashIcon size={18} />}
            aria-label="削除"
            color="danger"
            variant="text"
            disabled={bgm.isSystem}
            disabledReason="システムBGMは削除できません"
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <BgmDeleteDialog
        bgmName={deleteDialog.deleteTarget?.name}
        open={deleteDialog.isOpen}
        error={deleteDialog.error}
        onClose={deleteDialog.close}
        onConfirm={deleteDialog.confirm}
      />

      <BgmEditModal editModal={editModal} />

      <BgmUsageDialog
        title={
          dialogState?.type === 'channels' ? '使用チャンネル' : '使用エピソード'
        }
        items={dialogState?.items ?? []}
        open={dialogState !== null}
        onOpenChange={(open) => {
          if (!open) setDialogState(null);
        }}
      />
    </div>
  );
}
