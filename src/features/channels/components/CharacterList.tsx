import { UserIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import type { ResponseCharacterResponse } from '@/libs/api/generated/schemas';

interface Props {
  characters: ResponseCharacterResponse[];
}

export function CharacterList({ characters }: Props) {
  if (characters.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">登場人物</h2>
      <ul className="flex flex-wrap gap-4">
        {characters.map((character) => (
          <li key={character.id} className="flex items-center gap-2">
            {character.avatar ? (
              <Image
                src={character.avatar.url}
                alt={character.name}
                width={30}
                height={30}
                className="size-[30px] shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder">
                <UserIcon size={16} />
              </div>
            )}
            <span className="text-sm">{character.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
