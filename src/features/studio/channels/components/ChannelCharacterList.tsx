'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ChannelCharacterCard } from '@/features/studio/channels/components/ChannelCharacterCard';
import { CharacterEditModal } from '@/features/studio/characters/components/CharacterEditModal';
import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';
import { getGetMeChannelsChannelIdQueryKey } from '@/libs/api/generated/me/me';
import type { ResponseCharacterResponse } from '@/libs/api/generated/schemas';

interface Props {
  channelId: string;
  characters: ResponseCharacterResponse[];
}

export function ChannelCharacterList({ channelId, characters }: Props) {
  const { voices } = useVoiceList();
  const queryClient = useQueryClient();

  const [editingCharacter, setEditingCharacter] =
    useState<ResponseCharacterResponse | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
              onEdit={() => handleEdit(character)}
            />
          );
        })}
      </ul>

      <CharacterEditModal
        character={editingCharacter}
        voices={voices}
        open={editModalOpen}
        onOpenChange={handleEditModalOpenChange}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
