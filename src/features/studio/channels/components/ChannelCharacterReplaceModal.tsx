'use client';

import { useState } from 'react';
import { FormModal } from '@/components/utils/Modal/FormModal';
import { CharacterSelect } from '@/features/studio/characters/components/CharacterSelect';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  characters: ResponseCharacterResponse[];
  voices: ResponseVoiceResponse[];
  excludeIds: string[];
  open: boolean;
  isSubmitting: boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (characterId: string) => void;
}

export function ChannelCharacterReplaceModal({
  characters,
  voices,
  excludeIds,
  open,
  isSubmitting,
  onOpenChange,
  onSubmit,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredCharacters = characters.filter(
    (c) => !excludeIds.includes(c.id),
  );

  function handleOpenChange(isOpen: boolean) {
    onOpenChange(isOpen);
    if (!isOpen) {
      setSelectedId(null);
    }
  }

  function handleSubmit() {
    if (selectedId) {
      onSubmit(selectedId);
    }
  }

  return (
    <FormModal
      trigger={<span className="hidden" />}
      title="キャラクターを変更"
      submitLabel="変更"
      open={open}
      submitDisabled={!selectedId}
      submitDisabledReason="キャラクターを選択してください"
      isSubmitting={isSubmitting}
      submittingLabel="変更中..."
      onOpenChange={handleOpenChange}
      onSubmit={handleSubmit}
    >
      <CharacterSelect
        characters={filteredCharacters}
        voices={voices}
        value={selectedId}
        onValueChange={setSelectedId}
        placeholder="キャラクターを選択"
      />
    </FormModal>
  );
}
