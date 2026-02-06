import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

export const studioSettingsFormSchema = z.object({
  userPrompt: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('共通プロンプト', 2000)),
});

export type StudioSettingsFormInput = z.infer<typeof studioSettingsFormSchema>;
