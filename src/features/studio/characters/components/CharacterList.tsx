'use client';

import { useMyCharacterList } from '@/features/studio/characters/hooks/useMyCharacterList';

export function CharacterList() {
  const { characters } = useMyCharacterList();

  return (
    <ul>
      {characters.length === 0 && <li>キャラクターがありません</li>}

      {characters.map((character) => (
        <li key={character.id}>
          {character.name} (
          {character.channels.map((channel) => channel.name).join(',')})
        </li>
      ))}
    </ul>
  );
}
