import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { Textarea } from '@/components/inputs/Textarea/Textarea';
import type { StudioSettingsFormInput } from '@/features/studio/settings/schemas/studioSettings';

interface Props {
  registration: UseFormRegisterReturn<'userPrompt'>;
  value: string;
  errors: FieldErrors<StudioSettingsFormInput>;
  serverError?: string;
}

export function GeneralTabContent({
  registration,
  value,
  errors,
  serverError,
}: Props) {
  return (
    <div className="space-y-4">
      <FormLabel
        htmlFor="userPrompt"
        helpText="すべてのチャンネルとエピソードで適用されるプロンプトです。"
      >
        共通プロンプト
      </FormLabel>
      <Textarea
        id="userPrompt"
        rows={8}
        className="w-full"
        maxLength={2000}
        showCounter
        error={!!errors.userPrompt}
        value={value}
        {...registration}
      />
      {errors.userPrompt && (
        <p className="text-sm text-text-danger">{errors.userPrompt.message}</p>
      )}
      {serverError && (
        <p className="text-sm text-text-danger">{serverError}</p>
      )}
    </div>
  );
}
