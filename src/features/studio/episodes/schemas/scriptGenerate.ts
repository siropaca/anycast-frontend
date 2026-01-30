import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@/constants/messages';

/**
 * エピソードの長さ（分）
 */
export const EPISODE_DURATION_OPTIONS = [5, 10, 15] as const;

export const scriptGenerateFormSchema = z.object({
  prompt: z
    .string()
    .max(2000, VALIDATION_MESSAGES.maxLength('プロンプト', 2000)),
  durationMinutes: z.number({
    message: VALIDATION_MESSAGES.select('エピソードの長さ'),
  }),
});

export type ScriptGenerateFormInput = z.infer<typeof scriptGenerateFormSchema>;
