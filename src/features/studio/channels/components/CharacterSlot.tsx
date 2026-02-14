'use client';

import { TrashIcon } from '@phosphor-icons/react';
import type {
  Control,
  FieldErrors,
  UseFieldArrayUpdate,
  UseFormRegister,
} from 'react-hook-form';
import { Button } from '@/components/inputs/buttons/Button/Button';
import { SegmentedControl } from '@/components/inputs/SegmentedControl/SegmentedControl';
import { ConnectCharacterFields } from '@/features/studio/channels/components/ConnectCharacterFields';
import { CreateCharacterFields } from '@/features/studio/channels/components/CreateCharacterFields';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

const CHARACTER_MODE_OPTIONS = [
  { label: '新規作成', value: 'create' as const },
  { label: '既存から選択', value: 'connect' as const },
];

interface Props {
  index: number;
  mode: 'create' | 'connect';
  control: Control<ChannelFormInput>;
  errors: FieldErrors<ChannelFormInput>;
  voices: ResponseVoiceResponse[];
  register: UseFormRegister<ChannelFormInput>;
  update: UseFieldArrayUpdate<ChannelFormInput, 'characters'>;
  canRemove: boolean;
  onRemove: () => void;
  myCharacters?: ResponseCharacterResponse[];
  selectedCharacterIds: string[];
}

export function CharacterSlot({
  index,
  mode,
  control,
  errors,
  voices,
  register,
  update,
  canRemove,
  onRemove,
  myCharacters,
  selectedCharacterIds,
}: Props) {
  const hasMyCharacters = myCharacters && myCharacters.length > 0;

  function handleModeChange(newMode: 'create' | 'connect') {
    if (newMode === mode) return;

    if (newMode === 'create') {
      update(index, { mode: 'create', name: '', voiceId: '', persona: '' });
    } else {
      update(index, { mode: 'connect', characterId: '' });
    }
  }

  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold">キャラクター {index + 1}</h4>
        {canRemove && (
          <Button
            type="button"
            variant="text"
            color="danger"
            size="sm"
            leftIcon={<TrashIcon />}
            onClick={onRemove}
          >
            削除
          </Button>
        )}
      </div>

      {hasMyCharacters && (
        <SegmentedControl
          options={CHARACTER_MODE_OPTIONS}
          value={mode}
          onValueChange={handleModeChange}
        />
      )}

      {mode === 'create' ? (
        <CreateCharacterFields
          index={index}
          control={control}
          errors={errors}
          voices={voices}
          register={register}
        />
      ) : (
        <ConnectCharacterFields
          index={index}
          control={control}
          errors={errors}
          myCharacters={myCharacters ?? []}
          voices={voices}
          selectedCharacterIds={selectedCharacterIds}
        />
      )}
    </div>
  );
}
