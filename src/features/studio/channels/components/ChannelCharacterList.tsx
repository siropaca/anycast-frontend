'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ChannelCharacterAddModal } from '@/features/studio/channels/components/ChannelCharacterAddModal';
import { ChannelCharacterCard } from '@/features/studio/channels/components/ChannelCharacterCard';
import { ChannelCharacterRemoveDialog } from '@/features/studio/channels/components/ChannelCharacterRemoveDialog';
import { ChannelCharacterReplaceModal } from '@/features/studio/channels/components/ChannelCharacterReplaceModal';
import { useChannelCharacterActions } from '@/features/studio/channels/hooks/useChannelCharacterActions';
import { CharacterEditModal } from '@/features/studio/characters/components/CharacterEditModal';
import { useMyCharacterOptions } from '@/features/studio/characters/hooks/useMyCharacterOptions';
import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';
import { getGetMeChannelsChannelIdQueryKey } from '@/libs/api/generated/me/me';
import type { ResponseCharacterResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  characters: ResponseCharacterResponse[];
}

export function ChannelCharacterList({ channelId, characters }: Props) {
  const { voices } = useVoiceList();
  const { characters: myCharacters } = useMyCharacterOptions();
  const queryClient = useQueryClient();
  const {
    isPending,
    error,
    addCharacter,
    replaceCharacter,
    removeCharacter,
    clearError,
  } = useChannelCharacterActions(channelId);

  // 編集モーダル
  const [editingCharacter, setEditingCharacter] =
    useState<ResponseCharacterResponse | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // 追加モーダル
  const [addModalOpen, setAddModalOpen] = useState(false);

  // 変更モーダル
  const [replacingCharacter, setReplacingCharacter] =
    useState<ResponseCharacterResponse | null>(null);
  const [replaceModalOpen, setReplaceModalOpen] = useState(false);

  // 削除ダイアログ
  const [removingCharacter, setRemovingCharacter] =
    useState<ResponseCharacterResponse | null>(null);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const channelCharacterIds = characters.map((c) => c.id);
  const canRemove = characters.length > 1;

  // --- 編集 ---

  function handleEdit(character: ResponseCharacterResponse) {
    setEditingCharacter(character);
    setEditModalOpen(true);
  }

  function handleEditModalOpenChange(open: boolean) {
    setEditModalOpen(open);
    if (!open) {
      setEditingCharacter(null);
    }
  }

  function handleEditSuccess() {
    queryClient.invalidateQueries({
      queryKey: getGetMeChannelsChannelIdQueryKey(channelId),
    });
  }

  // --- 追加 ---

  function handleAddModalOpenChange(open: boolean) {
    setAddModalOpen(open);
  }

  async function handleAddSubmit(characterId: string) {
    const success = await addCharacter(characterId);
    if (success) {
      setAddModalOpen(false);
    }
  }

  // --- 変更 ---

  function handleReplace(character: ResponseCharacterResponse) {
    setReplacingCharacter(character);
    setReplaceModalOpen(true);
    clearError();
  }

  function handleReplaceModalOpenChange(open: boolean) {
    setReplaceModalOpen(open);
    if (!open) {
      setReplacingCharacter(null);
    }
  }

  async function handleReplaceSubmit(newCharacterId: string) {
    if (!replacingCharacter) return;
    const success = await replaceCharacter(
      replacingCharacter.id,
      newCharacterId,
    );
    if (success) {
      setReplaceModalOpen(false);
      setReplacingCharacter(null);
    }
  }

  // --- 削除 ---

  function handleRemove(character: ResponseCharacterResponse) {
    setRemovingCharacter(character);
    setRemoveDialogOpen(true);
    clearError();
  }

  function handleRemoveDialogClose() {
    setRemoveDialogOpen(false);
    setRemovingCharacter(null);
  }

  async function handleRemoveConfirm() {
    if (!removingCharacter) return;
    const success = await removeCharacter(removingCharacter.id);
    if (success) {
      setRemoveDialogOpen(false);
      setRemovingCharacter(null);
    }
  }

  // 変更時の除外: チャンネル登録済み全員
  const replaceExcludeIds = channelCharacterIds;

  return (
    <div className="space-y-3">
      <SectionTitle title="キャラクター" level="h3" />
      <ul className="grid gap-4 sm:grid-cols-2">
        {characters.map((character) => {
          const voice = voices.find((v) => v.id === character.voice.id);
          return (
            <ChannelCharacterCard
              key={character.id}
              character={character}
              voice={voice}
              canRemove={canRemove}
              onEdit={() => handleEdit(character)}
              onReplace={() => handleReplace(character)}
              onRemove={() => handleRemove(character)}
            />
          );
        })}

        {characters.length === 1 && (
          <li>
            <button
              type="button"
              className="flex h-full min-h-26 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-text-subtle transition-colors hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
              onClick={() => setAddModalOpen(true)}
            >
              <PlusIcon size={32} />
              <span className="text-sm">キャラクターを追加</span>
            </button>
          </li>
        )}
      </ul>

      <CharacterEditModal
        character={editingCharacter}
        voices={voices}
        open={editModalOpen}
        onOpenChange={handleEditModalOpenChange}
        onSuccess={handleEditSuccess}
      />

      <ChannelCharacterAddModal
        characters={myCharacters}
        voices={voices}
        excludeIds={channelCharacterIds}
        open={addModalOpen}
        isSubmitting={isPending}
        onOpenChange={handleAddModalOpenChange}
        onSubmit={handleAddSubmit}
      />

      <ChannelCharacterReplaceModal
        characters={myCharacters}
        voices={voices}
        excludeIds={replaceExcludeIds}
        open={replaceModalOpen}
        isSubmitting={isPending}
        onOpenChange={handleReplaceModalOpenChange}
        onSubmit={handleReplaceSubmit}
      />

      <ChannelCharacterRemoveDialog
        characterName={removingCharacter?.name}
        open={removeDialogOpen}
        error={error}
        onClose={handleRemoveDialogClose}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
}
