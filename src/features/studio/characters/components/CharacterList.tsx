'use client';

import Link from 'next/link';
import { useMyCharacterList } from '@/features/studio/characters/hooks/useMyCharacterList';
import { studioPages } from '@/libs/pages/studioPages';

export function CharacterList() {
  const { characters } = useMyCharacterList();

  return (
    <ul>
      {characters.length === 0 && <li>キャラクターがありません</li>}

      {characters.map((character) => (
        <li key={character.id}>
          {character.name}
          {character.channels.length > 0 && (
            <span>
              (
              {character.channels.map((channel, index) => (
                <span key={channel.id}>
                  {index > 0 && ', '}
                  <Link
                    href={studioPages.channel.path({ id: channel.id })}
                    className="underline"
                  >
                    {channel.name}
                  </Link>
                </span>
              ))}
              )
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
