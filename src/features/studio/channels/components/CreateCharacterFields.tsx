'use client';

import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import { FormField } from '@/components/inputs/FormField/FormField';
import { Input } from '@/components/inputs/Input/Input';
import { Select } from '@/components/inputs/Select/Select';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import type { ChannelFormInput } from '@/features/studio/channels/schemas/channel';
import type { ResponseVoiceResponse } from '@/libs/api/generated/schemas';

interface Props {
  index: number;
  control: Control<ChannelFormInput>;
  errors: FieldErrors<ChannelFormInput>;
  voices: ResponseVoiceResponse[];
  register: UseFormRegister<ChannelFormInput>;
}

type CreateCharacterErrors = {
  name?: { message?: string };
  voiceId?: { message?: string };
};

export function CreateCharacterFields({
  index,
  control,
  errors,
  voices,
  register,
}: Props) {
  const voiceOptions = voices.map((voice) => ({
    label: `${voice.name} (${voice.gender})`,
    value: voice.id ?? '',
  }));

  const characterErrors = errors.characters?.[index] as
    | CreateCharacterErrors
    | undefined;

  return (
    <>
      <FormField
        label="ボイス"
        required
        error={characterErrors?.voiceId?.message}
      >
        {({ hasError }) => (
          <Controller
            // biome-ignore lint/suspicious/noExplicitAny: discriminated union のネストパスは型が合わないため
            name={`characters.${index}.voiceId` as any}
            control={control}
            render={({ field: selectField }) => (
              <Select
                name={`characters.${index}.voiceId`}
                options={voiceOptions}
                value={(selectField.value as string) || null}
                onValueChange={(value) => selectField.onChange(value ?? '')}
                placeholder="選択してください"
                error={hasError}
              />
            )}
          />
        )}
      </FormField>

      <FormField label="名前" required error={characterErrors?.name?.message}>
        {({ id, hasError }) => (
          <Input
            id={id}
            maxLength={255}
            error={hasError}
            // biome-ignore lint/suspicious/noExplicitAny: discriminated union のネストパスは型が合わないため
            {...register(`characters.${index}.name` as any)}
          />
        )}
      </FormField>

      <FormField label="ペルソナ">
        {({ id }) => (
          <Textarea
            id={id}
            rows={8}
            maxLength={2000}
            showCounter
            // biome-ignore lint/suspicious/noExplicitAny: discriminated union のネストパスは型が合わないため
            {...register(`characters.${index}.persona` as any)}
          />
        )}
      </FormField>
    </>
  );
}
