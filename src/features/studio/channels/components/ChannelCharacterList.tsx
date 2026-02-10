'use client';

import { SectionTitle } from '@/components/dataDisplay/SectionTitle/SectionTitle';
import { ChannelCharacterCard } from '@/features/studio/channels/components/ChannelCharacterCard';
import { useVoiceList } from '@/features/studio/voices/hooks/useVoiceList';
import type { ResponseCharacterResponse } from '@/libs/api/generated/schemas';

interface Props {
  characters: ResponseCharacterResponse[];
}

export function ChannelCharacterList({ characters }: Props) {
  const { voices } = useVoiceList();

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
            />
          );
        })}
      </ul>
    </div>
  );
}
