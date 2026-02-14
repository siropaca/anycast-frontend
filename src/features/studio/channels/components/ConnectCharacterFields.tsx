'use client';

import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import { FormField } from '@/components/inputs/FormField/FormField';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import { CharacterSelect } from '@/features/studio/characters/components/CharacterSelect';
import type {
  ResponseCharacterResponse,
  ResponseVoiceResponse,
} from '@/libs/api/generated/schemas';

interface Props {
  index: number;
  control: Control<ChannelFormInput>;
  errors: FieldErrors<ChannelFormInput>;
  myCharacters: ResponseCharacterResponse[];
  voices: ResponseVoiceResponse[];
  selectedCharacterIds: string[];
}

type ConnectCharacterErrors = {
  characterId?: { message?: string };
};

export function ConnectCharacterFields({
  index,
  control,
  errors,
  myCharacters,
  voices,
  selectedCharacterIds,
}: Props) {
  const availableCharacters = myCharacters.filter(
    (c) =>
      !selectedCharacterIds.includes(c.id) ||
      selectedCharacterIds[index] === c.id,
  );

  const characterErrors = errors.characters?.[index] as
    | ConnectCharacterErrors
    | undefined;

  return (
    <FormField
      label="キャラクター"
      required
      error={characterErrors?.characterId?.message}
    >
      {({ hasError }) => (
        <Controller
          // biome-ignore lint/suspicious/noExplicitAny: discriminated union のネストパスは型が合わないため
          name={`characters.${index}.characterId` as any}
          control={control}
          render={({ field: selectField }) => (
            <CharacterSelect
              characters={availableCharacters}
              voices={voices}
              value={(selectField.value as string) || null}
              onValueChange={(value) => selectField.onChange(value ?? '')}
              placeholder="キャラクターを選択"
              error={hasError}
            />
          )}
        />
      )}
    </FormField>
  );
}
