'use client';

import { UserIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { VoiceSampleButton } from '@/features/studio/voices/components/VoiceSampleButton';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  character: ResponseCharacterResponse;
  voice?: ResponseVoiceResponse;
}

export function ChannelCharacterCard({ character, voice }: Props) {
  return (
    <li className="space-y-2 rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
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
        <div>
          <p className="text-sm font-medium">{character.name}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-xs text-text-subtle">{character.voice.name}</p>
            {voice && <VoiceSampleButton voice={voice} />}
          </div>
        </div>
      </div>
      {character.persona && (
        <p className="whitespace-pre-wrap text-sm text-text-subtle">
          {character.persona}
        </p>
      )}
    </li>
  );
}
