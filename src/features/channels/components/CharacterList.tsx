import { UserIcon } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { ClampText } from '@/components/dataDisplay/ClampText/ClampText';
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
      <ul className="grid gap-3 sm:grid-cols-2">
        {characters.map((character) => (
          <li
            key={character.id}
            className="flex gap-3"
          >
            {character.avatar ? (
              <Image
                src={character.avatar.url}
                alt={character.name}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-text-placeholder">
                <UserIcon size={20} />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-semibold">{character.name}</p>
              {character.persona && (
                <ClampText lines={3} className="mt-0.5 text-sm text-text-subtle">
                  {character.persona}
                </ClampText>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
