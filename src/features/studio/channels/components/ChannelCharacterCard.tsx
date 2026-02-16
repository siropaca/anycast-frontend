'use client';

import {
  ArrowsClockwiseIcon,
  DotsThreeIcon,
  PencilSimpleIcon,
  TrashIcon,
  UserIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import { IconButton } from '@/components/inputs/buttons/IconButton/IconButton';
import { DropdownMenu } from '@/components/inputs/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/components/inputs/DropdownMenu/DropdownMenuItem';
import { VoiceSampleButton } from '@/features/studio/voices/components/VoiceSampleButton';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  character: ResponseCharacterResponse;
  voice?: ResponseVoiceResponse;
  canRemove: boolean;
  onEdit: () => void;
  onReplace: () => void;
  onRemove: () => void;
}

export function ChannelCharacterCard({
  character,
  voice,
  canRemove,
  onEdit,
  onReplace,
  onRemove,
}: Props) {
  return (
    <li className="space-y-2 rounded-lg border border-border p-4">
      <div className="flex items-start gap-3">
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
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{character.name}</p>
          <div className="flex items-center gap-1.5">
            <p className="text-xs text-text-subtle">{character.voice.name}</p>
            {voice && <VoiceSampleButton voice={voice} />}
          </div>
        </div>

        <DropdownMenu
          trigger={
            <IconButton
              icon={<DotsThreeIcon size={20} weight="bold" />}
              aria-label="メニュー"
              variant="text"
              color="secondary"
              size="sm"
            />
          }
        >
          <DropdownMenuItem
            icon={<PencilSimpleIcon size={16} />}
            onClick={onEdit}
          >
            編集
          </DropdownMenuItem>
          <DropdownMenuItem
            icon={<ArrowsClockwiseIcon size={16} />}
            onClick={onReplace}
          >
            変更
          </DropdownMenuItem>
          {canRemove && (
            <DropdownMenuItem
              icon={<TrashIcon size={16} />}
              variant="danger"
              onClick={onRemove}
            >
              削除
            </DropdownMenuItem>
          )}
        </DropdownMenu>
      </div>
      {character.persona && (
        <p className="whitespace-pre-wrap text-sm text-text-subtle">
          {character.persona}
        </p>
      )}
    </li>
  );
}
