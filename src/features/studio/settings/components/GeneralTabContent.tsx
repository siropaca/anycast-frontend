import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';
import { FormLabel } from '@/components/dataDisplay/FormLabel/FormLabel';
import { HelperText } from '@/components/inputs/Input/HelperText';
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
        共通の台本プロンプト
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
        <HelperText error>{errors.userPrompt.message}</HelperText>
      )}
      {serverError && <HelperText error>{serverError}</HelperText>}
    </div>
  );
}
