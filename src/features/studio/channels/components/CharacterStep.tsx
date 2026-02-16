'use client';

import { PlusIcon } from '@phosphor-icons/react';
import type {
  Control,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
} from 'react-hook-form';
import { HelperText } from '@/components/inputs/Input/HelperText';
import { CharacterSlot } from '@/features/studio/channels/components/CharacterSlot';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  fields: { id: string }[];
  control: Control<ChannelFormInput>;
  errors: FieldErrors<ChannelFormInput>;
  voices: ResponseVoiceResponse[];
  register: UseFormRegister<ChannelFormInput>;
  append: UseFieldArrayAppend<ChannelFormInput, 'characters'>;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<ChannelFormInput, 'characters'>;
  watchedCharacters: ChannelFormInput['characters'] | undefined;
  myCharacters?: ResponseCharacterResponse[];
  selectedCharacterIds: string[];
}

export function CharacterStep({
  fields,
  control,
  errors,
  voices,
  register,
  append,
  remove,
  update,
  watchedCharacters,
  myCharacters,
  selectedCharacterIds,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {fields.map((field, index) => (
          <CharacterSlot
            key={field.id}
            index={index}
            mode={watchedCharacters?.[index]?.mode ?? 'create'}
            control={control}
            errors={errors}
            voices={voices}
            register={register}
            update={update}
            canRemove={fields.length > 1}
            onRemove={() => remove(index)}
            myCharacters={myCharacters}
            selectedCharacterIds={selectedCharacterIds}
          />
        ))}

        {fields.length < 2 && (
          <button
            type="button"
            className="flex min-h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border text-text-subtle transition-colors hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
            onClick={() =>
              append({
                mode: 'create',
                name: '',
                voiceId: '',
                persona: '',
              })
            }
          >
            <PlusIcon size={32} />
            <span className="text-sm">キャラクターを追加</span>
          </button>
        )}
      </div>

      {errors.characters?.root && (
        <HelperText error>{errors.characters.root.message}</HelperText>
      )}
    </div>
  );
}
