'use client';

import { PencilSimpleIcon, TrashIcon, UserIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Avatar } from '@/components/dataDisplay/Avatar/Avatar';
import { DataTable } from '@/components/dataDisplay/DataTable/DataTable';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { Pagination } from '@/components/navigation/Pagination/Pagination';
import { ConfirmDialog } from '@/components/utils/Dialog/ConfirmDialog';
import { MAIN_SCROLL_VIEWPORT_ID } from '@/features/app/components/LayoutBody';
import { CharacterEditModal } from '@/features/studio/characters/components/CharacterEditModal';
import { CharacterUsageDialog } from '@/features/studio/characters/components/CharacterUsageDialog';
import { useCharacterDeleteDialog } from '@/features/studio/characters/hooks/useCharacterDeleteDialog';
import { useMyCharacterList } from '@/features/studio/characters/hooks/useMyCharacterList';
import { VoiceSampleButton } from '@/features/studio/voices/components/VoiceSampleButton';
import { getGenderLabel } from '@/features/studio/voices/utils/voiceLabels';
import type {
  ResponseCharacterWithChannelsResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';
import { useGetVoicesSuspense } from '@/libs/api/generated/voices/voices';
import { unwrapResponse } from '@/libs/api/unwrapResponse';
import { studioPages } from '@/libs/pages/studioPages';

interface UsageDialogState {
  items: { label: string; href: string }[];
}

export function CharacterList() {
  const { characters, currentPage, totalPages, setCurrentPage } =
    useMyCharacterList();
  const { data: voicesData } = useGetVoicesSuspense();
  const voices = unwrapResponse<ResponseVoiceResponse[]>(voicesData, []);

  const deleteDialog = useCharacterDeleteDialog();
  const [editTarget, setEditTarget] =
    useState<ResponseCharacterWithChannelsResponse | null>(null);
  const [usageDialog, setUsageDialog] = useState<UsageDialogState | null>(null);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    document
      .getElementById(MAIN_SCROLL_VIEWPORT_ID)
      ?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const columns = [
    {
      key: 'character',
      header: 'キャラクター',
      accessor: (character: ResponseCharacterWithChannelsResponse) => (
        <div className="flex items-center gap-4">
          {character.avatar?.url ? (
            <Avatar
              src={character.avatar.url}
              alt={character.name}
              size="lg"
              className="!size-[50px]"
            />
          ) : (
            <div className="flex size-[50px] shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder">
              <UserIcon size={24} />
            </div>
          )}
          <span className="text-sm">{character.name}</span>
        </div>
      ),
    },
    {
      key: 'voice',
      header: 'ボイス',
      accessor: (character: ResponseCharacterWithChannelsResponse) => {
        const voice = voices.find((v) => v.id === character.voice.id);

        return (
          <div className="inline-flex items-center gap-2">
            <span className="text-sm text-text-subtle">
              {character.voice.name} ({getGenderLabel(character.voice.gender)})
            </span>
            {voice && <VoiceSampleButton voice={voice} />}
          </div>
        );
      },
    },
    {
      key: 'channels',
      header: '使用チャンネル',
      accessor: (character: ResponseCharacterWithChannelsResponse) =>
        character.channels.length > 0 ? (
          <button
            type="button"
            className="text-sm text-primary hover:underline cursor-pointer"
            onClick={() =>
              setUsageDialog({
                items: character.channels.map((channel) => ({
                  label: channel.name,
                  href: studioPages.channel.path({ id: channel.id }),
                })),
              })
            }
          >
            {character.channels.length} チャンネル
          </button>
        ) : (
          <span className="text-sm text-text-secondary">—</span>
        ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-0 px-4 py-3',
      accessor: (character: ResponseCharacterWithChannelsResponse) => (
        <div className="flex items-center justify-end gap-2">
          <IconButton
            icon={<PencilSimpleIcon size={18} />}
            aria-label="編集"
            color="secondary"
            variant="text"
            onClick={() => setEditTarget(character)}
          />
          <IconButton
            icon={<TrashIcon size={18} />}
            aria-label="削除"
            color="danger"
            variant="text"
            disabled={character.channels.length > 0}
            disabledReason="使用中のチャンネルがあるため削除できません"
            onClick={() => deleteDialog.open(character)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={characters}
        emptyMessage="キャラクターがありません"
        keyExtractor={(character) => character.id}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ConfirmDialog
        trigger={<span className="hidden" />}
        open={deleteDialog.isOpen}
        title="キャラクターを削除"
        description={
          <>
            「{deleteDialog.deleteTarget?.name}」を削除しますか？
            <br />
            この操作は取り消せません。
          </>
        }
        error={deleteDialog.error}
        confirmLabel="削除"
        confirmColor="danger"
        onOpenChange={(open) => !open && deleteDialog.close()}
        onConfirm={deleteDialog.confirm}
      />

      <CharacterEditModal
        character={editTarget}
        voices={voices}
        open={editTarget !== null}
        onOpenChange={(open) => {
          if (!open) setEditTarget(null);
        }}
      />

      <CharacterUsageDialog
        title="使用チャンネル"
        items={usageDialog?.items ?? []}
        open={usageDialog !== null}
        onOpenChange={(open) => {
          if (!open) setUsageDialog(null);
        }}
      />
    </div>
  );
}
